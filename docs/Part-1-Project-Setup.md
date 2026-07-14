# HR Employee Management System

# Part-1 – Project Setup

---

# 1. Project Overview

## Introduction

The HR Employee Management System is a web-based application developed to automate Human Resource operations within an organization.

This application enables HR teams to efficiently manage employees, departments, attendance, leave requests, payroll, onboarding, employee exit process, documents, and reports through a centralized system.

The application follows a clean MVC architecture using Node.js, Express.js, PostgreSQL, Sequelize ORM, and Next.js.

The primary objective of this project is to build an interview-ready enterprise-level application using modern development practices.

---

## Project Objectives

The main objectives of this project are:

- Build a secure HR Management application.
- Learn enterprise application architecture.
- Practice Node.js Backend Development.
- Practice PostgreSQL Database Design.
- Understand MVC Architecture.
- Learn Authentication & Authorization.
- Implement REST APIs.
- Implement Role Based Access Control.
- Prepare for Full Stack Developer interviews.
- Create a production-ready portfolio project.

---

## Project Scope

The application will support the following business operations.

### Authentication

- Login
- Logout
- JWT Authentication
- Role Based Authorization

### Employee Management

- Add Employee
- Update Employee
- Delete Employee
- View Employee
- Search Employee

### Department Management

- Create Department
- Update Department
- Delete Department
- List Departments

### Designation Management

- Add Designation
- Update Designation
- Delete Designation

### Attendance Management

- Daily Attendance
- Check In
- Check Out
- Working Hours
- Attendance Reports

### Leave Management

- Apply Leave
- Approve Leave
- Reject Leave
- Leave History

### Payroll

- Salary Details
- Monthly Payroll
- Deductions
- Net Salary

### Employee Documents

- Upload Documents
- Download Documents
- Delete Documents

### Employee Onboarding

- Document Verification
- IT Asset Allocation
- Account Creation
- Induction Status

### Employee Exit

- Resignation
- Exit Approval
- Asset Return
- Experience Letter
- Relieving Letter

### Dashboard

- Employee Count
- Department Count
- Leave Statistics
- Attendance Statistics

---

# 2. Business Requirements

The HR department should be able to perform all employee-related activities through a centralized application.

The application should maintain employee records securely and allow only authorized users to access the data.

The system should eliminate manual Excel-based employee management and provide a single source of truth for all HR operations.

---

## Primary Users

- System Administrator
- HR Manager
- HR Executive
- Employee

---

## Business Goals

- Reduce manual work.
- Improve employee data accuracy.
- Secure employee information.
- Track employee lifecycle.
- Simplify payroll processing.
- Improve reporting.
- Maintain audit history.

---

# 3. Functional Requirements

The system shall provide the following functionality.

## User Authentication

- Login
- Logout
- Change Password
- Reset Password

---

## Employee Module

- Create Employee
- View Employee
- Update Employee
- Delete Employee
- Search Employee
- Filter Employee
- Pagination

---

## Department Module

- CRUD Operations
- Search
- Pagination

---

## Designation Module

- CRUD Operations
- Department Mapping

---

## Attendance Module

- Daily Attendance
- Check In
- Check Out
- Attendance Report

---

## Leave Module

- Apply Leave
- Approve Leave
- Reject Leave
- Leave History

---

## Payroll Module

- Salary Details
- Payroll Generation
- Monthly Salary Report

---

## Employee Documents

- Upload
- View
- Download
- Delete

---

## Employee Onboarding

- Document Verification
- IT Account Creation
- Welcome Kit
- Induction Status

---

## Employee Exit

- Exit Request
- Manager Approval
- HR Approval
- Asset Return
- Experience Letter
- Relieving Letter

---

# 4. Non-Functional Requirements

The application should satisfy the following quality requirements.

## Performance

- API response time should be less than 2 seconds.
- Pagination should be used for large datasets.
- Database indexes should improve query performance.

---

## Security

- Passwords must be encrypted using bcrypt.
- JWT Authentication must be implemented.
- Role Based Authorization must be enabled.
- SQL Injection should be prevented.
- XSS protection should be enabled.

---

## Scalability

The application should support future enhancements such as:

- Recruitment Module
- Performance Module
- Training Module
- Asset Management
- Multi Branch Support

---

## Reliability

- Database transactions should be used where required.
- Error logs should be maintained.
- Audit history should be available.

