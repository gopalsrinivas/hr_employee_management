# HR Employee Management System

# Part-3 – Backend Architecture

---

# 1. Backend Overview

The backend of the HR Employee Management System is responsible for handling business logic, authentication, authorization, validation, database operations, file uploads, logging, error handling, and REST API communication.

The backend should be developed using a clean and modular architecture so that each module can be developed, tested, and maintained independently.

---

# 2. Backend Technology Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Node.js           | Backend runtime               |
| Express.js        | Web application framework     |
| PostgreSQL        | Relational database           |
| Sequelize ORM     | Database ORM                  |
| JWT               | Authentication                |
| bcrypt            | Password hashing              |
| express-validator | Request validation            |
| Winston           | Application logging           |
| Multer            | File uploads                  |
| Swagger           | API documentation             |
| Helmet            | Security headers              |
| CORS              | Cross-origin request handling |
| dotenv            | Environment variables         |
| Docker            | Containerization              |

---

# 3. Backend Architecture

The backend should follow this request flow:

```text
Client Request
      |
      v
Route
      |
      v
Authentication Middleware
      |
      v
Authorization Middleware
      |
      v
Validation Middleware
      |
      v
Controller
      |
      v
Service
      |
      v
Sequelize Model
      |
      v
PostgreSQL Database
```

The project is a basic interview-oriented application, so a separate repository layer is optional.

The recommended flow for this project is:

```text
Route
  |
Controller
  |
Service
  |
Model
  |
Database
```

---

# 4. Backend Folder Structure

```text
backend/
|
├── src/
│   |
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── swagger.js
│   |
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── departmentController.js
│   │   ├── designationController.js
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   ├── leaveController.js
│   │   ├── payrollController.js
│   │   ├── documentController.js
│   │   ├── onboardingController.js
│   │   └── exitController.js
│   |
│   ├── services/
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── departmentService.js
│   │   ├── designationService.js
│   │   ├── employeeService.js
│   │   ├── attendanceService.js
│   │   ├── leaveService.js
│   │   ├── payrollService.js
│   │   ├── documentService.js
│   │   ├── onboardingService.js
│   │   └── exitService.js
│   |
│   ├── models/
│   │   ├── index.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   ├── Department.js
│   │   ├── Designation.js
│   │   ├── Employee.js
│   │   ├── Attendance.js
│   │   ├── LeaveRequest.js
│   │   ├── Payroll.js
│   │   ├── EmployeeDocument.js
│   │   ├── Onboarding.js
│   │   ├── EmployeeExit.js
│   │   └── AppLog.js
│   |
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── designationRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── onboardingRoutes.js
│   │   └── exitRoutes.js
│   |
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── requestLoggerMiddleware.js
│   │   └── uploadMiddleware.js
│   |
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── employeeValidation.js
│   │   ├── departmentValidation.js
│   │   ├── designationValidation.js
│   │   ├── attendanceValidation.js
│   │   ├── leaveValidation.js
│   │   ├── payrollValidation.js
│   │   ├── onboardingValidation.js
│   │   └── exitValidation.js
│   |
│   ├── utils/
│   │   ├── responseHandler.js
│   │   ├── jwt.js
│   │   ├── password.js
│   │   ├── logger.js
│   │   ├── requestContext.js
│   │   ├── pagination.js
│   │   ├── dateHelper.js
│   │   └── constants.js
│   |
│   ├── migrations/
│   ├── seeders/
│   ├── uploads/
│   ├── logs/
│   ├── swagger/
│   |
│   ├── app.js
│   └── server.js
│
├── tests/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# 5. Layer Responsibilities

## Routes

Routes define API endpoints and connect incoming requests to controllers.

Responsibilities:

* Define HTTP methods.
* Define URL paths.
* Apply authentication middleware.
* Apply role middleware.
* Apply validation middleware.
* Call controller functions.

Routes should not contain:

* Business logic.
* Database queries.
* Response formatting logic.

Example API routes:

```text
POST   /api/v1/auth/login
GET    /api/v1/employees
POST   /api/v1/employees
GET    /api/v1/employees/:id
PUT    /api/v1/employees/:id
DELETE /api/v1/employees/:id
```

---

## Controllers

Controllers receive HTTP requests and return HTTP responses.

Responsibilities:

* Read request body, parameters, and query values.
* Call the appropriate service function.
* Return a standardized response.
* Pass errors to the centralized error middleware.

Controllers should not contain:

* Complex business logic.
* Direct Sequelize queries.
* Salary calculations.
* Leave approval rules.
* Employee exit workflow rules.

Implementation guidelines:

* Use `async/await`.
* Include `next` in the function parameters.
* Keep controller methods small.
* Use common response helpers.
* Pass errors using `next(error)`.

Recommended controller pattern:

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

---

## Services

Services contain application business logic.

Responsibilities:

* Apply business rules.
* Perform database operations using Sequelize models.
* Handle transactions.
* Calculate payroll.
* Validate workflow conditions.
* Set audit fields.
* Prepare data for controllers.

Examples:

* Check whether an employee code already exists.
* Verify whether a department is active.
* Calculate total leave days.
* Calculate net salary.
* Complete employee onboarding.
* Validate employee exit checklist.

Services should not directly return HTTP responses.

Service methods should receive plain data and return plain JavaScript objects or Sequelize records.

---

## Models

Models represent database tables.

Responsibilities:

* Define columns.
* Define data types.
* Define default values.
* Define model validations.
* Define indexes.
* Define table names.
* Define associations.

All database relationships should be configured in `models/index.js` or through model association methods.

---

## Middlewares

Middleware functions execute before or after controller functions.

Main middleware responsibilities:

* Verify JWT token.
* Check user roles.
* Validate request input.
* Handle uploaded files.
* Log requests.
* Handle errors.

Middleware should remain reusable across modules.

---

## Validations

Validation files define request validation rules.

Validation must be applied for:

* Request body.
* URL parameters.
* Query parameters.
* Uploaded files.

Examples:

* Valid email format.
* Required employee code.
* Positive salary.
* Valid department ID.
* Valid date range.
* Ten-digit mobile number.
* Supported leave status.

---

## Utils

Utility files contain reusable technical helpers.

Examples:

* JWT token generation.
* Password hashing.
* Pagination calculation.
* Standard response formatting.
* Date conversion.
* Request ID generation.
* Common constants.

Business rules should not be placed inside utils.

---

# 6. app.js Responsibilities

`app.js` is responsible for configuring the Express application.

It should include:

* Express initialization.
* JSON body parsing.
* CORS configuration.
* Helmet middleware.
* Request logging.
* Static upload folder.
* Swagger route.
* API routes.
* 404 handler.
* Global error middleware.

Recommended middleware order:

```text
Helmet
  |
