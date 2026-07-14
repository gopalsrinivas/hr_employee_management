const env = require("../config/env");

const json = (schema, example) => ({
  required: true,
  content: {
    "application/json": {
      schema,
      example
    }
  }
});

const multipart = (schema) => ({
  required: true,
  content: {
    "multipart/form-data": {
      schema
    }
  }
});

const ref = (name) => ({ $ref: `#/components/schemas/${name}` });

const idParam = (name = "id", description = "Record ID") => ({
  name,
  in: "path",
  required: true,
  description,
  schema: { type: "integer", minimum: 1 },
  example: 1
});

const queryParam = (name, schema, description, example) => ({
  name,
  in: "query",
  required: false,
  description,
  schema,
  example
});

const paginationParams = [
  queryParam("page", { type: "integer", minimum: 1, default: 1 }, "Page number", 1),
  queryParam("limit", { type: "integer", minimum: 1, maximum: 100, default: 10 }, "Page size", 10),
  queryParam("search", { type: "string" }, "Search term", "john"),
  queryParam("sortBy", { type: "string" }, "Sort field", "created_at"),
  queryParam("order", { type: "string", enum: ["ASC", "DESC"], default: "DESC" }, "Sort direction", "DESC")
];

const responses = {
  success: (description = "Success") => ({
    description,
    content: {
      "application/json": {
        schema: ref("SuccessResponse")
      }
    }
  }),
  created: (description = "Created") => ({
    description,
    content: {
      "application/json": {
        schema: ref("SuccessResponse")
      }
    }
  }),
  validation: { $ref: "#/components/responses/ValidationError" },
  unauthorized: { $ref: "#/components/responses/Unauthorized" },
  forbidden: { $ref: "#/components/responses/Forbidden" },
  notFound: { $ref: "#/components/responses/NotFound" },
  conflict: { $ref: "#/components/responses/Conflict" },
  serverError: { $ref: "#/components/responses/InternalServerError" }
};

const standardResponses = (successDescription = "Success", created = false) => ({
  [created ? "201" : "200"]: created ? responses.created(successDescription) : responses.success(successDescription),
  400: responses.validation,
  401: responses.unauthorized,
  403: responses.forbidden,
  404: responses.notFound,
  409: responses.conflict,
  500: responses.serverError
});

const secured = [{ bearerAuth: [] }];

const operation = ({
  tag,
  summary,
  description,
  parameters = [],
  requestBody,
  created = false,
  security = secured,
  successDescription
}) => ({
  tags: [tag],
  summary,
  description,
  security,
  parameters,
  ...(requestBody ? { requestBody } : {}),
  responses: standardResponses(successDescription || summary, created)
});

const crudPaths = ({
  base,
  tag,
  name,
  createSchema,
  updateSchema,
  createExample,
  updateExample,
  listParams = []
}) => ({
  [base]: {
    get: operation({
      tag,
      summary: `List ${name}`,
      description: `Returns paginated ${name} records with supported search, filter, and sort query parameters.`,
      parameters: [...paginationParams, ...listParams]
    }),
    post: operation({
      tag,
      summary: `Create ${name}`,
      description: `Creates a ${name} record.`,
      requestBody: json(ref(createSchema), createExample),
      created: true
    })
  },
  [`${base}/{id}`]: {
    get: operation({
      tag,
      summary: `Get ${name} by ID`,
      description: `Returns one ${name} record by integer ID.`,
      parameters: [idParam()]
    }),
    put: operation({
      tag,
      summary: `Update ${name}`,
      description: `Updates one ${name} record by integer ID.`,
      parameters: [idParam()],
      requestBody: json(ref(updateSchema), updateExample)
    }),
    delete: operation({
      tag,
      summary: `Delete ${name}`,
      description: `Soft deletes one ${name} record by integer ID.`,
      parameters: [idParam()]
    })
  }
});