---

## Availability

The application should be deployable using Docker and cloud platforms without major architecture changes.

---

# 5. Technology Stack

## Backend

- Node.js (LTS)
- Express.js

---

## Database

- PostgreSQL

---

## ORM

- Sequelize ORM

---

## Frontend

- Next.js
- React.js
- Tailwind CSS

---

## Authentication

- JWT
- bcrypt

---

## Validation

- express-validator

---

## Logging

- Winston

---

## API Documentation

- Swagger (OpenAPI)

---

## File Upload

- Multer

---

## Development Tools

- Nodemon
- ESLint
- Prettier
- Git
- Docker

---

# 6. System Architecture

The HR Employee Management System follows a three-tier architecture.

```
                    +----------------------+
                    |     Web Browser      |
                    | (Next.js Frontend)   |
                    +----------+-----------+
                               |
                               |
                          REST APIs
                               |
                               |
                    +----------v-----------+
                    | Node.js + Express.js |
                    |      Backend API     |
                    +----------+-----------+
                               |
                     Sequelize ORM
                               |
                               |
                    +----------v-----------+
                    |     PostgreSQL       |
                    |      Database        |
                    +----------------------+
```

---

## Architecture Layers

### Presentation Layer

Responsibilities

- User Interface
- Forms
- Dashboard
- Tables
- Reports
- Authentication Screens

Technology

- Next.js
- React.js
- Tailwind CSS

---

### Business Layer

Responsibilities

- Business Logic
- Authentication
- Authorization
- Validation
- Salary Calculation
- Leave Approval
- Attendance Rules

Technology

- Node.js
- Express.js

---

### Data Layer

Responsibilities

- Store Application Data
- CRUD Operations
- Relationships
- Constraints
- Transactions

Technology

- PostgreSQL
- Sequelize ORM

---

# 7. Software Prerequisites

The following software must be installed before starting development.

| Software | Recommended Version |
| ---------- | ------------------- |
| Node.js | Latest LTS |
| npm | Latest |
| PostgreSQL | 17.x |
| Git | Latest |
| VS Code | Latest |
| Docker Desktop | Latest |
| Postman | Latest |

---

## VS Code Extensions

Recommended Extensions

- ESLint
- Prettier
- Docker
- PostgreSQL
- REST Client
- Thunder Client
- GitLens
- Material Icon Theme

---

## Backend Packages

Main Packages

```
express
sequelize
pg
pg-hstore
jsonwebtoken
bcrypt
dotenv
cors
helmet
morgan
winston
multer
express-validator
swagger-jsdoc
swagger-ui-express
```

Development Packages

```
nodemon
eslint
prettier
sequelize-cli
```

---

# 8. Backend Project Initialization

## Step 1

Create Project Folder

```
hr-employee-management
```

---

## Step 2

Create Backend Folder

```
backend/
```

---

## Step 3

Initialize Node Project

```
npm init -y
```

---

## Step 4

Install Required Packages

```
npm install express sequelize pg pg-hstore dotenv cors helmet jsonwebtoken bcrypt express-validator multer swagger-ui-express swagger-jsdoc morgan winston
```

---

## Step 5

Install Development Packages

```
npm install --save-dev nodemon eslint prettier sequelize-cli
```

---

## Step 6

Initialize Sequelize

```
npx sequelize-cli init
```

This creates

```
config/
models/
migrations/
seeders/
```

---

# 9. Frontend Project Initialization

## Create Frontend

```
npx create-next-app@latest frontend
```

---

## Install Packages

```
npm install axios
npm install react-hook-form
npm install react-hot-toast
npm install jwt-decode
npm install react-icons
```

---

## Tailwind CSS

Tailwind CSS will be used for

- Forms
- Tables
- Dashboard
- Buttons
- Cards
- Reports
- Responsive Layout

---

# 10. PostgreSQL Setup

## Database Name

```
hr_employee_management
```

---

## Database Encoding

```
UTF-8
```

---

## Database Owner

```
postgres
```

---

## Default Port

```
5432
```

---

## Create Database

```
CREATE DATABASE hr_employee_management;
```

---

# 11. Sequelize Configuration

Update database configuration inside

```
config/config.js
```

Environment

```
development

test

production
```

Each environment should have

- Database Name
- Username
- Password
- Host
- Port
- Dialect

