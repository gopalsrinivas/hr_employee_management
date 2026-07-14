const { Employee, Department, Designation, User } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { ConflictError, NotFoundError } = require("../utils/appError");
const { canManageEmployeeData, getEmployeeIdForUser } = require("../utils/accessControl");

const include = [
  { model: Department, as: "department", attributes: ["id", "department_name"] },
  { model: Designation, as: "designation", attributes: ["id", "designation_name"] },
  { model: Employee, as: "manager", attributes: ["id", "employee_code", "first_name", "last_name"] },
  { model: User, as: "user", attributes: ["id", "name", "email"], required: false }
];

const ensureReferences = async (payload) => {
  const department = await Department.findByPk(payload.department_id);
  if (!department || !department.status) {
    throw new NotFoundError("Active department not found");
  }

  const designation = await Designation.findByPk(payload.designation_id);
  if (!designation || !designation.status) {
    throw new NotFoundError("Active designation not found");
  }

  if (String(designation.department_id) !== String(payload.department_id)) {
    throw new ConflictError("Designation does not belong to the selected department");
  }

  if (payload.manager_id) {
    const manager = await Employee.findByPk(payload.manager_id);
    if (!manager) {
      throw new NotFoundError("Reporting manager not found");
    }
  }
};

const ensureUnique = async (payload, ignoreId = null) => {
  if (payload.employee_code) {
    const existingCode = await Employee.findOne({ where: { employee_code: payload.employee_code } });
    if (existingCode && String(existingCode.id) !== String(ignoreId)) {
      throw new ConflictError("Employee code already exists");
    }
  }

  if (payload.email) {
    const existingEmail = await Employee.findOne({ where: { email: payload.email } });
    if (existingEmail && String(existingEmail.id) !== String(ignoreId)) {
      throw new ConflictError("Employee email already exists");
    }
  }
};

module.exports = createCrudService({
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
