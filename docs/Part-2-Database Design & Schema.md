# HR Employee Management System

# Part-2 – Database Design & Schema

---

# 1. Database Overview

## Introduction

The HR Employee Management System uses PostgreSQL as the primary relational database.

The database is designed using normalization principles to minimize data redundancy, maintain referential integrity, and support future scalability.

The design follows enterprise database standards with proper relationships, constraints, indexes, audit columns, and soft delete support.

---

## Database Objectives

- Store employee information securely.
- Maintain data consistency.
- Avoid duplicate records.
- Improve query performance.
- Maintain audit history.
- Support future modules.
- Ensure data integrity.

---

# 2. Database Technology

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| ORM | Sequelize |
| Character Set | UTF-8 |
| Port | 5432 |
| Naming Convention | snake_case |
| Primary Key | BIGSERIAL |
| Foreign Key | BIGINT |
| Timestamp | TIMESTAMP |
| Soft Delete | deleted_at |

---

# 3. Database Naming Standards

## Database Name

```sql
hr_employee_management
```

---

## Table Naming

Use plural names.

Examples

```
employees

departments

designations

attendance

leave_requests

employee_documents
```

---

## Column Naming

Use snake_case.

Examples

```
employee_code

joining_date

department_id

created_at

updated_at

created_by

updated_by
```

---

## Primary Key Naming

Every table

```
id
```

---

## Foreign Key Naming

```
employee_id

department_id

designation_id

role_id

manager_id
```

---

# 4. Audit Columns Standard

Every master table should contain the following audit columns.

| Column | Type | Purpose |
|---------|------|----------|
| created_at | timestamp | Record creation date |
| created_by | bigint | User who created the record |
| updated_at | timestamp | Last updated date |
| updated_by | bigint | User who updated the record |
| deleted_at | timestamp | Soft delete timestamp |
| deleted_by | bigint | User who deleted the record |

---

## Why Audit Columns?

Audit columns help answer important business questions.

- Who created the record?
- When was it created?
- Who updated it?
- When was it updated?
- Who deleted it?
- When was it deleted?

Example

```
Employee Created

↓

created_by = 1

created_at = 2026-07-14 09:30:00

↓

Employee Updated

↓

updated_by = 3

updated_at = 2026-08-02 11:20:00
```

---

# 5. Soft Delete Strategy

Instead of permanently deleting records, the application performs a soft delete.

Example

Instead of

```
DELETE FROM employees
WHERE id = 10;
```

The application updates

```
deleted_at = CURRENT_TIMESTAMP

deleted_by = current_user
```

Advantages

- Recover deleted records.
- Maintain history.
- Prevent accidental data loss.
- Improve audit compliance.

---

# 6. Database Tables

This application contains the following tables.

| Table | Purpose |
|--------|----------|
| roles | User Roles |
| users | Login Credentials |
| departments | Departments |
| designations | Employee Designations |
| employees | Employee Master |
| attendance | Daily Attendance |
| leave_requests | Leave Management |
| payroll | Salary Details |
| employee_documents | Employee Documents |
| onboarding | Employee Joining Process |
| employee_exit | Employee Exit Process |
| app_logs | Application Logs |

---

# 7. Master Tables

Master tables store static or reference information.

Master Tables

- roles
- departments
- designations

These tables change very rarely.

---

# 8. Transaction Tables

Transaction tables store daily business data.

Examples

- attendance
- leave_requests
- payroll
- employee_documents
- onboarding
- employee_exit

These tables grow continuously during application usage.

---

# 9. Database Relationship Overview

```
roles
   │
   │1
   │
   │N
users
   │
   │1
   │
   │1
employees
   │
   ├──────── attendance
   │
   ├──────── leave_requests
   │
   ├──────── payroll
   │
   ├──────── employee_documents
   │
   ├──────── onboarding
   │
   └──────── employee_exit

departments
      │
      │1
      │
      │N
designations

departments
      │
      │1
      │
      │N
employees
```

---

# Part-2B Preview

Next section includes

- Complete Table Design
- Primary Keys
- Foreign Keys
- Constraints
- Default Values
- Audit Columns
- Sample Data
- Business Rules

---

# 10. Table Design

Each table is designed based on normalization principles and business requirements.