const spec = {
  openapi: "3.0.0",
  info: {
    title: "HR Employee Management API",
    version: "v1",
    description: "REST APIs for HR Employee Management System."
  },
  servers: [{ url: `http://localhost:${env.port}/api/v1` }],
  tags: [
    "Authentication",
    "Health",
    "Dashboard",
    "Roles",
    "Users",
    "Departments",
    "Designations",
    "Employees",
    "Attendance",
    "Leave Requests",
    "Payroll",
    "Employee Documents",
    "Onboarding",
    "Employee Exit",
    "Reports"
  ].map((name) => ({ name })),
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    responses: {
      ValidationError: {
        description: "Validation error",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      },
      Unauthorized: {
        description: "Unauthorized",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      },
      Forbidden: {
        description: "Forbidden",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      },
      NotFound: {
        description: "Not found",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      },
      Conflict: {
        description: "Conflict",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      },
      InternalServerError: {
        description: "Internal server error",
        content: { "application/json": { schema: ref("ErrorResponse") } }
      }
    },
    schemas: {
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Operation completed successfully" },
          data: { type: "object", nullable: true },
          statusCode: { type: "integer", example: 200 },
          requestId: { type: "string", example: "REQ-20260714-000001" }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Validation failed" },
          errors: { type: "array", items: { type: "object" } },
          statusCode: { type: "integer", example: 400 },
          requestId: { type: "string", example: "REQ-20260714-000001" }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "admin@example.com" },
          password: { type: "string", minLength: 8, example: "Admin@12345" }
        }
      },
      ChangePasswordRequest: {
        type: "object",
        required: ["oldPassword", "newPassword"],
        properties: {
          oldPassword: { type: "string", example: "Admin@12345" },
          newPassword: { type: "string", minLength: 8, example: "NewAdmin@12345" }
        }
      },
      RoleCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", maxLength: 50, example: "Manager" },
          description: { type: "string", example: "Manager role" }
        }
      },
      RoleUpdate: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 50, example: "Senior Manager" },
          description: { type: "string", example: "Updated role description" }
        }
      },
      UserCreate: {
        type: "object",
        required: ["name", "email", "password", "role_id"],
        properties: {
          name: { type: "string", example: "Jane Admin" },
          email: { type: "string", format: "email", example: "jane.admin@example.com" },
          password: { type: "string", minLength: 8, example: "Admin@12345" },
          role_id: { type: "integer", minimum: 1, example: 1 },
          is_active: { type: "boolean", example: true }
        }
      },
      UserUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "Jane Manager" },
          email: { type: "string", format: "email", example: "jane.manager@example.com" },
          password: { type: "string", minLength: 8, example: "Updated@12345" },
          role_id: { type: "integer", minimum: 1, example: 2 },
          is_active: { type: "boolean", example: true }
        }
      },
      DepartmentCreate: {
        type: "object",
        required: ["department_name"],
        properties: {
          department_name: { type: "string", example: "Operations" },
          description: { type: "string", example: "Operations department" },
          status: { type: "boolean", example: true }
        }
      },
      DepartmentUpdate: {
        type: "object",
        properties: {
          department_name: { type: "string", example: "People Operations" },
          description: { type: "string", example: "Updated department" },
          status: { type: "boolean", example: true }
        }
      },
      DesignationCreate: {
        type: "object",
        required: ["department_id", "designation_name"],
        properties: {
          department_id: { type: "integer", minimum: 1, example: 2 },
          designation_name: { type: "string", example: "Engineering Manager" },
          description: { type: "string", example: "Leads engineering teams" },
          status: { type: "boolean", example: true }
        }
      },
      DesignationUpdate: {
        type: "object",
        properties: {
          department_id: { type: "integer", minimum: 1, example: 2 },
          designation_name: { type: "string", example: "Senior Engineering Manager" },
          description: { type: "string", example: "Updated designation" },
          status: { type: "boolean", example: true }
        }
      },
      EmployeeCreate: {
        type: "object",
        required: ["first_name", "last_name", "gender", "email", "joining_date", "department_id", "designation_id"],
        properties: {
          user_id: { type: "integer", nullable: true, example: 1 },
          first_name: { type: "string", example: "Asha" },
          last_name: { type: "string", example: "Nair" },
          gender: { type: "string", example: "Female" },
          dob: { type: "string", format: "date", example: "1995-01-15" },
          email: { type: "string", format: "email", example: "asha.nair@example.com" },
          mobile: { type: "string", example: "9876543210" },
          joining_date: { type: "string", format: "date", example: "2026-07-14" },
          department_id: { type: "integer", minimum: 1, example: 2 },
          designation_id: { type: "integer", minimum: 1, example: 1 },
          manager_id: { type: "integer", nullable: true, example: 1 },
          salary: { type: "number", minimum: 0, example: 75000 },
          status: { type: "string", enum: ["Active", "Exited"], example: "Active" }
        }
      },
      EmployeeUpdate: {
        type: "object",
        properties: {
          first_name: { type: "string", example: "Asha" },
          last_name: { type: "string", example: "Menon" },
          email: { type: "string", format: "email", example: "asha.menon@example.com" },
          mobile: { type: "string", example: "9876543210" },
          joining_date: { type: "string", format: "date", example: "2026-07-14" },
          department_id: { type: "integer", minimum: 1, example: 2 },
          designation_id: { type: "integer", minimum: 1, example: 1 },
          manager_id: { type: "integer", nullable: true, example: 1 },
          salary: { type: "number", minimum: 0, example: 80000 },
          status: { type: "string", enum: ["Active", "Exited"], example: "Active" }
        }
      },
      AttendanceCheckIn: {
        type: "object",
        required: ["check_in"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          attendance_date: { type: "string", format: "date", example: "2026-07-14" },
          check_in: { type: "string", example: "09:30:00" },
          status: { type: "string", enum: ["Present", "Absent", "Half Day"], example: "Present" }
        }
      },
      AttendanceCheckOut: {
        type: "object",
        required: ["check_out"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          attendance_date: { type: "string", format: "date", example: "2026-07-14" },
          check_out: { type: "string", example: "18:30:00" }
        }
      },
      LeaveRequestCreate: {
        type: "object",
        required: ["leave_type", "from_date", "to_date"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          leave_type: { type: "string", enum: ["Casual Leave", "Sick Leave", "Earned Leave", "Loss Of Pay", "Work From Home"], example: "Sick Leave" },
          from_date: { type: "string", format: "date", example: "2026-08-05" },
          to_date: { type: "string", format: "date", example: "2026-08-06" },
          reason: { type: "string", example: "Medical appointment" }
        }
      },
      LeaveDecision: {
        type: "object",
        properties: {
          remarks: { type: "string", example: "Approved" }
        }
      },
      PayrollCreate: {
        type: "object",
        required: ["employee_id", "payroll_month", "payroll_year", "basic_salary"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          payroll_month: { type: "string", example: "August" },
          payroll_year: { type: "integer", minimum: 1900, example: 2026 },
          basic_salary: { type: "number", minimum: 0, example: 50000 },
          hra: { type: "number", minimum: 0, example: 10000 },
          da: { type: "number", minimum: 0, example: 5000 },
          bonus: { type: "number", minimum: 0, example: 2500 },
          incentives: { type: "number", minimum: 0, example: 1500 },
          pf: { type: "number", minimum: 0, example: 3000 },
          esi: { type: "number", minimum: 0, example: 500 },
          tax: { type: "number", minimum: 0, example: 2000 },
          deductions: { type: "number", minimum: 0, example: 750 },
          salary_status: { type: "string", enum: ["Pending", "Paid"], example: "Pending" },
          paid_date: { type: "string", format: "date", example: "2026-08-31" }
        }
      },
      PayrollUpdate: {
        type: "object",
        properties: {
          payroll_month: { type: "string", example: "August" },
          payroll_year: { type: "integer", minimum: 1900, example: 2026 },
          basic_salary: { type: "number", minimum: 0, example: 52000 },
          hra: { type: "number", minimum: 0, example: 10000 },
          da: { type: "number", minimum: 0, example: 5000 },
          bonus: { type: "number", minimum: 0, example: 2500 },
          incentives: { type: "number", minimum: 0, example: 1500 },
          pf: { type: "number", minimum: 0, example: 3000 },
          esi: { type: "number", minimum: 0, example: 500 },
          tax: { type: "number", minimum: 0, example: 2000 },
          deductions: { type: "number", minimum: 0, example: 750 },
          salary_status: { type: "string", enum: ["Pending", "Paid"], example: "Paid" },
          paid_date: { type: "string", format: "date", example: "2026-08-31" }
        }
      },
      EmployeeDocumentUpload: {
        type: "object",
        required: ["file", "document_type"],
        properties: {
          file: { type: "string", format: "binary" },
          employee_id: { type: "integer", minimum: 1, example: 1 },
          document_type: { type: "string", example: "Resume" },
          document_number: { type: "string", example: "RES-001" }
        }
      },
      OnboardingCreate: {
        type: "object",
        required: ["employee_id", "joining_date"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          joining_date: { type: "string", format: "date", example: "2026-07-14" },
          documents_verified: { type: "boolean", example: false },
          induction_completed: { type: "boolean", example: false },
          laptop_allocated: { type: "boolean", example: false },
          email_created: { type: "boolean", example: false },
          id_card_generated: { type: "boolean", example: false },
          welcome_kit_issued: { type: "boolean", example: false },
          onboarding_status: { type: "string", enum: ["Pending", "Completed"], example: "Pending" }
        }
      },
      OnboardingUpdate: {
        type: "object",
        properties: {
          documents_verified: { type: "boolean", example: true },
          induction_completed: { type: "boolean", example: true },
          laptop_allocated: { type: "boolean", example: true },
          email_created: { type: "boolean", example: true },
          id_card_generated: { type: "boolean", example: true },
          welcome_kit_issued: { type: "boolean", example: true }
        }
      },
      EmployeeExitCreate: {
        type: "object",
        required: ["resignation_date", "last_working_day"],
        properties: {
          employee_id: { type: "integer", minimum: 1, example: 1 },
          resignation_date: { type: "string", format: "date", example: "2026-08-01" },
          last_working_day: { type: "string", format: "date", example: "2026-08-31" },
          reason: { type: "string", example: "Career opportunity" }
        }
      },
      ManagerApproval: {
        type: "object",
        properties: {
          manager_approval: { type: "boolean", example: true }
        }
      },
      HrApproval: {
        type: "object",
        properties: {
          hr_approval: { type: "boolean", example: true }
        }
      },
      ExitComplete: {
        type: "object",
        properties: {
          asset_returned: { type: "boolean", example: true },
          fnf_completed: { type: "boolean", example: true }
        }
      }
    }
  },
  paths: {}
};