---

## Sequelize Naming Convention

- One model for one table
- Singular Model Name
- Plural Table Name
- Camel Case Model
- Snake Case Database Columns

Example

```
Employee Model

↓

employees table
```

---

# 12. Environment Variables

Create

```
.env
```

Example

```env
NODE_ENV=development

PORT=5000

APP_NAME=HR Employee Management System

DB_HOST=localhost

DB_PORT=5432

DB_NAME=hr_employee_management

DB_USER=postgres

DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d

UPLOAD_PATH=uploads

LOG_LEVEL=info
```

Never commit

- .env
- Database Password
- JWT Secret

to Git Repository.

---

# 13. Backend Folder Structure

```
backend/

│

├── src/

│   ├── config/

│   ├── controllers/

│   ├── services/

│   ├── models/

│   ├── migrations/

│   ├── seeders/

│   ├── routes/

│   ├── middlewares/

│   ├── validations/

│   ├── helpers/

│   ├── utils/

│   ├── constants/

│   ├── swagger/

│   ├── uploads/

│   ├── logs/

│   ├── database/

│   ├── app.js

│   └── server.js

│

├── package.json

├── .env

├── .gitignore

├── Dockerfile

├── docker-compose.yml

└── README.md
```

---

## Folder Responsibilities

### controllers/

Receives requests and returns responses.

---

### services/

Contains business logic.

---

### models/

Contains Sequelize Models.

---

### routes/

Defines REST API endpoints.

---

### middlewares/

Authentication, Authorization, Error Handling.

---

### validations/

Request validation.

---

### helpers/

Reusable helper functions.

---

### utils/

Common utility methods.

---

### uploads/

Employee documents.

---

### logs/

Application logs.

---

### swagger/

Swagger API documentation.

---

## Part-1C Preview

Next section includes

- Coding Standards
- Naming Conventions
- Git Branching Strategy
- Authentication Flow
- Authorization Flow
- Standard API Response Format
- Error Response Format
- Logging Standards
- Security Best Practices
- Development Guidelines
- Module Development Order
- Acceptance Criteria
- Codex Instructions

---

# 14. Coding Standards

To maintain consistency and improve code readability, every developer should follow the same coding standards throughout the project.

---

## General Coding Standards

- Follow MVC Architecture.
- Use async/await for asynchronous operations.
- Never write business logic inside controllers.
- Keep functions small and reusable.
- Use meaningful variable and function names.
- Use proper HTTP Status Codes.
- Write clean and readable code.
- Avoid duplicate code (DRY Principle).
- Follow SOLID Principles wherever applicable.
- Use dependency injection where appropriate.
- Keep each module independent.

---

## Controller Standards

Responsibilities

- Receive HTTP Request.
- Validate Request.
- Call Service Layer.
- Return HTTP Response.

Controllers should **NOT**

- Write SQL Queries.
- Write Business Logic.
- Access Database Directly.
- Perform Complex Calculations.

Example Flow

```
Client

↓

Routes

↓

Controller

↓

Service

↓

Repository

↓

Model

↓

Database
```

---

## Service Standards

Responsibilities

- Business Logic
- Validation Rules
- Database Transactions
- Calling Multiple Repositories
- Response Preparation

Services should **NOT**

- Return HTTP Response
- Access Request Object
- Access Response Object

---

## Repository Standards

Responsibilities

- Database Queries
- CRUD Operations
- Sequelize Queries

Repository should not contain

- Business Logic
- Response Formatting

---

## Model Standards

Models should contain

- Table Name
- Columns
- Relationships
- Default Values
- Validations
- Indexes

---

# 15. Naming Conventions

## Folder Naming

Use

```
lowercase
```

Example

```
controllers

services

middlewares

routes
```

---

## File Naming

Use camelCase

Examples

```
employeeController.js

employeeService.js

employeeRepository.js

employeeModel.js

authMiddleware.js
```

---

## Variable Naming

Good

```javascript
employeeName

joiningDate

basicSalary

employeeList
```

Bad

```javascript
a

b

temp1

xyz
```

---

## Function Naming

Good

```javascript
createEmployee()

updateEmployee()

deleteEmployee()

getEmployeeById()

approveLeave()
```

---

## Constant Naming

Use UPPER_CASE

Example

