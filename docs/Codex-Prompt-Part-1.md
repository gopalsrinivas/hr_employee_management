# Codex Prompt - Part 1

# HR Employee Management System

## Objective

You are a Senior Full Stack Software Engineer.

Generate only **Part 1** of the HR Employee Management System.

Do NOT generate any HR modules in this phase.

Focus only on project setup and authentication.

---

# Technology Stack

Backend

- Node.js (Latest LTS)
- Express.js

Database

- PostgreSQL

ORM

- Sequelize ORM

Frontend

- Next.js
- Tailwind CSS

Authentication

- JWT
- bcrypt

Validation

- express-validator

Logging

- Winston

Documentation

- Swagger

Container

- Docker

---

# Architecture

Follow MVC Architecture.

```
Client

↓

Routes

↓

Controllers

↓

Services

↓

Models

↓

PostgreSQL
```

Do NOT use Repository Pattern.

---

# Backend Folder Structure

```
backend/

src/

config/

controllers/

services/

models/

routes/

middlewares/

validations/

helpers/

utils/

constants/

swagger/

uploads/

logs/

database/

migrations/

seeders/

app.js

server.js
```

---

# Frontend Folder Structure

```
frontend/

src/

app/

components/

pages/

layouts/

services/

hooks/

contexts/

utils/

assets/

styles/
```

---

# Database

Configure PostgreSQL.

Configure Sequelize.

Do not create HR tables yet.

Only create

```
roles

users
```

---

# Authentication

Implement

- Login
- Logout
- JWT Authentication
- Password Hashing
- Role Based Authorization Middleware

---

# Environment Variables

Create

```
.env

.env.example
```

---

# Validation

Implement

- Login Validation
- Email Validation
- Password Validation

---

# Logging

Configure Winston.

Create

```
application.log

error.log
```

---

# Swagger

Configure Swagger.

Document

```
Login API

Logout API
```

---

# Security

Enable

- Helmet
- CORS
- JWT Middleware

---

# Coding Standards

Use

- async/await
- MVC
- REST APIs
- Centralized Error Handling
- Standard Response Format
- Validation Middleware

---

# Deliverables

Generate

- Backend Project
- Frontend Project
- Authentication Module
- JWT
- Swagger
- Winston
- Docker
- PostgreSQL Configuration
- Sequelize Configuration

Do NOT generate

- Employees
- Departments
- Attendance
- Leave
- Payroll
- Documents
- Onboarding
- Employee Exit

Generate production-ready code with proper comments and best practices.