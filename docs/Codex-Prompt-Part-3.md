# Codex Prompt - Part 3

# HR Employee Management System

## Objective

You are a Senior Node.js Backend Developer.

Continue developing the HR Employee Management System.

Implement only the backend API architecture and core modules.

Do not generate frontend pages in this phase.

Use the database models, migrations, associations, constraints, indexes, and seed data already created in Part 2.

---

# Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT
* bcrypt
* express-validator
* Winston
* Swagger
* Multer
* Helmet
* CORS

---

# Architecture

Follow this architecture:

```text
Route
  |
Middleware
  |
Controller
  |
Service
  |
Sequelize Model
  |
PostgreSQL
```

Do not use a repository layer for this interview project.

---

# Scope

Implement:

* Routes
* Controllers
* Services
* Middlewares
* Validations
* Common utilities
* Standard response handling
* Centralized error handling
* JWT authentication
* Role-based authorization
* Request logging
* Winston logging
* Swagger documentation
* File upload support

---

# Backend Folder Structure

```text
backend/
|
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│   ├── utils/
│   ├── constants/
│   ├── swagger/
│   ├── uploads/
│   ├── logs/
│   ├── app.js
│   └── server.js
│
├── tests/
├── .env
├── .env.example
├── package.json
├── Dockerfile
└── docker-compose.yml
```

---

# Modules to Implement

Implement backend APIs for:

* Authentication
* Dashboard
* Roles
* Users
* Departments
* Designations
* Employees
* Attendance
* Leave Requests
* Payroll
* Employee Documents
* Onboarding
* Employee Exit
* Reports

---

# Controller Standards

Every controller function must:

* Use `async/await`.
* Accept `req`, `res`, and `next`.
* Read request values.
* Call the service layer.
* Return a standard response.
* Pass errors using `next(error)`.

Example pattern:

```javascript
const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(
      req.body,
      req.user
    );

    return successResponse(
      res,
      201,
      "Employee created successfully",
      employee
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
};
```

Do not place business logic inside controllers.

Do not write Sequelize queries inside controllers.

---

# Service Standards

Services must:

* Contain business logic.
* Use Sequelize models.
* Apply business rules.
* Use transactions where required.
* Set audit fields.
* Handle soft delete.
* Return plain data to controllers.

Examples:

* Validate unique employee code.
* Validate active department.
* Calculate leave days.
* Calculate payroll.
* Complete onboarding.
* Complete employee exit.

---

# Authentication APIs

Implement:

```text
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/change-password
GET  /api/v1/auth/profile
```

Login response should return:

* Access token
* Refresh token if implemented
* User ID
* Employee ID
* Name
* Email
* Role

---

# JWT Requirements

* Generate access token.
* Verify access token.
* Add JWT middleware.
* Reject expired or invalid tokens.
* Read user details from JWT.
* Do not store sensitive data in the token.
* Use environment variables for secrets and expiry.

JWT payload should contain only:

```json
{
  "userId": 1,
  "employeeId": 1,
  "email": "admin@example.com",
  "role": "Admin"
}
```

---

# Password Requirements

* Hash passwords using bcrypt.
* Never store plain-text passwords.
* Never return passwords in API responses.
* Never log passwords.
* Validate old password during password change.

---

# Role-Based Authorization

Roles:

* Admin
* HR
* Employee

Permissions:

## Admin

* Full access.

## HR

* Employee management.
* Attendance management.
* Leave approval.
* Payroll management.
* Onboarding.
* Employee exit.
* Reports.

## Employee

* View own profile.
* Mark own attendance.
* Apply for leave.
* View own payroll.
* Upload own documents.
* Submit resignation.

Create reusable role middleware.

---

# Department APIs

Implement:

```text
POST   /api/v1/departments
GET    /api/v1/departments
GET    /api/v1/departments/:id
PUT    /api/v1/departments/:id
DELETE /api/v1/departments/:id
```

Requirements:

* Search
* Pagination
* Sorting
* Soft delete
* Audit fields
* Unique department name validation

---

# Designation APIs

Implement:

```text
POST   /api/v1/designations
GET    /api/v1/designations
GET    /api/v1/designations/:id
PUT    /api/v1/designations/:id
DELETE /api/v1/designations/:id
```

Requirements:

* Department mapping
* Search
* Pagination
* Sorting
* Soft delete
* Duplicate prevention within department

---

# Employee APIs

Implement:

```text
POST   /api/v1/employees
GET    /api/v1/employees
GET    /api/v1/employees/:id
PUT    /api/v1/employees/:id
DELETE /api/v1/employees/:id
```

Employee list must support:

* Search by employee code
* Search by name
* Search by email
* Search by mobile
* Filter by department
* Filter by designation
* Filter by status
* Pagination
* Sorting

Employee creation must:

* Validate unique employee code.
* Validate unique email.
* Validate department.
* Validate designation.
* Validate reporting manager.
* Set audit columns.
* Use a transaction if user login creation happens together.

---

# Attendance APIs

Implement:

```text
POST /api/v1/attendance/check-in
POST /api/v1/attendance/check-out
GET  /api/v1/attendance
GET  /api/v1/attendance/:employeeId
```

Business rules:

* One check-in per employee per day.
* Check-out only after check-in.
* Check-out must be later than check-in.
* Calculate working hours automatically.
* Employees can access only their own attendance.
* HR and Admin can view all attendance.

---

# Leave APIs

Implement:

