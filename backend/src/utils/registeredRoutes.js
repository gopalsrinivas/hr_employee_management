const routeGroups = [
  {
    prefix: "/api/v1/auth",
    routes: [
      ["POST", "/login"],
      ["POST", "/logout"],
      ["GET", "/profile"],
      ["POST", "/change-password"]
    ]
  },
  { prefix: "/api/v1/health", routes: [["GET", "/"]] },
  {
    prefix: "/api/v1/dashboard",
    routes: [
      ["GET", "/summary"],
      ["GET", "/department-summary"],
      ["GET", "/attendance-summary"],
      ["GET", "/leave-summary"]
    ]
  },
  {
    prefix: "/api/v1/roles",
    routes: [
      ["GET", "/"],
      ["POST", "/"],
      ["GET", "/:id"],
      ["PUT", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/users",
    routes: [
      ["GET", "/"],
      ["POST", "/"],
      ["GET", "/:id"],
      ["PUT", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/departments",
    routes: [
      ["GET", "/"],
      ["POST", "/"],
      ["GET", "/:id"],
      ["PUT", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/designations",
    routes: [
      ["GET", "/"],
      ["POST", "/"],
      ["GET", "/:id"],
      ["PUT", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/employees",
    routes: [
      ["GET", "/"],
      ["POST", "/"],
      ["GET", "/:id"],
      ["PUT", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/attendance",
    routes: [
      ["POST", "/check-in"],
      ["POST", "/check-out"],
      ["GET", "/"],
      ["GET", "/:employeeId"]
    ]
  },
  {
    prefix: "/api/v1/leave-requests",
    routes: [
      ["POST", "/"],
      ["GET", "/"],
      ["GET", "/:id"],
      ["PATCH", "/:id/approve"],
      ["PATCH", "/:id/reject"]
    ]
  },
  {
    prefix: "/api/v1/payroll",
    routes: [
      ["POST", "/"],
      ["GET", "/"],
      ["GET", "/employee/:employeeId"],
      ["GET", "/:id"],
      ["PUT", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/employee-documents",
    routes: [
      ["POST", "/"],
      ["GET", "/"],
      ["GET", "/:id"],
      ["DELETE", "/:id"]
    ]
  },
  {
    prefix: "/api/v1/onboarding",
    routes: [
      ["POST", "/"],
      ["GET", "/"],
      ["GET", "/:id"],
      ["PATCH", "/:id"],
      ["PATCH", "/:id/complete"]
    ]
  },
  {
    prefix: "/api/v1/employee-exits",
    routes: [
      ["POST", "/"],
      ["GET", "/"],
      ["GET", "/:id"],
      ["PATCH", "/:id/manager-approval"],
      ["PATCH", "/:id/hr-approval"],
      ["PATCH", "/:id/complete"]
    ]
  },
  {
    prefix: "/api/v1/reports",
    routes: [
      ["GET", "/summary"],
      ["GET", "/employees"],
      ["GET", "/attendance"],
      ["GET", "/leaves"],
      ["GET", "/payroll"]
    ]
  }
];

const normalizePath = (prefix, path) => `${prefix}${path === "/" ? "" : path}`;

const getRegisteredRoutes = () =>
  routeGroups.flatMap((group) =>
    group.routes.map(([method, path]) => ({
      method,
      path: normalizePath(group.prefix, path)
    }))
  );

module.exports = {
  getRegisteredRoutes
};
