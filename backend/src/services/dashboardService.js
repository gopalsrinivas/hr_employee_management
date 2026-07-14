const { Employee, Department, Attendance, LeaveRequest, EmployeeExit } = require("../models");
const { todayDateOnly } = require("../utils/dateHelper");

const summary = async () => {
  const today = todayDateOnly();
  const [
    totalEmployees,
    activeEmployees,
    exitedEmployees,
    departmentCount,
    presentEmployees,
    pendingLeaveRequests,
    employeesExiting
  ] = await Promise.all([
    Employee.count(),
    Employee.count({ where: { status: "Active" } }),
    Employee.count({ where: { status: "Exited" } }),
    Department.count({ where: { status: true } }),
    Attendance.count({ where: { attendance_date: today, status: "Present" } }),
    LeaveRequest.count({ where: { status: "Pending" } }),
    EmployeeExit.count({ where: { exit_status: "Pending" } })
  ]);

  return {
    totalEmployees,
    activeEmployees,
    exitedEmployees,
    employeesOnNotice: employeesExiting,
    departmentCount,
    presentEmployees,
    pendingLeaveRequests,
    employeesExiting
  };
};

const departmentSummary = async () => {
  return Department.findAll({
    attributes: ["id", "department_name"],
    include: [{ model: Employee, as: "employees", attributes: ["id"], required: false }]
  });
};

const attendanceSummary = async (date = todayDateOnly()) => {
  const present = await Attendance.count({ where: { attendance_date: date, status: "Present" } });
  const totalEmployees = await Employee.count({ where: { status: "Active" } });
  return { date, present, absent: Math.max(totalEmployees - present, 0), totalEmployees };
};

const leaveSummary = async () => {
  const [pending, approved, rejected] = await Promise.all([
    LeaveRequest.count({ where: { status: "Pending" } }),
    LeaveRequest.count({ where: { status: "Approved" } }),
    LeaveRequest.count({ where: { status: "Rejected" } })
  ]);
  return { pending, approved, rejected };
};

module.exports = {
  summary,
  departmentSummary,
  attendanceSummary,
  leaveSummary
};