CORS
  |
JSON Parser
  |
Request Context
  |
Request Logger
  |
Swagger
  |
API Routes
  |
404 Handler
  |
Global Error Handler
```

---

# 7. server.js Responsibilities

`server.js` is responsible for starting the application.

It should:

* Load environment variables.
* Test the PostgreSQL connection.
* Start the Express server.
* Log server URLs.
* Handle uncaught exceptions.
* Handle unhandled promise rejections.
* Gracefully close the server when required.

Server startup flow:

```text
Load Environment Variables
        |
Test Database Connection
        |
Initialize Application
        |
Start HTTP Server
        |
Log Server Information
```

---

# 8. Environment Configuration

Environment variables should be loaded through a centralized configuration file.

Recommended `.env` variables:

```env
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=hr_employee_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=2h

JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=1d

BCRYPT_SALT_ROUNDS=10

UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

LOG_LEVEL=info

FRONTEND_URL=http://localhost:3000
```

Create `.env.example` without real credentials.

---

# 9. Backend Naming Conventions

## Files

Use camelCase:

```text
employeeController.js
employeeService.js
employeeValidation.js
authMiddleware.js
responseHandler.js
```

## Models

Use PascalCase:

```text
Employee
Department
LeaveRequest
EmployeeExit
```

## Database Tables

Use plural snake_case:

```text
employees
departments
leave_requests
employee_documents
employee_exit
```

## Functions

Use action-based names:

```javascript
createEmployee()
updateEmployee()
getEmployeeById()
approveLeave()
completeOnboarding()
completeEmployeeExit()
```

---

# 10. Async/Await Standard

All asynchronous operations should use `async/await`.

Use `async` for:

* Controller methods.
* Service methods.
* Database connection methods.
* Sequelize queries.
* File operations.
* Transaction operations.

Avoid mixing `async/await` with `.then()` unless there is a specific reason.

Example:

```javascript
const getEmployeeById = async (employeeId) => {
  return Employee.findByPk(employeeId);
};
```

---

# Part-3B Preview

The next section includes:

* Authentication Architecture
* JWT Token Flow
* Password Hashing
* Role-Based Authorization
* Validation Middleware
* Standard Response Handler
* Error Handling
* Custom Error Classes
* Request Logging
* Winston Logger
* Request ID Tracking
# HR Employee Management System

# Part-3 – Backend Architecture

---

# 1. Backend Overview

The backend of the HR Employee Management System is responsible for handling business logic, authentication, authorization, validation, database operations, file uploads, logging, error handling, and REST API communication.

The backend should be developed using a clean and modular architecture so that each module can be developed, tested, and maintained independently.

---

# 2. Backend Technology Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Node.js           | Backend runtime               |
| Express.js        | Web application framework     |
| PostgreSQL        | Relational database           |
| Sequelize ORM     | Database ORM                  |
| JWT               | Authentication                |
| bcrypt            | Password hashing              |
| express-validator | Request validation            |
| Winston           | Application logging           |
| Multer            | File uploads                  |
| Swagger           | API documentation             |
| Helmet            | Security headers              |
| CORS              | Cross-origin request handling |
| dotenv            | Environment variables         |
| Docker            | Containerization              |

---

# 3. Backend Architecture

The backend should follow this request flow:

```text
Client Request
      |
      v
