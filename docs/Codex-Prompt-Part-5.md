# Codex Prompt - Part 5

# HR Employee Management System

## Objective

You are a Senior Software Architect and Full Stack Developer.

This is the FINAL implementation phase.

Complete the HR Employee Management System by integrating the Backend, Frontend, Database, Docker, Testing, Documentation, Deployment, and Production Readiness.

Do NOT redesign the architecture.

Continue using the project generated in Part-1, Part-2, Part-3 and Part-4.

---

# Technology Stack

Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

Frontend

- Next.js
- Tailwind CSS

Authentication

- JWT

Logging

- Winston

API Documentation

- Swagger

Container

- Docker

Testing

- Jest
- Supertest

---

# Final Scope

Implement only the remaining work.

Complete

- Integration
- Dashboard
- Reports
- Docker
- Testing
- Production Configuration
- README
- API Documentation
- Deployment Files

---

# Backend Integration

Verify

- Routes
- Controllers
- Services
- Models
- Authentication
- Authorization
- Middleware
- Logging
- Validation
- Swagger

Everything should work together.

---

# Frontend Integration

Connect every page with backend APIs.

Verify

- Login
- Dashboard
- Employees
- Attendance
- Leave
- Payroll
- Documents
- Onboarding
- Exit
- Reports

---

# Dashboard

Display

```
Total Employees

Present Employees

Absent Employees

Departments

Pending Leaves

Today's Birthdays

Employees Exiting

Payroll Processed
```

Generate

- Cards
- Charts
- Statistics

---

# Reports

Generate

Employee Report

Attendance Report

Leave Report

Payroll Report

Employee Exit Report

---

Export

```
PDF

Excel

CSV
```

---

# Search

Implement

```
Employee Name

Employee Code

Department

Designation

Attendance

Payroll

Leave
```

---

# Filters

Generate

```
Department

Designation

Joining Date

Attendance Date

Leave Status

Payroll Month

Payroll Year

Employee Status
```

---

# Pagination

Generate reusable pagination.

Every list page should support

```
10

25

50

100
```

records.

---

# Sorting

Generate reusable sorting.

Support

```
Ascending

Descending
```

---

# File Upload

Complete

```
Resume

Aadhaar

PAN

Photo

Certificates
```

Generate

```
Upload

Download

Delete

Preview
```

---

# Audit

Verify

```
created_by

created_at

updated_by

updated_at

deleted_by

deleted_at
```

are automatically maintained.

---

# Soft Delete

Never permanently delete records.

Implement

```
deleted_at

deleted_by
```

---

# Logging

Verify Winston logs.

Create

```
application.log

error.log

combined.log
```

---

# Swagger

Verify

Every API is documented.

Include

- Request
- Response
- JWT
- Validation
- Error Responses

---

# Docker

Generate

Dockerfile

docker-compose.yml

Support

```
Backend

Frontend

PostgreSQL
```

Containers.

---

# Environment Files

Generate

```
.env.example
```

Include all required variables.

---

# README

Generate professional README.

Include

- Installation
- Prerequisites
- Database Setup
- Running Backend
- Running Frontend
- Docker Setup
- API Documentation
- Folder Structure
- Deployment Steps

---

# Testing

Generate

Jest

Supertest

Test

```
Authentication

Employees

Attendance

Leave

Payroll
```

---

# Error Handling

Verify

```
400

401

403

404

409

422

500
```

---

# Security

Verify

- JWT
- bcrypt
- Helmet
- CORS
- Validation
- SQL Injection Protection
- XSS Protection

---

# Performance

Verify

- Pagination
- Indexes
- Lazy Loading
- Optimized Queries

---

# Production Checklist

Verify

✅ Backend Running

✅ Frontend Running

✅ PostgreSQL Connected

✅ Sequelize Migrations Executed

✅ Seeders Executed

✅ Authentication Working

✅ Authorization Working

✅ CRUD Working

✅ File Upload Working

✅ Swagger Working

✅ Logging Working

✅ Reports Working

✅ Dashboard Working

✅ Docker Working

✅ README Generated

---

# Coding Standards

Use

- MVC
- async/await
- REST APIs
- JWT
- Sequelize
- Tailwind CSS
- React Hooks
- Context API
- Centralized Error Handling
- Validation Middleware
- Audit Columns
- Soft Delete

---

# Final Deliverables

Generate

✅ Complete Backend

✅ Complete Frontend

✅ PostgreSQL Database

✅ Sequelize Models

✅ Migrations

✅ Seeders

✅ Controllers

✅ Services

✅ Routes

✅ Middleware

✅ JWT Authentication

✅ Role Based Authorization

✅ Validation

✅ Logging

✅ Swagger

✅ Docker

✅ Reports

✅ Dashboard

✅ README

✅ Postman Collection

✅ Jest Test Cases

Generate production-ready code with enterprise coding standards.

Do not leave any TODOs or placeholders.

The application should be runnable after installing dependencies, configuring environment variables, running migrations and seeders, and starting the backend and frontend.