---

# 10.1 roles

Purpose

Stores application roles used for Role-Based Access Control (RBAC).

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | Role ID |
| role_name | VARCHAR(50) | Role Name |
| description | TEXT | Role Description |
| status | BOOLEAN | Active / Inactive |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Sample Roles

- Admin
- HR
- Employee

Business Rules

- Role Name must be unique.
- Default status is Active.
- Soft delete should be used.

---

# 10.2 users

Purpose

Stores application login credentials.

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | User ID |
| username | VARCHAR(100) | Username |
| email | VARCHAR(150) | Email |
| password | VARCHAR(255) | Encrypted Password |
| role_id | BIGINT (FK) | User Role |
| status | BOOLEAN | Active / Inactive |
| last_login | TIMESTAMP | Last Login |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Business Rules

- Username must be unique.
- Email must be unique.
- Password must be encrypted.
- One user can have only one role.

---

# 10.3 departments

Purpose

Stores all departments in the organization.

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | Department ID |
| department_name | VARCHAR(100) | Department Name |
| description | TEXT | Description |
| status | BOOLEAN | Active / Inactive |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Sample Departments

- HR
- IT
- Finance
- Admin
- Accounts

Business Rules

- Department Name must be unique.
- Department cannot be deleted if employees exist.

---

# 10.4 designations

Purpose

Stores employee designations.

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | Designation ID |
| department_id | BIGINT (FK) | Department |
| designation_name | VARCHAR(100) | Designation |
| description | TEXT | Description |
| status | BOOLEAN | Active / Inactive |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Examples

- Software Engineer
- Senior Software Engineer
- Team Lead
- HR Executive

Business Rules

- Designation belongs to one department.
- Duplicate designation names are not allowed within the same department.

---

# 10.5 employees

Purpose

Stores employee master information.

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | Employee ID |
| employee_code | VARCHAR(20) | Employee Code |
| first_name | VARCHAR(100) | First Name |
| last_name | VARCHAR(100) | Last Name |
| gender | VARCHAR(20) | Gender |
| dob | DATE | Date of Birth |
| email | VARCHAR(150) | Email |
| mobile | VARCHAR(20) | Mobile Number |
| joining_date | DATE | Joining Date |
| department_id | BIGINT (FK) | Department |
| designation_id | BIGINT (FK) | Designation |
| manager_id | BIGINT (FK) | Reporting Manager |
| salary | DECIMAL(12,2) | Salary |
| status | VARCHAR(20) | Active / Exited |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Business Rules

- Employee Code must be unique.
- Email must be unique.
- Salary cannot be negative.
- Department must exist.
- Designation must exist.
- Manager must be another employee.
- Employee status can be Active or Exited.

---

# 10.6 attendance

Purpose

Stores daily attendance.

| Column | Type | Description |
|----------|---------|-------------------------|
| id | BIGSERIAL (PK) | Attendance ID |
| employee_id | BIGINT (FK) | Employee |
| attendance_date | DATE | Attendance Date |
| check_in | TIME | Check In |
| check_out | TIME | Check Out |
| working_hours | DECIMAL(4,2) | Working Hours |
| status | VARCHAR(20) | Present / Absent / Half Day |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |

Business Rules

- One attendance record per employee per day.
- Check-out time must be greater than check-in.
- Working hours are calculated automatically.

---

# Part-2C Preview

Next section includes:

- leave_requests
- payroll
- employee_documents
- onboarding
- employee_exit
- app_logs
- Constraints
- Indexes
- Default Values
- Dummy Data
- Sequelize Associations
- Migration Order
- Business Rules

---

# 10.7 leave_requests

Purpose

Stores employee leave requests and approval details.

| Column | Type | Description |
|----------|----------------|----------------------------|
| id | BIGSERIAL (PK) | Leave Request ID |
| employee_id | BIGINT (FK) | Employee |
| leave_type | VARCHAR(50) | Casual, Sick, Earned, etc. |
| from_date | DATE | Leave Start Date |
| to_date | DATE | Leave End Date |
| total_days | INTEGER | Number of Leave Days |
| reason | TEXT | Leave Reason |
| applied_date | DATE | Applied Date |
| approved_by | BIGINT (FK) | Approved User |
| approved_date | TIMESTAMP | Approval Date |
| status | VARCHAR(20) | Pending / Approved / Rejected |
| remarks | TEXT | HR Remarks |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Business Rules