Route
      |
      v
Authentication Middleware
      |
      v
Authorization Middleware
      |
      v
Validation Middleware
      |
      v
Controller
      |
      v
Service
      |
      v
Sequelize Model
      |
      v
PostgreSQL Database
```

The project is a basic interview-oriented application, so a separate repository layer is optional.

The recommended flow for this project is:

```text
Route
  |
Controller
  |
Service
  |
Model
  |
Database
```

---

# 4. Backend Folder Structure

```text
backend/
|
├── src/
│   |
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── swagger.js
│   |
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── departmentController.js
│   │   ├── designationController.js
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   ├── leaveController.js
│   │   ├── payrollController.js
│   │   ├── documentController.js
│   │   ├── onboardingController.js
│   │   └── exitController.js
│   |
│   ├── services/
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── departmentService.js
│   │   ├── designationService.js
│   │   ├── employeeService.js
│   │   ├── attendanceService.js
│   │   ├── leaveService.js
│   │   ├── payrollService.js
│   │   ├── documentService.js
│   │   ├── onboardingService.js
│   │   └── exitService.js
│   |
│   ├── models/
│   │   ├── index.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   ├── Department.js
│   │   ├── Designation.js
│   │   ├── Employee.js
│   │   ├── Attendance.js
│   │   ├── LeaveRequest.js
│   │   ├── Payroll.js
│   │   ├── EmployeeDocument.js
│   │   ├── Onboarding.js
│   │   ├── EmployeeExit.js
│   │   └── AppLog.js
│   |
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── designationRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── onboardingRoutes.js
│   │   └── exitRoutes.js
│   |
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── requestLoggerMiddleware.js
│   │   └── uploadMiddleware.js
│   |
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── employeeValidation.js
│   │   ├── departmentValidation.js
│   │   ├── designationValidation.js
│   │   ├── attendanceValidation.js
│   │   ├── leaveValidation.js
│   │   ├── payrollValidation.js
│   │   ├── onboardingValidation.js
│   │   └── exitValidation.js
│   |
│   ├── utils/
│   │   ├── responseHandler.js
│   │   ├── jwt.js
│   │   ├── password.js
│   │   ├── logger.js
│   │   ├── requestContext.js
│   │   ├── pagination.js
│   │   ├── dateHelper.js
│   │   └── constants.js
│   |
│   ├── migrations/
│   ├── seeders/
│   ├── uploads/
│   ├── logs/
│   ├── swagger/
│   |
│   ├── app.js
│   └── server.js
│
├── tests/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# 5. Layer Responsibilities

## Routes

Routes define API endpoints and connect incoming requests to controllers.

Responsibilities:

* Define HTTP methods.
* Define URL paths.
* Apply authentication middleware.
* Apply role middleware.
* Apply validation middleware.
* Call controller functions.