```text
POST  /api/v1/leave-requests
GET   /api/v1/leave-requests
GET   /api/v1/leave-requests/:id
PATCH /api/v1/leave-requests/:id/approve
PATCH /api/v1/leave-requests/:id/reject
```

Business rules:

* From date must not be after to date.
* Calculate total days automatically.
* Default status should be Pending.
* Employee cannot approve their own leave.
* HR or Admin can approve or reject.
* Store approved_by and approved_date.

---

# Payroll APIs

Implement:

```text
POST /api/v1/payroll
GET  /api/v1/payroll
GET  /api/v1/payroll/:id
GET  /api/v1/payroll/employee/:employeeId
PUT  /api/v1/payroll/:id
```

Business rules:

* One payroll record per employee per month.
* Calculate net salary automatically.
* Prevent negative amounts.
* Employee can view only own payroll.
* HR and Admin can manage payroll.

Net salary:

```text
Basic Salary
+ HRA
+ DA
+ Bonus
+ Incentives
- PF
- ESI
- Tax
- Other Deductions
```

---

# Employee Document APIs

Implement:

```text
POST   /api/v1/employee-documents
GET    /api/v1/employee-documents
GET    /api/v1/employee-documents/:id
DELETE /api/v1/employee-documents/:id
```

Requirements:

* Use Multer.
* Allow PDF, JPG, JPEG, and PNG.
* Maximum file size must come from environment variables.
* Save metadata in PostgreSQL.
* Use safe generated filenames.
* Apply authorization rules.
* Soft delete document records.

---

# Onboarding APIs

Implement:

```text
POST  /api/v1/onboarding
GET   /api/v1/onboarding
GET   /api/v1/onboarding/:id
PATCH /api/v1/onboarding/:id
PATCH /api/v1/onboarding/:id/complete
```

Business rules:

* One onboarding record per employee.
* Track document verification.
* Track induction.
* Track laptop allocation.
* Track official email creation.
* Track ID card generation.
* Mark employee Active after successful onboarding completion.

---

# Employee Exit APIs

Implement:

```text
POST  /api/v1/employee-exits
GET   /api/v1/employee-exits
GET   /api/v1/employee-exits/:id
PATCH /api/v1/employee-exits/:id/manager-approval
PATCH /api/v1/employee-exits/:id/hr-approval
PATCH /api/v1/employee-exits/:id/complete
```

Business rules:

* Last working day must not be before resignation date.
* Manager approval is required.
* HR approval is required.
* Asset return is required.
* Full and final settlement is required.
* Relieving letter should be generated only after clearance.
* Change employee status to Exited when exit is completed.

---

# Dashboard APIs

Implement:

```text
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/department-summary
GET /api/v1/dashboard/attendance-summary
GET /api/v1/dashboard/leave-summary
```

Return:

* Total employees
* Active employees
* Employees on notice
* Exited employees
* Department count
* Present employees
* Absent employees
* Pending leave requests
* Recent joiners
* Employees exiting

---

# Validation Middleware

Create validations for:

* Authentication
* Departments
* Designations
* Employees
* Attendance
* Leave
* Payroll
* Onboarding
* Employee exit

Validation must handle:

* Request body
* Query parameters
* Path parameters
* Uploaded files

Return a standard validation error response.

---

# Standard Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "statusCode": 200
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Operation failed",
  "errors": [],
  "statusCode": 400,
  "requestId": "request-id"
}
```

---

# Centralized Error Handling

Create:

* Custom error class
* 404 middleware
* Global error middleware

Handle:

* Validation errors
* Authentication errors
* Authorization errors
* Not found errors
* Conflict errors
* Sequelize validation errors
* Unique constraint errors
* Foreign key errors
* File upload errors
* Internal server errors

Do not expose stack traces in production.

---

# Logging

Configure Winston.

Log:

* API requests
* API responses
* Login attempts
* Authentication failures
* Employee creation
* Employee updates
* Leave approvals
* Payroll generation
* Onboarding completion
* Exit completion
* Database errors
* File upload errors

Create:

```text
logs/combined.log
logs/error.log
```

Include:

* Request ID
* User ID
* Method
* URL
* Status code
* Execution time

---

# Swagger

Document all APIs.

Swagger must include:

* JWT bearer authentication
* Request body schemas
* Query parameters
* Path parameters
* Success examples
* Error examples
* Validation requirements

Swagger route:

```text
/api-docs
```

---

# Audit Columns

Set audit columns using authenticated user details.

On create:

```text
created_by
created_at
```

On update:

```text
updated_by
updated_at
```

On delete:

```text
deleted_by
deleted_at
```

Use soft delete where applicable.

---

# Pagination Standard

Request:

```text
?page=1&limit=10
```

Response:

```json
{
  "success": true,
  "message": "Records fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalRecords": 100,
    "totalPages": 10
  }
}
```

---

# Testing Requirements

Add tests for:

* Successful login
* Invalid login
* Unauthorized access
* Employee creation
* Duplicate employee code
* Employee search
* Attendance check-in
* Duplicate check-in
* Leave application
* Leave approval
* Payroll calculation
* Employee exit completion

Use an appropriate Node.js testing framework already available in the project, or add Jest and Supertest.

---

# Deliverables

Generate:

* Controllers
* Services
* Routes
* Middlewares
* Validations
* Utilities
* Error handling
* Authentication
* Authorization
* Logging
* Swagger documentation
* File upload support
* Backend tests

Do not generate frontend pages in this phase.

Do not remove or recreate existing database migrations unless necessary.

Do not change the documented database schema without explaining the reason.

Generate clean, modular, interview-quality backend code.