- Leave From Date cannot be greater than To Date.
- Total Days should be calculated automatically.
- Employee cannot approve their own leave.
- Leave status should be Pending by default.

---

# 10.8 payroll

Purpose

Stores monthly salary details of employees.

| Column | Type | Description |
|----------|----------------|--------------------------|
| id | BIGSERIAL (PK) | Payroll ID |
| employee_id | BIGINT (FK) | Employee |
| payroll_month | VARCHAR(20) | Month |
| payroll_year | INTEGER | Year |
| basic_salary | DECIMAL(12,2) | Basic Salary |
| hra | DECIMAL(12,2) | House Rent Allowance |
| da | DECIMAL(12,2) | Dearness Allowance |
| bonus | DECIMAL(12,2) | Bonus |
| incentives | DECIMAL(12,2) | Incentives |
| pf | DECIMAL(12,2) | Provident Fund |
| esi | DECIMAL(12,2) | Employee State Insurance |
| tax | DECIMAL(12,2) | Income Tax |
| deductions | DECIMAL(12,2) | Other Deductions |
| net_salary | DECIMAL(12,2) | Net Salary |
| salary_status | VARCHAR(20) | Pending / Paid |
| paid_date | DATE | Salary Paid Date |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |

Business Rules

- One payroll record per employee per month.
- Net Salary is calculated automatically.
- Salary cannot be negative.

---

# 10.9 employee_documents

Purpose

Stores employee uploaded documents.

| Column | Type | Description |
|----------|----------------|---------------------------|
| id | BIGSERIAL (PK) | Document ID |
| employee_id | BIGINT (FK) | Employee |
| document_type | VARCHAR(50) | Aadhaar, PAN, Resume |
| document_number | VARCHAR(100) | Document Number |
| file_name | VARCHAR(255) | Stored File Name |
| original_name | VARCHAR(255) | Original File Name |
| file_path | VARCHAR(500) | Storage Path |
| file_size | BIGINT | File Size |
| uploaded_by | BIGINT (FK) | Uploaded User |
| uploaded_at | TIMESTAMP | Upload Date |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |
| deleted_by | BIGINT (FK) | Deleted User |
| deleted_at | TIMESTAMP | Deleted Date |

Business Rules

- Only PDF, JPG, JPEG and PNG files are allowed.
- Maximum file size should be configurable.
- One employee can upload multiple documents.

---

# 10.10 onboarding

Purpose

Stores employee onboarding process.

| Column | Type | Description |
|----------|----------------|--------------------------|
| id | BIGSERIAL (PK) | Onboarding ID |
| employee_id | BIGINT (FK) | Employee |
| joining_date | DATE | Joining Date |
| documents_verified | BOOLEAN | Documents Verified |
| induction_completed | BOOLEAN | Induction Status |
| laptop_allocated | BOOLEAN | Laptop Allocation |
| email_created | BOOLEAN | Official Email |
| id_card_generated | BOOLEAN | Employee ID Card |
| welcome_kit_issued | BOOLEAN | Welcome Kit |
| onboarding_status | VARCHAR(20) | Pending / Completed |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |

Business Rules

- Onboarding starts after employee creation.
- Employee cannot login until onboarding is completed.

---

# 10.11 employee_exit

Purpose

Stores employee resignation and exit process.

| Column | Type | Description |
|----------|----------------|-----------------------------|
| id | BIGSERIAL (PK) | Exit ID |
| employee_id | BIGINT (FK) | Employee |
| resignation_date | DATE | Resignation Date |
| last_working_day | DATE | Last Working Day |
| reason | TEXT | Exit Reason |
| manager_approval | BOOLEAN | Manager Approval |
| hr_approval | BOOLEAN | HR Approval |
| asset_returned | BOOLEAN | Asset Returned |
| fnf_completed | BOOLEAN | Full & Final Settlement |
| experience_letter | BOOLEAN | Experience Letter |
| relieving_letter | BOOLEAN | Relieving Letter |
| exit_status | VARCHAR(20) | Pending / Completed |
| created_by | BIGINT (FK) | Created User |
| created_at | TIMESTAMP | Created Date |
| updated_by | BIGINT (FK) | Updated User |
| updated_at | TIMESTAMP | Updated Date |

