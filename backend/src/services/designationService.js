const { Designation, Department, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { ConflictError, NotFoundError } = require("../utils/appError");

const ensureDepartment = async (departmentId) => {
  const department = await Department.findByPk(departmentId);
  if (!department || !department.status) {
    throw new NotFoundError("Active department not found");
  }
};

const ensureUnique = async (departmentId, designationName, ignoreId = null) => {
  const existing = await Designation.findOne({
    where: {
      department_id: departmentId,
      designation_name: designationName
    }
  });

  if (existing && String(existing.id) !== String(ignoreId)) {
    throw new ConflictError("Designation already exists in this department");
  }
};

module.exports = createCrudService({
  model: Designation,
  modelName: "Designation",
  searchFields: ["designation_name", "description"],
  filterFields: ["department_id", "status"],
  sortFields: ["id", "designation_name", "department_id", "created_at", "updated_at"],
  include: [{ model: Department, as: "department", attributes: ["id", "department_name"] }],
  beforeCreate: async (payload) => {
    await ensureDepartment(payload.department_id);
    await ensureUnique(payload.department_id, payload.designation_name);
    return payload;
  },
  beforeUpdate: async (record, payload) => {
    const departmentId = payload.department_id || record.department_id;
    const designationName = payload.designation_name || record.designation_name;
    await ensureDepartment(departmentId);
    await ensureUnique(departmentId, designationName, record.id);
    return payload;
  },
  beforeDelete: async (record) => {
    const employeeCount = await Employee.count({ where: { designation_id: record.id } });
    if (employeeCount > 0) {
      throw new ConflictError("Designation cannot be deleted while employees exist");
    }
  }
});