Routes should not contain:

* Business logic.
* Database queries.
* Response formatting logic.

Example API routes:

```text
POST   /api/v1/auth/login
GET    /api/v1/employees
POST   /api/v1/employees
GET    /api/v1/employees/:id
PUT    /api/v1/employees/:id
DELETE /api/v1/employees/:id
```

---

## Controllers

Controllers receive HTTP requests and return HTTP responses.

Responsibilities:

* Read request body, parameters, and query values.
* Call the appropriate service function.
* Return a standardized response.
* Pass errors to the centralized error middleware.

Controllers should not contain:

* Complex business logic.
* Direct Sequelize queries.
* Salary calculations.
* Leave approval rules.
* Employee exit workflow rules.

Implementation guidelines:

* Use `async/await`.
* Include `next` in the function parameters.
* Keep controller methods small.
* Use common response helpers.
* Pass errors using `next(error)`.

Recommended controller pattern:

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

---

## Services

Services contain application business logic.

Responsibilities:

* Apply business rules.
* Perform database operations using Sequelize models.
* Handle transactions.
* Calculate payroll.
* Validate workflow conditions.
* Set audit fields.
* Prepare data for controllers.

Examples:

* Check whether an employee code already exists.
* Verify whether a department is active.
* Calculate total leave days.
* Calculate net salary.
* Complete employee onboarding.
* Validate employee exit checklist.

Services should not directly return HTTP responses.

Service methods should receive plain data and return plain JavaScript objects or Sequelize records.

---

## Models

Models represent database tables.

Responsibilities:

* Define columns.
* Define data types.
* Define default values.
* Define model validations.
* Define indexes.
* Define table names.
* Define associations.

All database relationships should be configured in `models/index.js` or through model association methods.

---

## Middlewares

Middleware functions execute before or after controller functions.

Main middleware responsibilities:

* Verify JWT token.
* Check user roles.
* Validate request input.
* Handle uploaded files.
* Log requests.
* Handle errors.

Middleware should remain reusable across modules.

---

## Validations

Validation files define request validation rules.

Validation must be applied for:

* Request body.
* URL parameters.
* Query parameters.
* Uploaded files.

Examples:

* Valid email format.
* Required employee code.
* Positive salary.
* Valid department ID.
* Valid date range.
* Ten-digit mobile number.
* Supported leave status.

---

## Utils

Utility files contain reusable technical helpers.

Examples:

* JWT token generation.
* Password hashing.
* Pagination calculation.
* Standard response formatting.
* Date conversion.
* Request ID generation.
* Common constants.

Business rules should not be placed inside utils.

---

# 6. app.js Responsibilities

`app.js` is responsible for configuring the Express application.

It should include:

* Express initialization.
* JSON body parsing.
* CORS configuration.
* Helmet middleware.
* Request logging.
* Static upload folder.
* Swagger route.
* API routes.
* 404 handler.
* Global error middleware.

Recommended middleware order:

```text
Helmet
  |
CORS
  |
JSON Parser
  |
Request Context
  |
Request Logger
  |
Swagger
  |
API Routes
  |
404 Handler
  |
Global Error Handler
```

---

# 7. server.js Responsibilities

`server.js` is responsible for starting the application.

It should:

* Load environment variables.
* Test the PostgreSQL connection.
* Start the Express server.
* Log server URLs.
* Handle uncaught exceptions.
* Handle unhandled promise rejections.
* Gracefully close the server when required.

Server startup flow:

```text
Load Environment Variables
        |
Test Database Connection
        |
Initialize Application
        |
Start HTTP Server
        |
Log Server Information
```

---

# 8. Environment Configuration

Environment variables should be loaded through a centralized configuration file.

Recommended `.env` variables:

```env
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=hr_employee_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=2h

JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=1d

BCRYPT_SALT_ROUNDS=10

UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

LOG_LEVEL=info

FRONTEND_URL=http://localhost:3000
```

Create `.env.example` without real credentials.

---

# 9. Backend Naming Conventions

## Files

Use camelCase:

```text
employeeController.js
employeeService.js
employeeValidation.js
authMiddleware.js
responseHandler.js
```

## Models

Use PascalCase:

```text
Employee
Department
LeaveRequest
EmployeeExit
```

## Database Tables

Use plural snake_case:

