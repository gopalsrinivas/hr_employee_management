const { LeaveRequest, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { todayDateOnly, calculateInclusiveDays } = require("../utils/dateHelper");
const { updateAuditFields } = require("../utils/audit");
const { AuthorizationError, ConflictError, NotFoundError, ValidationError } = require("../utils/appError");
const { canManageEmployeeData, requireEmployeeProfile, getEmployeeIdForUser } = require("../utils/accessControl");

const service = createCrudService({
  model: LeaveRequest,
  modelName: "Leave request",
  searchFields: ["leave_type", "reason", "status"],
  filterFields: ["employee_id", "status", "leave_type"],
  sortFields: ["id", "from_date", "to_date", "applied_date", "status", "created_at"],
  include: [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name"] }],
  buildWhere: async (query, user) => {
    if (canManageEmployeeData(user)) {
      return {};
    }
    return { employee_id: requireEmployeeProfile(user) };
  },
  beforeCreate: async (payload, user) => {
    const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
    if (new Date(payload.from_date) > new Date(payload.to_date)) {
      throw new ValidationError("From date cannot be after to date");
    }
    return {
      ...payload,
      employee_id: employeeId,
      total_days: calculateInclusiveDays(payload.from_date, payload.to_date),
      applied_date: payload.applied_date || todayDateOnly(),
      status: "Pending"
    };
  }
});

const approve = async (id, user, remarks) => {
  const record = await LeaveRequest.findByPk(id);
  if (!record) {
    throw new NotFoundError("Leave request not found");
  }
  if (!canManageEmployeeData(user)) {
    throw new AuthorizationError("Only Admin or HR can approve leave requests");
  }
  if (String(getEmployeeIdForUser(user)) === String(record.employee_id)) {
    throw new ConflictError("Employee cannot approve their own leave");
  }
  return record.update({
    status: "Approved",
    remarks,
    approved_by: user.id,
    approved_date: new Date(),
    ...updateAuditFields(user)
  });
};

const reject = async (id, user, remarks) => {
  const record = await LeaveRequest.findByPk(id);
  if (!record) {
    throw new NotFoundError("Leave request not found");
  }
  if (!canManageEmployeeData(user)) {
    throw new AuthorizationError("Only Admin or HR can reject leave requests");
  }
  return record.update({
    status: "Rejected",
    remarks,
    approved_by: user.id,
    approved_date: new Date(),
    ...updateAuditFields(user)
  });
};

module.exports = {
  ...service,
  approve,
  reject
};