Object.assign(spec.paths, {
  "/health": {
    get: operation({
      tag: "Health",
      summary: "Versioned health check",
      description: "Versioned health check endpoint.",
      security: [],
      successDescription: "API is healthy"
    })
  },
  "/auth/login": {
    post: operation({
      tag: "Authentication",
      summary: "Login",
      description: "Authenticates a user and returns a JWT access token.",
      security: [],
      requestBody: json(ref("LoginRequest"), { email: "admin@example.com", password: "Admin@12345" })
    })
  },
  "/auth/logout": {
    post: operation({
      tag: "Authentication",
      summary: "Logout",
      description: "Logs out the authenticated user on the client side."
    })
  },
  "/auth/profile": {
    get: operation({
      tag: "Authentication",
      summary: "Get profile",
      description: "Returns the authenticated user's profile."
    })
  },
  "/auth/change-password": {
    post: operation({
      tag: "Authentication",
      summary: "Change password",
      description: "Changes the authenticated user's password.",
      requestBody: json(ref("ChangePasswordRequest"), { oldPassword: "Admin@12345", newPassword: "NewAdmin@12345" })
    })
  },
  "/dashboard/summary": {
    get: operation({ tag: "Dashboard", summary: "Dashboard summary", description: "Returns dashboard totals and status counts." })
  },
  "/dashboard/department-summary": {
    get: operation({ tag: "Dashboard", summary: "Department summary", description: "Returns department summary data." })
  },
  "/dashboard/attendance-summary": {
    get: operation({
      tag: "Dashboard",
      summary: "Attendance summary",
      description: "Returns attendance summary for a date.",
      parameters: [queryParam("date", { type: "string", format: "date" }, "Attendance date", "2026-07-14")]
    })
  },
  "/dashboard/leave-summary": {
    get: operation({ tag: "Dashboard", summary: "Leave summary", description: "Returns leave status counts." })
  }
});