```text
employees
departments
leave_requests
employee_documents
employee_exit
```

## Functions

Use action-based names:

```javascript
createEmployee()
updateEmployee()
getEmployeeById()
approveLeave()
completeOnboarding()
completeEmployeeExit()
```

---

# 10. Async/Await Standard

All asynchronous operations should use `async/await`.

Use `async` for:

* Controller methods.
* Service methods.
* Database connection methods.
* Sequelize queries.
* File operations.
* Transaction operations.

Avoid mixing `async/await` with `.then()` unless there is a specific reason.

Example:

```javascript
const getEmployeeById = async (employeeId) => {
  return Employee.findByPk(employeeId);
};
```

---

# Part-3B Preview

The next section includes:

* Authentication Architecture
* JWT Token Flow
* Password Hashing
* Role-Based Authorization
* Validation Middleware
* Standard Response Handler
* Error Handling
* Custom Error Classes
* Request Logging
* Winston Logger
* Request ID Tracking

---

# 11. Authentication Architecture

Authentication verifies the identity of a user before allowing access to protected resources.

The application uses JWT (JSON Web Token) based authentication.

---

## Authentication Flow

```text
User

↓

Enter Email & Password

↓

Login API

↓

Validate User

↓

Compare Password (bcrypt)

↓

Generate JWT Token

↓

Return Access Token

↓

Frontend Stores Token

↓

Authorization Header

↓

Protected APIs
```

---

## Login Process

Step 1

User enters

- Email
- Password

↓

Step 2

Backend validates

- Email exists
- User status is Active

↓

Step 3

Compare password using bcrypt

↓

Step 4

Generate JWT Token

↓

Step 5

Return

- Access Token
- User Information
- Role

---

## Logout Process

JWT is stateless.

Logout means

- Remove token from frontend
- Remove refresh token (if implemented)

---

## Password Security

Passwords must

- Never be stored in plain text.
- Always be hashed using bcrypt.
- Never be returned in API responses.
- Never be logged.

Example

```
User Password

↓

bcrypt Hash

↓

Database
```

---

# 12. JWT Token Flow

```
Login

↓

Generate JWT

↓

Return Token

↓

Frontend Stores Token

↓

Every API Request

↓

Authorization Header

↓

JWT Middleware

↓

Validate Token

↓

Allow Request
```

---

## Authorization Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

## JWT Payload

Recommended Payload

```json
{
  "userId": 1,
  "role": "Admin",
  "email": "admin@example.com"
}
```

Never store

- Password
- Salary
- Mobile Number
- Sensitive Information

inside JWT.

---

# 13. Role-Based Authorization

The application supports Role-Based Access Control (RBAC).

---

## Available Roles

```
Admin

HR

Employee
```

---

## Permission Matrix

| Module | Admin | HR | Employee |
|---------|:-----:|:--:|:--------:|
| Dashboard | ✅ | ✅ | ✅ |
| Users | ✅ | ❌ | ❌ |
| Roles | ✅ | ❌ | ❌ |
| Departments | ✅ | Read | ❌ |
| Designations | ✅ | Read | ❌ |
| Employees | ✅ | CRUD | Self Only |
| Attendance | ✅ | CRUD | Self Only |
| Leave | ✅ | CRUD | Self Only |
| Payroll | ✅ | CRUD | Self Only |
| Documents | ✅ | CRUD | Self Only |
| Employee Exit | ✅ | CRUD | Self Only |

---

## Authorization Middleware Flow

```
API Request

↓

JWT Middleware

↓

Extract Role

↓

Check Permission

↓

Authorized

↓

Controller
```

---

# 14. Validation Architecture

Validation should happen before the controller executes.

Flow

```
Client

↓

Validation Middleware

↓

Controller

↓

Service
```

---

## Validation Types

Request Body

```
POST

PUT
```

---

Query Parameters

```
?page=1

?limit=10
```

---

Path Parameters

```
/employees/:id
```

---

File Validation

- File Size
- File Type
- Extension

---

## Validation Rules

Employee

- Employee Code Required
- First Name Required
- Email Required
- Mobile Required
- Department Required

Leave

- From Date Required
- To Date Required
- Reason Required

Payroll

- Salary >= 0

Attendance

- Check In Required

---

# 15. Standard API Response

Every API should return the same response structure.

---

## Success Response

