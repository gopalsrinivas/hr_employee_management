const { Onboarding, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { updateAuditFields } = require("../utils/audit");
const { ConflictError, NotFoundError } = require("../utils/appError");

const service = createCrudService({
  model: Onboarding,
  modelName: "Onboarding",
  filterFields: ["employee_id", "onboarding_status", "joining_date"],
  sortFields: ["id", "joining_date", "onboarding_status", "created_at"],
  include: [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name"] }],
  beforeCreate: async (payload) => {
    const existing = await Onboarding.findOne({ where: { employee_id: payload.employee_id } });
    if (existing) {
      throw new ConflictError("Onboarding already exists for this employee");
    }
    return payload;
  }
});

const complete = async (id, user) => {
  const record = await Onboarding.findByPk(id);
  if (!record) {
    throw new NotFoundError("Onboarding record not found");
  }

  await record.update({
    documents_verified: true,
    induction_completed: true,
    laptop_allocated: true,
    email_created: true,
    id_card_generated: true,
    welcome_kit_issued: true,
    onboarding_status: "Completed",
    ...updateAuditFields(user)
  });

  await Employee.update({ status: "Active", updated_by: user.id }, { where: { id: record.employee_id } });

  return service.getById(id, user);
};

module.exports = {
  ...service,
  complete
};