Object.assign(
  spec.paths,
  crudPaths({
    base: "/roles",
    tag: "Roles",
    name: "roles",
    createSchema: "RoleCreate",
    updateSchema: "RoleUpdate",
    createExample: { name: "Manager", description: "Manager role" },
    updateExample: { name: "Senior Manager", description: "Updated role" },
    listParams: [queryParam("name", { type: "string" }, "Filter by role name", "Admin")]
  }),
  crudPaths({
    base: "/users",
    tag: "Users",
    name: "users",
    createSchema: "UserCreate",
    updateSchema: "UserUpdate",
    createExample: { name: "Jane Admin", email: "jane.admin@example.com", password: "Admin@12345", role_id: 1, is_active: true },
    updateExample: { name: "Jane Manager", role_id: 2, is_active: true },
    listParams: [
      queryParam("role_id", { type: "integer" }, "Filter by role ID", 1),
      queryParam("is_active", { type: "boolean" }, "Filter active users", true)
    ]
  }),
  crudPaths({
    base: "/departments",
    tag: "Departments",
    name: "departments",
    createSchema: "DepartmentCreate",
    updateSchema: "DepartmentUpdate",
    createExample: { department_name: "Operations", description: "Operations department", status: true },
    updateExample: { department_name: "People Operations", status: true },
    listParams: [queryParam("status", { type: "boolean" }, "Filter by status", true)]
  }),
  crudPaths({
    base: "/designations",
    tag: "Designations",
    name: "designations",
    createSchema: "DesignationCreate",
    updateSchema: "DesignationUpdate",
    createExample: { department_id: 2, designation_name: "Engineering Manager", status: true },
    updateExample: { department_id: 2, designation_name: "Senior Engineering Manager", status: true },
    listParams: [
      queryParam("department_id", { type: "integer" }, "Filter by department ID", 2),
      queryParam("status", { type: "boolean" }, "Filter by status", true)
    ]
  }),
  crudPaths({
    base: "/employees",
    tag: "Employees",
    name: "employees",
    createSchema: "EmployeeCreate",
    updateSchema: "EmployeeUpdate",
    createExample: {
      first_name: "Asha",
      last_name: "Nair",
      gender: "Female",
      email: "asha.nair@example.com",
      joining_date: "2026-07-14",
      department_id: 2,
      designation_id: 1,
      salary: 75000
    },
    updateExample: { mobile: "9876543210", salary: 80000, status: "Active" },
    listParams: [
      queryParam("department_id", { type: "integer" }, "Filter by department ID", 2),
      queryParam("designation_id", { type: "integer" }, "Filter by designation ID", 1),
      queryParam("status", { type: "string", enum: ["Active", "Exited"] }, "Filter by employee status", "Active"),
      queryParam("manager_id", { type: "integer" }, "Filter by manager ID", 1)
    ]
  })
);