```javascript
JWT_SECRET

MAX_FILE_SIZE

DEFAULT_PAGE_SIZE
```

---

## Database Naming

Tables

```
employees

departments

attendance

leave_requests
```

Columns

```
employee_code

joining_date

created_at

updated_at

created_by

updated_by
```

---

# 16. Git Branching Strategy

Main Branches

```
main

develop
```

Feature Branches

```
feature/authentication

feature/employee-module

feature/attendance-module

feature/payroll-module
```

Bug Fix Branches

```
bugfix/login

bugfix/payroll

bugfix/dashboard
```

Release Branches

```
release/v1.0
```

---

## Git Commit Standards

Good Examples

```
Added Employee Module

Implemented JWT Authentication

Created Attendance APIs

Fixed Login Validation

Added Employee Exit Module
```

Avoid

```
update

changes

done

test
```

---

# 17. Authentication Flow

```
User

↓

Login API

↓

Validate Email

↓

Validate Password

↓

Generate JWT Token

↓

Return Token

↓

Frontend Stores Token

↓

Every Request

↓

Authorization Header

↓

JWT Middleware

↓

Protected APIs
```

Authorization Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Password Security

Passwords should always be

- Hashed using bcrypt
- Never stored in plain text
- Never returned in API Response

---

# 18. Authorization Flow

Roles

```
Admin

HR

Employee
```

Example Permissions

| Module | Admin | HR | Employee |
|---------|:-----:|:--:|:--------:|
| Dashboard | ✅ | ✅ | ✅ |
| Employees | ✅ | ✅ | Read Only |
| Departments | ✅ | Read | ❌ |
| Attendance | ✅ | ✅ | Self Only |
| Leave | ✅ | ✅ | Self Only |
| Payroll | ✅ | HR Only | Self Only |
| Employee Exit | ✅ | ✅ | Self Only |

---

# 19. Standard API Response Format

## Success Response

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {},
  "statusCode": 201
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [],
  "statusCode": 400
}
```

---

## Pagination Response

```json
{
  "success": true,
  "message": "Employees fetched successfully",
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

# 20. Logging Standards

Log the following events

- User Login
- User Logout
- Employee Creation
- Employee Update
- Employee Delete
- Leave Approval
- Payroll Generation
- API Errors
- Database Errors
- Authentication Failure

Log Levels

```
INFO

WARN

ERROR

DEBUG
```

---

# 21. Security Best Practices

- Enable Helmet Middleware.
- Enable CORS.
- Validate all requests.
- Sanitize user input.
- Prevent SQL Injection.
- Prevent XSS attacks.
- Use JWT Expiration.
- Encrypt passwords using bcrypt.
- Store secrets in .env.
- Never expose internal server errors.
- Limit file upload size.
- Allow only supported file types.
- Enable Rate Limiting for login APIs.

---

# 22. Development Guidelines

Development Order

1. Authentication
2. Roles
3. Users
4. Departments
5. Designations
6. Employees
7. Attendance
8. Leave
9. Payroll
10. Documents
11. Onboarding
12. Employee Exit
13. Dashboard
14. Reports
15. Settings

Complete one module before starting the next.

---

# 23. Acceptance Criteria

The project will be considered complete when:

- All APIs are working.
- JWT Authentication is implemented.
- Role-Based Authorization is implemented.
- Database relationships are working.
- CRUD operations are completed.
- Validations are implemented.
- Error handling is centralized.
- Swagger documentation is available.
- Docker containers run successfully.
- Frontend integrates successfully with backend APIs.

---

# 24. Codex Development Instructions

Develop the project module-by-module.

Rules

- Follow MVC Architecture.
- Use Controller → Service → Repository → Model flow.
- Use Sequelize ORM.
- Use PostgreSQL.
- Use async/await throughout the project.
- Use centralized error handling.
- Use response helper functions.
- Write reusable code.
- Follow REST API standards.
- Use audit columns (`created_by`, `updated_by`, `created_at`, `updated_at`) in all master tables.
- Use soft delete (`deleted_at`) where applicable.
- Generate clean, production-style code with proper folder structure.

---

# Part-2 Preview

The next document is **Part-2 – Database Design & Schema**, which includes:

- Complete Database Design
- Table Structures
- Relationships
- Constraints
- Indexes
- Audit Columns
- Business Rules
- Sequelize Associations
- Migration Strategy
- Seed Data