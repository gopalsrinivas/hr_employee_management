# Codex Prompt - Part 2

# HR Employee Management System

## Objective

You are a Senior Full Stack Software Engineer.

Continue developing the HR Employee Management System.

Implement ONLY the Database Layer.

Do NOT implement frontend pages.

Do NOT implement business logic.

Focus only on database design and Sequelize implementation.

---

# Technology Stack

Backend

- Node.js
- Express.js

Database

- PostgreSQL

ORM

- Sequelize ORM

---

# Scope

Implement

- Sequelize Models
- Database Migrations
- Database Seeders
- Model Associations
- Indexes
- Constraints
- Soft Delete
- Audit Columns

Do NOT implement Controllers, Services or Routes.

---

# Database Tables

Create the following tables.

Master Tables

```
roles

users

departments

designations
```

Business Tables

```
employees

attendance

leave_requests

payroll

employee_documents

onboarding

employee_exit

app_logs
```

---

# Primary Keys

Every table must use

```
BIGSERIAL
```

Example

```
id BIGSERIAL PRIMARY KEY
```

---

# Foreign Keys

Implement proper foreign keys.

Examples

```
role_id

department_id

designation_id

employee_id

manager_id

created_by

updated_by

deleted_by
```

---

# Audit Columns

Every master table should contain

```
created_by

created_at

updated_by

updated_at

deleted_by

deleted_at
```

---

# Soft Delete

Implement Sequelize Paranoid mode.

```
deleted_at
```

Never permanently delete records.

---

# Naming Standards

Tables

```
Plural

snake_case
```

Columns

```
snake_case
```

Models

```
PascalCase
```

---

# Sequelize Models

Generate one model for every table.

Example

```
Employee.js

Department.js

Payroll.js
```

---

# Model Associations

Implement

```
Role

↓

Users

Department

↓

Employees

Department

↓

Designations

Employee

↓

Attendance

Employee

↓

Leave

Employee

↓

Payroll

Employee

↓

Documents

Employee

↓

Onboarding

Employee

↓

Exit
```

Use

```
belongsTo()

hasMany()

hasOne()
```

where applicable.

---

# Database Constraints

Unique

```
Employee Code

Username

Email

Department Name

Role Name
```

Check Constraints

```
Salary >= 0

Working Hours >= 0

Last Working Day >= Resignation Date
```

---

# Indexes

Generate indexes on

```
employee_code

email

department_id

designation_id

attendance_date

joining_date

resignation_date
```

Also generate composite indexes wherever useful.

---

# Seeder Data

Insert default data.

Roles

```
Admin

HR

Employee
```

Departments

```
HR

IT

Finance

Accounts

Admin
```

Designations

```
Software Engineer

Senior Software Engineer

Team Lead

HR Executive
```

Create one default Admin user.

---

# Migration Order

```
roles

users

departments

designations

employees

attendance

leave_requests

payroll

employee_documents

onboarding

employee_exit

app_logs
```

---

# Coding Standards

Use

- async/await
- Sequelize CLI
- Migration Files
- Seeders
- Associations
- Audit Columns
- Soft Delete
- Proper Validation

---

# Deliverables

Generate

- Sequelize Models
- Migration Files
- Seeder Files
- Associations
- Database Configuration
- Indexes
- Constraints
- Audit Columns

Do NOT generate

- Controllers
- Services
- Routes
- APIs
- Frontend

Generate production-ready Sequelize code with comments and best practices.