Business Rules

- Last Working Day must be after Resignation Date.
- Exit cannot be completed until all assets are returned.
- F&F settlement should be completed before relieving letter generation.

---

# 10.12 app_logs

Purpose

Stores application and API logs.

| Column | Type | Description |
|----------|----------------|----------------------------|
| id | BIGSERIAL (PK) | Log ID |
| api | VARCHAR(255) | API Endpoint |
| method | VARCHAR(10) | GET / POST / PUT / DELETE |
| request_id | VARCHAR(100) | Request Identifier |
| user_id | BIGINT (FK) | Logged-in User |
| ip_address | VARCHAR(100) | Client IP |
| log_level | VARCHAR(20) | INFO / WARN / ERROR |
| message | TEXT | Log Message |
| created_at | TIMESTAMP | Log Time |

---

# 11. Database Constraints

The following constraints should be implemented.

## Unique Constraints

- Employee Code
- Username
- Email
- Department Name
- Role Name

---

## Foreign Key Constraints

- role_id
- department_id
- designation_id
- employee_id
- manager_id
- approved_by
- created_by
- updated_by
- deleted_by

---

## Check Constraints

- Salary >= 0
- Net Salary >= 0
- Last Working Day >= Resignation Date
- Check Out > Check In

---

# 12. Default Values

| Column | Default Value |
|---------|---------------|
| status | Active |
| created_at | CURRENT_TIMESTAMP |
| updated_at | CURRENT_TIMESTAMP |
| deleted_at | NULL |
| manager_approval | FALSE |
| hr_approval | FALSE |
| asset_returned | FALSE |
| induction_completed | FALSE |
| documents_verified | FALSE |

---

# Part-2D Preview

Next section includes

- Database Indexes
- Dummy Data
- ER Diagram
- Sequelize Associations
- Migration Order
- Seeder Order
- Database Best Practices
- Performance Optimization
- Backup Strategy
- Database Security Guidelines

---

# 13. Database Indexes

Indexes improve database query performance by reducing the time required to search records.

Indexes should be created on frequently searched columns.

---

## Primary Indexes

Every table should have a Primary Key Index.

Examples

```
roles.id

users.id

employees.id

departments.id

attendance.id
```

---

## Unique Indexes

Create Unique Indexes on the following columns.

| Table | Column |
|---------|----------------|
| users | username |
| users | email |
| employees | employee_code |
| employees | email |
| roles | role_name |
| departments | department_name |

---

## Normal Indexes

Create indexes on frequently searched columns.

| Table | Column |
|---------|----------------|
| employees | department_id |
| employees | designation_id |
| employees | manager_id |
| attendance | attendance_date |
| leave_requests | employee_id |
| payroll | payroll_month |
| payroll | payroll_year |
| employee_exit | resignation_date |
| onboarding | joining_date |

---

## Composite Indexes

Composite indexes improve filtering performance.

Examples

Attendance

```
(employee_id, attendance_date)
```

Payroll

```
(employee_id, payroll_month, payroll_year)
```

Leave Requests

```
(employee_id, status)
```

Employees

```
(department_id, designation_id)
```

---

# 14. Dummy Data

The application should include sample master data for development and testing.

---

## Roles

```
Admin

HR

Employee
```

---

## Departments

```
Human Resources

Information Technology

Finance

Accounts

Administration
```

---

## Designations

```
Software Engineer

Senior Software Engineer

Team Lead

Project Manager

HR Executive

HR Manager

Accountant
```

---

## Employees

```
EMP001

EMP002

EMP003

EMP004

EMP005
```

---

## Leave Types

```
Casual Leave

Sick Leave

Earned Leave

Loss Of Pay

Work From Home
```

---

# 15. Entity Relationship (ER) Diagram

```
                    roles
                      │
                      │ 1
                      │
                      │ N
                   users
                      │
                      │
                      │1
                      │
                      │1
                 employees
        ┌─────────┼────────────┬────────────┐
        │         │            │            │
attendance   leave_requests  payroll   employee_documents
                                            │
                                            │
                                   onboarding
                                            │
                                            │
                                   employee_exit

departments
      │
      │1
      │
      │N
designations

departments
      │
      │1
      │
      │N
employees
```

