const { Employee, Department, Designation, User, sequelize } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { createAuditFields } = require("../utils/audit");
const { ConflictError, NotFoundError } = require("../utils/appError");
const { canManageEmployeeData, getEmployeeIdForUser } = require("../utils/accessControl");

const include = [
  { model: Department, as: "department", attributes: ["id", "department_name"] },
  { model: Designation, as: "designation", attributes: ["id", "designation_name"] },
  { model: Employee, as: "manager", attributes: ["id", "employee_code", "first_name", "last_name"] },
  { model: User, as: "user", attributes: ["id", "name", "email"], required: false }
];

const EMPLOYEE_CODE_PREFIX = "EMP";
const EMPLOYEE_CODE_PATTERN = /^EMP(\d+)$/;
const EMPLOYEE_CODE_LOCK_ID = 918273645;

const ensureReferences = async (payload, options = {}) => {
  const department = await Department.findByPk(payload.department_id, options);
  if (!department || !department.status) {
    throw new NotFoundError("Active department not found");
  }

  const designation = await Designation.findByPk(payload.designation_id, options);
  if (!designation || !designation.status) {
    throw new NotFoundError("Active designation not found");
  }

  if (String(designation.department_id) !== String(payload.department_id)) {
    throw new ConflictError("Designation does not belong to the selected department");
  }

  if (payload.manager_id) {
    const manager = await Employee.findByPk(payload.manager_id, options);
    if (!manager) {
      throw new NotFoundError("Reporting manager not found");
    }
  }
};

const ensureUnique = async (payload, ignoreId = null, options = {}) => {
  if (payload.employee_code) {
    const existingCode = await Employee.findOne({
      where: { employee_code: payload.employee_code },
      paranoid: false,
      ...options
    });
    if (existingCode && String(existingCode.id) !== String(ignoreId)) {
      throw new ConflictError("Employee code already exists");
    }
  }

  if (payload.email) {
    const existingEmail = await Employee.findOne({ where: { email: payload.email }, ...options });
    if (existingEmail && String(existingEmail.id) !== String(ignoreId)) {
      throw new ConflictError("Employee email already exists");
    }
  }
};

const getNextEmployeeCodeFromRecords = (records) => {
  const highest = records.reduce(
    (current, record) => {
      const match = EMPLOYEE_CODE_PATTERN.exec(record.employee_code || "");
      if (!match) {
        return current;
      }

      const numericValue = Number(match[1]);
      if (numericValue > current.value) {
        return { value: numericValue, width: Math.max(3, match[1].length) };
      }

      if (numericValue === current.value && match[1].length > current.width) {
        return { value: numericValue, width: Math.max(3, match[1].length) };
      }

      return current;
    },
    { value: 0, width: 3 }
  );

  return `${EMPLOYEE_CODE_PREFIX}${String(highest.value + 1).padStart(highest.width, "0")}`;
};

const getNextEmployeeCode = async (options = {}) => {
  const records = await Employee.findAll({
    attributes: ["employee_code"],
    paranoid: false,
    ...options
  });

  return getNextEmployeeCodeFromRecords(records);
};

const lockEmployeeCodeGeneration = async (transaction) => {
  await sequelize.query("SELECT pg_advisory_xact_lock(:lockId)", {
    replacements: { lockId: EMPLOYEE_CODE_LOCK_ID },
    transaction
  });
};

const baseService = createCrudService({
  model: Employee,
  modelName: "Employee",
  searchFields: ["employee_code", "first_name", "last_name", "email", "mobile"],
  filterFields: ["department_id", "designation_id", "status", "manager_id"],
  sortFields: ["id", "employee_code", "first_name", "joining_date", "salary", "created_at"],
  defaultSort: "id",
  include,
  buildWhere: async (query, user) => {
    if (canManageEmployeeData(user)) {
      return {};
    }

    const employeeId = getEmployeeIdForUser(user);
    return employeeId ? { id: employeeId } : { id: null };
  },
  beforeCreate: async (payload) => {
    await ensureReferences(payload);
    await ensureUnique(payload);
    return payload;
  },
  beforeUpdate: async (record, payload) => {
    const nextPayload = {
      ...record.get({ plain: true }),
      ...payload
    };
    await ensureReferences(nextPayload);
    await ensureUnique(nextPayload, record.id);

    if (payload.manager_id && String(payload.manager_id) === String(record.id)) {
      throw new ConflictError("Employee cannot be their own manager");
    }

    return payload;
  }
});

const create = async (payload, user) =>
  sequelize.transaction(async (transaction) => {
    await lockEmployeeCodeGeneration(transaction);

    const nextPayload = {
      ...payload,
      employee_code: await getNextEmployeeCode({ transaction })
    };

    await ensureReferences(nextPayload, { transaction });
    await ensureUnique(nextPayload, null, { transaction });

    try {
      const record = await Employee.create(
        {
          ...nextPayload,
          ...createAuditFields(user)
        },
        { transaction }
      );

      return Employee.findByPk(record.id, { include, transaction });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ConflictError("Employee code already exists");
      }

      throw error;
    }
  });

module.exports = {
  ...baseService,
  create,
  getNextEmployeeCode
};
