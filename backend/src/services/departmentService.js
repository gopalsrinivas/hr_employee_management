const { Department, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { ConflictError } = require("../utils/appError");

module.exports = createCrudService({
  model: Department,
  modelName: "Department",
  searchFields: ["department_name", "description"],
  filterFields: ["status"],
  sortFields: ["id", "department_name", "created_at", "updated_at"],
  beforeCreate: async (payload) => {
    const existing = await Department.findOne({
      where: { department_name: payload.department_name }
    });
    if (existing) {
      throw new ConflictError("Department name already exists");
    }
    return payload;
  },
  beforeUpdate: async (record, payload) => {
    if (payload.department_name && payload.department_name !== record.department_name) {
      const existing = await Department.findOne({
        where: { department_name: payload.department_name }
      });
      if (existing) {
        throw new ConflictError("Department name already exists");
      }
    }
    return payload;
  },
  beforeDelete: async (record) => {
    const employeeCount = await Employee.count({ where: { department_id: record.id } });
    if (employeeCount > 0) {
      throw new ConflictError("Department cannot be deleted while employees exist");
    }
  }
});
