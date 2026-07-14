const { EmployeeExit, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { updateAuditFields } = require("../utils/audit");
const { ConflictError, NotFoundError, ValidationError } = require("../utils/appError");
const { canManageEmployeeData, requireEmployeeProfile } = require("../utils/accessControl");

const service = createCrudService({
  model: EmployeeExit,
  modelName: "Employee exit",
  filterFields: ["employee_id", "exit_status", "resignation_date"],
  sortFields: ["id", "resignation_date", "last_working_day", "exit_status", "created_at"],
  include: [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name", "status"] }],
  buildWhere: async (query, user) => {
    if (canManageEmployeeData(user)) {
      return {};
    }
    return { employee_id: requireEmployeeProfile(user) };
  },
  beforeCreate: async (payload, user) => {
    const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
    if (new Date(payload.last_working_day) < new Date(payload.resignation_date)) {
      throw new ValidationError("Last working day cannot be before resignation date");
    }
    const existing = await EmployeeExit.findOne({ where: { employee_id: employeeId } });
    if (existing) {
      throw new ConflictError("Exit process already exists for this employee");
    }
    return { ...payload, employee_id: employeeId };
  }
});

const patchFlags = async (id, user, flags) => {
  const record = await EmployeeExit.findByPk(id);
  if (!record) {
    throw new NotFoundError("Employee exit record not found");
  }
  await record.update({ ...flags, ...updateAuditFields(user) });
  return service.getById(id, user);
};

const complete = async (id, user, payload = {}) => {
  const record = await EmployeeExit.findByPk(id);
  if (!record) {
    throw new NotFoundError("Employee exit record not found");
  }

  const nextState = { ...record.get({ plain: true }), ...payload };
  if (!nextState.manager_approval || !nextState.hr_approval || !nextState.asset_returned || !nextState.fnf_completed) {
    throw new ValidationError("Manager approval, HR approval, asset return, and F&F completion are required");
  }

  await record.update({
    ...payload,
    experience_letter: true,
    relieving_letter: true,
    exit_status: "Completed",
    ...updateAuditFields(user)
  });
  await Employee.update({ status: "Exited", updated_by: user.id }, { where: { id: record.employee_id } });

  return service.getById(id, user);
};

module.exports = {
  ...service,
  managerApproval: (id, user, payload) => patchFlags(id, user, { manager_approval: payload.manager_approval ?? true }),
  hrApproval: (id, user, payload) => patchFlags(id, user, { hr_approval: payload.hr_approval ?? true }),
  complete
};