```json
{
    "success": true,
    "message": "Employee Created Successfully",
    "data": {},
    "statusCode": 201
}
```

---

## Validation Error

```json
{
    "success": false,
    "message": "Validation Failed",
    "errors": [],
    "statusCode": 400
}
```

---

## Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized",
    "statusCode": 401
}
```

---

## Server Error

```json
{
    "success": false,
    "message": "Internal Server Error",
    "statusCode": 500
}
```

---

# 16. Centralized Error Handling

The application should use one Global Error Middleware.

Flow

```
Controller

↓

Service

↓

Throw Error

↓

Global Error Middleware

↓

JSON Response
```

---

## Common Errors

- Validation Error
- Unauthorized
- Forbidden
- Record Not Found
- Duplicate Record
- Database Error
- Internal Server Error

---

# 17. Custom Error Classes

Recommended Custom Errors

```
ValidationError

AuthenticationError

AuthorizationError

NotFoundError

ConflictError

DatabaseError
```

Advantages

- Cleaner Code
- Reusable
- Easy Debugging
- Standard Responses

---

# 18. Request Logging

Every API request should be logged.

Log

- URL
- HTTP Method
- User ID
- IP Address
- Execution Time
- Response Status

---

Example

```
POST /api/v1/employees

Status : 201

Time : 145 ms

User : Admin
```

---

# 19. Winston Logger

Log Levels

```
INFO

WARN

ERROR

DEBUG
```

---

Separate Log Files

```
logs/

application.log

error.log

combined.log
```

---

Log the following

- User Login
- User Logout
- Employee Created
- Employee Updated
- Employee Deleted
- Leave Approved
- Payroll Generated
- API Errors
- Database Errors

---

# 20. Request ID Tracking

Every request should generate a unique Request ID.

Example

```
REQ-20260714-000001
```

Every log entry should include

```
Request ID

User ID

Timestamp

API

Status Code
```

Benefits

- Easy Debugging
- Production Monitoring
- Request Tracing
- Log Correlation

---

# Part-3C Preview

Next section includes

- File Upload Architecture
- Swagger Documentation
- Docker Structure
- API Design Standards
- Pagination
- Filtering
- Searching
- Sorting
- Security Best Practices
- Performance Best Practices
- Backend Development Checklist
- Acceptance Criteria
- Codex Instructions

---

# 21. File Upload Architecture

The application allows employees and HR users to upload employee-related documents securely.

---

## Supported Documents

- Aadhaar Card
- PAN Card
- Resume
- Passport
- Educational Certificates
- Experience Certificates
- Offer Letter
- Relieving Letter
- Salary Slips
- Profile Photo

---

## Supported File Types

```
PDF

JPG

JPEG

PNG
```

---

## Maximum File Size

```
5 MB
```

The file size should be configurable using environment variables.

---

## Upload Flow

```
User

↓

Choose File

↓

Frontend Validation

↓

API Request

↓

Upload Middleware

↓

File Validation

↓

Store File

↓

Save Metadata

↓

Database

↓

Success Response
```

---

## Upload Folder Structure

```
uploads/

employees/

documents/

photos/

temp/
```

---

## File Naming Convention

Store uploaded files using UUID or Timestamp.

Example

```
EMP001_20260714_Resume.pdf

EMP002_Aadhaar.pdf
```

Avoid using original filenames directly.

---

# 22. Swagger Documentation

Swagger should document every REST API.

---

## Swagger Information

```
Title

HR Employee Management API

Version

v1

Description

REST APIs for HR Employee Management System
```

---

## Every API should include

- Endpoint
- HTTP Method
- Description
- Authentication
- Request Body
- Path Parameters
- Query Parameters
- Success Response
- Error Response

---

Example

```
POST

/api/v1/employees
```

Description

```
Create Employee
```

---

# 23. API Design Standards

All APIs should follow REST standards.

---

## HTTP Methods

```
GET

POST

PUT

PATCH

DELETE
```

---

## API Versioning

```
/api/v1/
```

Example

```
/api/v1/employees

/api/v1/departments

/api/v1/payroll
```

---

## Resource Naming

Use plural resource names.

Good

```
employees

departments

leave-requests
```

Avoid

```
employee

departmentList