---

# 16. Sequelize Associations

Every relationship should be implemented using Sequelize Associations.

---

## Role → User

```
Role.hasMany(User)

User.belongsTo(Role)
```

---

## Department → Employee

```
Department.hasMany(Employee)

Employee.belongsTo(Department)
```

---

## Department → Designation

```
Department.hasMany(Designation)

Designation.belongsTo(Department)
```

---

## Designation → Employee

```
Designation.hasMany(Employee)

Employee.belongsTo(Designation)
```

---

## Employee → Attendance

```
Employee.hasMany(Attendance)

Attendance.belongsTo(Employee)
```

---

## Employee → Leave

```
Employee.hasMany(LeaveRequest)

LeaveRequest.belongsTo(Employee)
```

---

## Employee → Payroll

```
Employee.hasMany(Payroll)

Payroll.belongsTo(Employee)
```

---

## Employee → Documents

```
Employee.hasMany(EmployeeDocument)

EmployeeDocument.belongsTo(Employee)
```

---

## Employee → Onboarding

```
Employee.hasOne(Onboarding)

Onboarding.belongsTo(Employee)
```

---

## Employee → Exit

```
Employee.hasOne(EmployeeExit)

EmployeeExit.belongsTo(Employee)
```

---

# 17. Migration Order

Run database migrations in the following order.

```
1. roles

2. users

3. departments

4. designations

5. employees

6. attendance

7. leave_requests

8. payroll

9. employee_documents

10. onboarding

11. employee_exit

12. app_logs
```

Reason

Parent tables should always be created before child tables.

---

# 18. Seeder Order

Insert master data first.

```
1. Roles

2. Departments

3. Designations

4. Users

5. Employees

6. Attendance

7. Leave Requests

8. Payroll

9. Employee Documents
```

---

# 19. Database Best Practices

Follow the best practices below.

- Use BIGSERIAL for Primary Keys.
- Use Foreign Keys for relationships.
- Avoid duplicate data.
- Normalize tables up to 3NF.
- Use transactions for critical operations.
- Never store passwords in plain text.
- Always create indexes on frequently searched columns.
- Use soft delete wherever applicable.
- Maintain audit history.
- Keep table names plural.
- Keep column names in snake_case.

---

# 20. Performance Optimization

To improve database performance:

- Create indexes on searchable columns.
- Avoid SELECT * in production queries.
- Fetch only required columns.
- Use pagination for large datasets.
- Use LIMIT and OFFSET.
- Optimize JOIN queries.
- Use eager loading in Sequelize where appropriate.
- Analyze slow queries using EXPLAIN ANALYZE.

---

# 21. Database Backup Strategy

Recommended Backup Schedule

| Backup Type | Frequency |
|-------------|-----------|
| Full Backup | Weekly |
| Incremental Backup | Daily |
| Transaction Log Backup | Every Hour |

Best Practices

- Store backups in a secure location.
- Encrypt backup files.
- Periodically test restore procedures.
- Retain backups according to company policy.

---

# 22. Database Security Guidelines

The database should follow enterprise security standards.

Security Rules

- Use strong database passwords.
- Never expose database credentials in source code.
- Store credentials only in `.env`.
- Restrict database access using firewall rules.
- Enable SSL for production database connections.
- Grant minimum required privileges to database users.
- Monitor failed login attempts.
- Enable database audit logging.

---

# 23. Acceptance Criteria

The database design will be considered complete when:

- All tables are created successfully.
- Primary Keys are defined.
- Foreign Keys are implemented.
- Constraints are applied.
- Indexes are created.
- Audit columns are available.
- Soft delete is implemented.
- Relationships are configured.
- Migrations execute successfully.
- Seeders populate master data.
- Sequelize associations are working correctly.

---

# Part-3 Preview

The next document is **Part-3 – Backend Architecture**, which includes:

- MVC Architecture
- Folder Structure
- Routes
- Controllers
- Services
- Models
- Middlewares
- Validations
- Authentication
- Authorization
- Error Handling
- Logging
- Swagger
- Docker
- Coding Standards
- API Design