Object.assign(spec.paths, {
  "/employees/next-code": {
    get: operation({
      tag: "Employees",
      summary: "Generate next employee code",
      description: "Returns the next available employee code based on existing valid EMP numeric codes. Does not update existing employee records.",
      successDescription: "Next employee code generated successfully"
    })
  }
});

Object.assign(spec.paths, {
  "/attendance": {
    get: operation({
      tag: "Attendance",
      summary: "List attendance",
      description: "Returns paginated attendance records. Employees see only their own records.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("attendance_date", { type: "string", format: "date" }, "Filter by attendance date", "2026-07-14"),
        queryParam("status", { type: "string", enum: ["Present", "Absent", "Half Day"] }, "Filter by attendance status", "Present")
      ]
    })
  },
  "/attendance/check-in": {
    post: operation({
      tag: "Attendance",
      summary: "Attendance check-in",
      description: "Creates one attendance check-in for an employee and date.",
      requestBody: json(ref("AttendanceCheckIn"), { employee_id: 1, attendance_date: "2026-07-14", check_in: "09:30:00", status: "Present" }),
      created: true
    })
  },
  "/attendance/check-out": {
    post: operation({
      tag: "Attendance",
      summary: "Attendance check-out",
      description: "Updates an attendance record with check-out time and calculated working hours.",
      requestBody: json(ref("AttendanceCheckOut"), { employee_id: 1, attendance_date: "2026-07-14", check_out: "18:30:00" })
    })
  },
  "/attendance/{employeeId}": {
    get: operation({
      tag: "Attendance",
      summary: "Get attendance by employee",
      description: "Returns paginated attendance records for one employee.",
      parameters: [idParam("employeeId", "Employee ID"), ...paginationParams]
    })
  },
  "/leave-requests": {
    get: operation({
      tag: "Leave Requests",
      summary: "List leave requests",
      description: "Returns paginated leave requests.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("status", { type: "string", enum: ["Pending", "Approved", "Rejected"] }, "Filter by status", "Pending"),
        queryParam("leave_type", { type: "string" }, "Filter by leave type", "Sick Leave")
      ]
    }),
    post: operation({
      tag: "Leave Requests",
      summary: "Create leave request",
      description: "Applies for leave and calculates total days.",
      requestBody: json(ref("LeaveRequestCreate"), { employee_id: 1, leave_type: "Sick Leave", from_date: "2026-08-05", to_date: "2026-08-06", reason: "Medical" }),
      created: true
    })
  },
  "/leave-requests/{id}": {
    get: operation({
      tag: "Leave Requests",
      summary: "Get leave request",
      description: "Returns one leave request by ID.",
      parameters: [idParam()]
    })
  },
  "/leave-requests/{id}/approve": {
    patch: operation({
      tag: "Leave Requests",
      summary: "Approve leave request",
      description: "Approves a leave request as Admin or HR.",
      parameters: [idParam()],
      requestBody: json(ref("LeaveDecision"), { remarks: "Approved" })
    })
  },
  "/leave-requests/{id}/reject": {
    patch: operation({
      tag: "Leave Requests",
      summary: "Reject leave request",
      description: "Rejects a leave request as Admin or HR.",
      parameters: [idParam()],
      requestBody: json(ref("LeaveDecision"), { remarks: "Rejected" })
    })
  }
});