getEmployee
```

---

# 24. Pagination

Large datasets should always support pagination.

Request

```
GET /employees?page=1&limit=10
```

Response

```json
{
  "page":1,
  "limit":10,
  "totalRecords":100,
  "totalPages":10,
  "data":[]
}
```

---

# 25. Searching

The application should support searching.

Examples

Search Employee

```
employee_code

employee_name

email

mobile
```

Department

```
department_name
```

Designation

```
designation_name
```

---

# 26. Filtering

Employee Filters

```
Department

Designation

Status

Joining Date

Manager
```

Attendance Filters

```
Date

Employee

Status
```

Leave Filters

```
Status

Employee

Leave Type
```

Payroll Filters

```
Month

Year

Employee
```

---

# 27. Sorting

Supported Sorting

```
Employee Name

Joining Date

Salary

Department

Designation
```

Request

```
sortBy=joining_date

order=ASC
```

---

# 28. Backend Security Best Practices

Security Guidelines

- Enable Helmet Middleware.
- Enable CORS.
- Use HTTPS in production.
- Hash passwords using bcrypt.
- Store secrets only in `.env`.
- Never expose stack traces.
- Validate every request.
- Sanitize user input.
- Use parameterized Sequelize queries.
- Prevent SQL Injection.
- Prevent XSS attacks.
- Restrict file uploads.
- Implement Rate Limiting.
- Validate JWT on every protected API.

---

# 29. Backend Performance Best Practices

Performance Guidelines

- Use database indexes.
- Avoid unnecessary joins.
- Fetch only required columns.
- Use pagination.
- Use eager loading where required.
- Cache master data if necessary.
- Keep controller logic minimal.
- Reuse service methods.
- Optimize database queries.
- Avoid duplicate API calls.

---

# 30. Logging Standards

Log the following events.

Authentication

- Login
- Logout
- Invalid Login

Employee

- Create
- Update
- Delete

Attendance

- Check In
- Check Out

Leave

- Apply
- Approve
- Reject

Payroll

- Generate Payroll

System

- API Errors
- Database Errors
- File Upload Errors

---

# 31. Exception Handling Standards

Handle the following exceptions.

```
400

Bad Request
```

```
401

Unauthorized
```

```
403

Forbidden
```

```
404

Not Found
```

```
409

Conflict
```

```
422

Validation Failed
```

```
500

Internal Server Error
```

Every error response should follow the standard response structure.

---

# 32. Backend Development Checklist

Before moving to frontend development, verify the following.

Authentication

- JWT Login
- JWT Middleware
- Role Authorization

Database

- Migrations
- Seeders
- Associations

Modules

- Roles
- Users
- Departments
- Designations
- Employees
- Attendance
- Leave
- Payroll
- Documents
- Onboarding
- Employee Exit

Infrastructure

- Swagger
- Winston Logging
- Validation
- Error Handling
- Docker

Testing

- Postman Collection
- API Validation
- CRUD Testing

---

# 33. Acceptance Criteria

Backend development is considered complete when:

- All REST APIs are implemented.
- JWT Authentication works correctly.
- Role-Based Authorization is implemented.
- CRUD operations are completed for every module.
- Validation middleware is applied.
- Error handling is centralized.
- Swagger documentation is available.
- Logging is enabled.
- File uploads work successfully.
- PostgreSQL relationships work correctly.
- Docker containers start successfully.
- APIs are tested using Postman.

---

# 34. Codex Development Instructions

Develop the backend module-by-module.

Implementation Rules

- Follow MVC Architecture.
- Use Controller → Service → Model → PostgreSQL flow.
- Use Sequelize ORM.
- Use async/await throughout the project.
- Use JWT Authentication.
- Use Role-Based Authorization.
- Implement Validation Middleware.
- Implement Centralized Error Handling.
- Use Standard API Response Format.
- Use Audit Columns in all business tables.
- Implement Soft Delete where applicable.
- Write reusable and modular code.
- Follow REST API naming conventions.
- Generate production-ready code.

---

# Part-4 Preview

The next document is **Part-4 – Frontend Architecture**, which includes:

- Next.js Architecture
- Frontend Folder Structure
- Pages
- Components
- Layouts
- Authentication
- API Integration
- State Management
- Forms
- Dashboard
- Tables
- Routing
- Protected Routes
- UI Standards
- Frontend Development Guidelines
- Codex Instructions
