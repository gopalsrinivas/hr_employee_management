const { Payroll, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { ConflictError, ValidationError } = require("../utils/appError");
const { canManageEmployeeData, requireEmployeeProfile, assertSelfOrManager } = require("../utils/accessControl");

const moneyFields = ["basic_salary", "hra", "da", "bonus", "incentives", "pf", "esi", "tax", "deductions"];

const calculateNetSalary = (payload) => {
  const totalEarnings =
    Number(payload.basic_salary || 0) +
    Number(payload.hra || 0) +
    Number(payload.da || 0) +
    Number(payload.bonus || 0) +
    Number(payload.incentives || 0);
  const totalDeductions =
    Number(payload.pf || 0) +
    Number(payload.esi || 0) +
    Number(payload.tax || 0) +
    Number(payload.deductions || 0);

  return Number((totalEarnings - totalDeductions).toFixed(2));
};

const validateAmounts = (payload) => {
  for (const field of moneyFields) {
    if (payload[field] !== undefined && Number(payload[field]) < 0) {
      throw new ValidationError(`${field} cannot be negative`);
    }
  }
};

module.exports = createCrudService({
  model: Payroll,
  modelName: "Payroll",
  filterFields: ["employee_id", "payroll_month", "payroll_year", "salary_status"],
  sortFields: ["id", "payroll_month", "payroll_year", "net_salary", "created_at"],
  include: [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name"] }],
  buildWhere: async (query, user) => {
    if (canManageEmployeeData(user)) {
      return {};
    }
    return { employee_id: requireEmployeeProfile(user) };
  },
  beforeCreate: async (payload) => {
    validateAmounts(payload);
    const existing = await Payroll.findOne({
      where: {
        employee_id: payload.employee_id,
        payroll_month: payload.payroll_month,
        payroll_year: payload.payroll_year
      }
    });
    if (existing) {
      throw new ConflictError("Payroll already exists for this employee and month");
    }
    return {
      ...payload,
      net_salary: calculateNetSalary(payload)
    };
  },
  beforeUpdate: async (record, payload, user) => {
    assertSelfOrManager(user, record.employee_id);
    validateAmounts(payload);
    const merged = { ...record.get({ plain: true }), ...payload };
    return {
      ...payload,
      net_salary: calculateNetSalary(merged)
    };
  }
});