Object.assign(spec.paths, {
  "/payroll": {
    get: operation({
      tag: "Payroll",
      summary: "List payroll",
      description: "Returns paginated payroll records.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("payroll_month", { type: "string" }, "Filter by month", "August"),
        queryParam("payroll_year", { type: "integer" }, "Filter by year", 2026),
        queryParam("salary_status", { type: "string", enum: ["Pending", "Paid"] }, "Filter by salary status", "Pending")
      ]
    }),
    post: operation({
      tag: "Payroll",
      summary: "Create payroll",
      description: "Creates payroll and calculates net salary.",
      requestBody: json(ref("PayrollCreate"), {
        employee_id: 1,
        payroll_month: "August",
        payroll_year: 2026,
        basic_salary: 50000,
        hra: 10000,
        da: 5000,
        bonus: 2500,
        incentives: 1500,
        pf: 3000,
        esi: 500,
        tax: 2000,
        deductions: 750
      }),
      created: true
    })
  },
  "/payroll/{id}": {
    get: operation({ tag: "Payroll", summary: "Get payroll", description: "Returns one payroll record by ID.", parameters: [idParam()] }),
    put: operation({
      tag: "Payroll",
      summary: "Update payroll",
      description: "Updates payroll and recalculates net salary.",
      parameters: [idParam()],
      requestBody: json(ref("PayrollUpdate"), { basic_salary: 52000, salary_status: "Paid", paid_date: "2026-08-31" })
    })
  },
  "/payroll/employee/{employeeId}": {
    get: operation({
      tag: "Payroll",
      summary: "Get payroll by employee",
      description: "Returns payroll records for one employee.",
      parameters: [idParam("employeeId", "Employee ID"), ...paginationParams]
    })
  },
  "/employee-documents": {
    get: operation({
      tag: "Employee Documents",
      summary: "List employee documents",
      description: "Returns paginated employee document metadata.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("document_type", { type: "string" }, "Filter by document type", "Resume")
      ]
    }),
    post: operation({
      tag: "Employee Documents",
      summary: "Upload employee document",
      description: "Uploads a PDF/JPG/JPEG/PNG file and stores document metadata.",
      requestBody: multipart(ref("EmployeeDocumentUpload")),
      created: true
    })
  },
  "/employee-documents/{id}": {
    get: operation({ tag: "Employee Documents", summary: "Get employee document", description: "Returns one employee document metadata record.", parameters: [idParam()] }),
    delete: operation({ tag: "Employee Documents", summary: "Delete employee document", description: "Soft deletes one employee document record.", parameters: [idParam()] })
  }
});

