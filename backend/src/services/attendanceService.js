const { Attendance, Employee } = require("../models");
const { Op, getPagination, getOrder, buildExactFilters, buildPaginationMeta } = require("../utils/listQuery");
const { todayDateOnly, calculateWorkingHours } = require("../utils/dateHelper");
const { createAuditFields, updateAuditFields } = require("../utils/audit");
const { ConflictError, NotFoundError, ValidationError } = require("../utils/appError");
const { canManageEmployeeData, assertSelfOrManager, requireEmployeeProfile } = require("../utils/accessControl");

const include = [{ model: Employee, as: "employee", attributes: ["id", "employee_code", "first_name", "last_name"] }];

const getScopedEmployeeId = (query, user) => {
  if (canManageEmployeeData(user)) {
    return query.employee_id || query.employeeId || null;
  }
  return requireEmployeeProfile(user);
};

const list = async (query, user) => {
  const { page, limit, offset } = getPagination(query);
  const employeeId = getScopedEmployeeId(query, user);
  const where = {
    ...buildExactFilters(query, ["attendance_date", "status"])
  };

  if (employeeId) {
    where.employee_id = employeeId;
  }

  const result = await Attendance.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: getOrder(query, ["id", "attendance_date", "status", "created_at"], "attendance_date")
  });

  return { records: result.rows, pagination: buildPaginationMeta(page, limit, result.count) };
};

const getByEmployeeId = async (employeeId, query, user) => {
  assertSelfOrManager(user, employeeId);
  return list({ ...query, employee_id: employeeId }, user);
};

const checkIn = async (payload, user) => {
  const attendanceDate = payload.attendance_date || todayDateOnly();
  const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
  const existing = await Attendance.findOne({ where: { employee_id: employeeId, attendance_date: attendanceDate } });

  if (existing) {
    throw new ConflictError("Attendance is already marked for this date");
  }

  return Attendance.create({
    employee_id: employeeId,
    attendance_date: attendanceDate,
    check_in: payload.check_in,
    status: payload.status || "Present",
    ...createAuditFields(user)
  });
};

const checkOut = async (payload, user) => {
  const attendanceDate = payload.attendance_date || todayDateOnly();
  const employeeId = canManageEmployeeData(user) && payload.employee_id ? payload.employee_id : requireEmployeeProfile(user);
  const record = await Attendance.findOne({ where: { employee_id: employeeId, attendance_date: attendanceDate } });

  if (!record) {
    throw new NotFoundError("Check-in record not found");
  }

  if (record.check_out) {
    throw new ConflictError("Check-out is already marked");
  }

  if (payload.check_out <= record.check_in) {
    throw new ValidationError("Check-out must be later than check-in");
  }

  return record.update({
    check_out: payload.check_out,
    working_hours: calculateWorkingHours(attendanceDate, record.check_in, payload.check_out),
    ...updateAuditFields(user)
  });
};

module.exports = {
  list,
  getByEmployeeId,
  checkIn,
  checkOut,
  Op
};
