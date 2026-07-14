const ROLES = require("../constants/roles");
const { AuthorizationError, NotFoundError } = require("./appError");

const getRoleName = (user) => (user && user.Role ? user.Role.name : null);

const isAdmin = (user) => getRoleName(user) === ROLES.ADMIN;
const isHr = (user) => getRoleName(user) === ROLES.HR;
const isEmployee = (user) => getRoleName(user) === ROLES.EMPLOYEE;
const canManageEmployeeData = (user) => isAdmin(user) || isHr(user);

const getEmployeeIdForUser = (user) => {
  if (user && user.employeeProfile) {
    return String(user.employeeProfile.id);
  }
  return null;
};

const assertSelfOrManager = (user, employeeId) => {
  if (canManageEmployeeData(user)) {
    return;
  }

  const ownEmployeeId = getEmployeeIdForUser(user);
  if (!ownEmployeeId || String(employeeId) !== ownEmployeeId) {
    throw new AuthorizationError("You can access only your own records");
  }
};

const requireEmployeeProfile = (user) => {
  const employeeId = getEmployeeIdForUser(user);

  if (!employeeId) {
    throw new NotFoundError("Employee profile was not found for this user");
  }

  return employeeId;
};

module.exports = {
  getRoleName,
  isAdmin,
  isHr,
  isEmployee,
  canManageEmployeeData,
  getEmployeeIdForUser,
  assertSelfOrManager,
  requireEmployeeProfile
};