Object.assign(spec.paths, {
  "/onboarding": {
    get: operation({
      tag: "Onboarding",
      summary: "List onboarding",
      description: "Returns paginated onboarding records.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("onboarding_status", { type: "string", enum: ["Pending", "Completed"] }, "Filter by status", "Pending"),
        queryParam("joining_date", { type: "string", format: "date" }, "Filter by joining date", "2026-07-14")
      ]
    }),
    post: operation({
      tag: "Onboarding",
      summary: "Create onboarding",
      description: "Creates one onboarding record for an employee.",
      requestBody: json(ref("OnboardingCreate"), { employee_id: 1, joining_date: "2026-07-14" }),
      created: true
    })
  },
  "/onboarding/{id}": {
    get: operation({ tag: "Onboarding", summary: "Get onboarding", description: "Returns one onboarding record.", parameters: [idParam()] }),
    patch: operation({
      tag: "Onboarding",
      summary: "Update onboarding",
      description: "Updates onboarding checklist fields.",
      parameters: [idParam()],
      requestBody: json(ref("OnboardingUpdate"), { documents_verified: true, induction_completed: true })
    })
  },
  "/onboarding/{id}/complete": {
    patch: operation({
      tag: "Onboarding",
      summary: "Complete onboarding",
      description: "Marks onboarding as completed.",
      parameters: [idParam()],
      requestBody: json(ref("OnboardingUpdate"), { documents_verified: true, induction_completed: true, laptop_allocated: true, email_created: true, id_card_generated: true, welcome_kit_issued: true })
    })
  },
  "/employee-exits": {
    get: operation({
      tag: "Employee Exit",
      summary: "List employee exits",
      description: "Returns paginated employee exit records.",
      parameters: [
        ...paginationParams,
        queryParam("employee_id", { type: "integer" }, "Filter by employee ID", 1),
        queryParam("exit_status", { type: "string", enum: ["Pending", "Completed"] }, "Filter by status", "Pending"),
        queryParam("resignation_date", { type: "string", format: "date" }, "Filter by resignation date", "2026-08-01")
      ]
    }),
    post: operation({
      tag: "Employee Exit",
      summary: "Create employee exit",
      description: "Creates an employee exit process.",
      requestBody: json(ref("EmployeeExitCreate"), { employee_id: 1, resignation_date: "2026-08-01", last_working_day: "2026-08-31", reason: "Career opportunity" }),
      created: true
    })
  },
  "/employee-exits/{id}": {
    get: operation({ tag: "Employee Exit", summary: "Get employee exit", description: "Returns one employee exit record.", parameters: [idParam()] })
  },
  "/employee-exits/{id}/manager-approval": {
    patch: operation({
      tag: "Employee Exit",
      summary: "Update manager approval",
      description: "Updates manager approval for an employee exit.",
      parameters: [idParam()],
      requestBody: json(ref("ManagerApproval"), { manager_approval: true })
    })
  },
  "/employee-exits/{id}/hr-approval": {
    patch: operation({
      tag: "Employee Exit",
      summary: "Update HR approval",
      description: "Updates HR approval for an employee exit.",
      parameters: [idParam()],
      requestBody: json(ref("HrApproval"), { hr_approval: true })
    })
  },
  "/employee-exits/{id}/complete": {
    patch: operation({
      tag: "Employee Exit",
      summary: "Complete employee exit",
      description: "Completes the employee exit process after clearance.",
      parameters: [idParam()],
      requestBody: json(ref("ExitComplete"), { asset_returned: true, fnf_completed: true })
    })
  }
});

Object.assign(spec.paths, {
  "/reports/summary": {
    get: operation({ tag: "Reports", summary: "Summary report", description: "Returns summary report data." })
  },
  "/reports/employees": {
    get: operation({ tag: "Reports", summary: "Employee report", description: "Returns paginated employee report data.", parameters: paginationParams })
  },
  "/reports/attendance": {
    get: operation({ tag: "Reports", summary: "Attendance report", description: "Returns paginated attendance report data.", parameters: paginationParams })
  },
  "/reports/leaves": {
    get: operation({ tag: "Reports", summary: "Leave report", description: "Returns paginated leave report data.", parameters: paginationParams })
  },
  "/reports/payroll": {
    get: operation({ tag: "Reports", summary: "Payroll report", description: "Returns paginated payroll report data.", parameters: paginationParams })
  }
});

module.exports = spec;
