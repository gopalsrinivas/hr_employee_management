const path = require("path");
const { EmployeeDocument, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { canManageEmployeeData, requireEmployeeProfile, assertSelfOrManager } = require("../utils/accessControl");
const { ValidationError } = require("../utils/appError");

const service = createCrudService({
  model: EmployeeDocument,
  modelName: "Employee document",
  searchFields: ["document_type", "document_number", "file_name", "original_name"],
  filterFields: ["employee_id", "document_type"],
  sortFields: ["id", "document_type", "uploaded_at", "created_at"],
  include: [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name"] }],
  buildWhere: async (query, user) => {
    if (canManageEmployeeData(user)) {
      return {};
    }
    return { employee_id: requireEmployeeProfile(user) };
  },
  beforeCreate: async (payload, user) => {
    const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
    return {
      ...payload,
      employee_id: employeeId,
      uploaded_by: user.id,
      uploaded_at: new Date()
    };
  }
});

const upload = async (payload, file, user) => {
  if (!file) {
    throw new ValidationError("Document file is required");
  }

  const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
  assertSelfOrManager(user, employeeId);

  return service.create(
    {
      ...payload,
      employee_id: employeeId,
      file_name: file.filename,
      original_name: file.originalname,
      file_path: path.relative(process.cwd(), file.path).replace(/\\/g, "/"),
      file_size: file.size
    },
    user
  );
};

module.exports = {
  ...service,
  upload
};
