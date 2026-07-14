# HR Employee Management System

A full-stack interview project for managing core HR operations with an Express.js API, PostgreSQL database, Sequelize ORM, and a Next.js dashboard.

## Interview Scope

The project covers setup, database design, backend APIs, frontend integration, and final production-readiness checks. It intentionally stays focused on practical HR workflows instead of adding broad enterprise features outside the assignment.

## Features

- JWT login/logout and protected routes
- Role-based Admin, HR, and Employee access
- Dashboard backed by live API data
- Roles, users, departments, designations, and employees
- Automatic employee code generation
- Attendance check-in and check-out
- Leave application, approval, and rejection
- Payroll generation with net salary calculation
- Employee document upload, preview, download, and soft delete
- Onboarding checklist workflow
- Employee exit approvals and completion
- Reports for summary, employees, attendance, leaves, and payroll
- Search, filters, sorting, pagination, clear filters, loading states, and field-wise API validation errors
- Swagger/OpenAPI documentation
- Docker Compose for backend, frontend, and PostgreSQL

## Technology Stack

- Backend: Node.js, Express.js, Sequelize, PostgreSQL
- Frontend: Next.js App Router, React, Tailwind CSS, Axios, React Hook Form
- Auth: JWT, bcrypt
- Logging: Winston
- API docs: Swagger UI
- Testing: Node test runner, Supertest
- Container: Docker and Docker Compose

## Architecture

```text
Frontend (Next.js)
  -> Axios API client
  -> Express routes under /api/v1
  -> Middleware
  -> Controller
  -> Service
  -> Sequelize model
  -> PostgreSQL
```

## Folder Structure

```text
backend/   Express API, Sequelize models, migrations, seeders, tests
frontend/  Next.js application, reusable UI, pages, API client
docs/      Project phase documentation
```

## Modules

Authentication, Dashboard, Roles, Users, Departments, Designations, Employees, Attendance, Leave Requests, Payroll, Employee Documents, Onboarding, Employee Exits, Reports, and Settings.

## Prerequisites

- Node.js 22+
- PostgreSQL 15+
- Docker Desktop, optional
- Windows CMD or PowerShell

## Environment Setup

Create local env files from examples:

```cmd
copy .env.example .env
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env.local
```

Update local passwords and `JWT_SECRET` before running outside a local demo.

## PostgreSQL Setup

```cmd
createdb -U postgres hr_employee_management
```

If you use a different user or port, update `backend\.env`.

## Dependency Installation

```cmd
cd backend
npm install
cd ..\frontend
npm install
```

## Migrations And Seeders

```cmd
cd backend
npm run db:migrate
npm run db:seed
```

## Run Locally

Backend:

```cmd
cd backend
npm run dev
```

Frontend:

```cmd
cd frontend
npm run dev
```

Open:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/api/v1/health`
- Swagger: `http://localhost:5000/api-docs`

## Default Local Login

```text
Email: admin@example.com
Password: Admin@12345
```

## API Prefix

All backend APIs use:

```text
/api/v1
```

Swagger uses `http://localhost:5000/api/v1` as the OpenAPI server and displays module-relative paths.

## Docker

```cmd
docker compose config
docker compose up --build
```

Run migrations and seeders inside the backend container after PostgreSQL is healthy:

```cmd
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed
```

## Testing

Backend:

```cmd
cd backend
npm run lint
npm test
```

Frontend:

```cmd
cd frontend
npm run lint
npm run build
```

## Postman

Import `postman_collection.json`. Set collection variables:

- `baseUrl`: `http://localhost:5000/api/v1`
- `token`: paste the `accessToken` returned by Login

## Screens Overview

- Login: seeded admin credentials and JWT session
- Dashboard: live HR, attendance, leave, payroll, and exit summaries
- Module pages: reusable tables, filters, forms, actions, and pagination
- Reports: run backend reports and export JSON
- Settings: profile and API health tools

## Troubleshooting

- Login fails: confirm seeders ran and the backend uses the same database in `backend\.env`.
- Frontend cannot load data: confirm `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1`.
- Swagger Try it out uses a wrong URL: confirm Swagger server is `http://localhost:5000/api/v1`.
- Docker backend cannot connect to DB: run `docker compose ps` and confirm PostgreSQL health is `healthy`.
- Upload fails: confirm files are PDF, JPG, JPEG, or PNG and under the configured `MAX_FILE_SIZE`.

## Production Checklist

- Replace all example passwords and `JWT_SECRET`
- Use HTTPS and production CORS origins
- Run migrations before serving traffic
- Configure persistent PostgreSQL storage and backups
- Review logs for sensitive data
- Keep `.env` files out of Git
- Build frontend with the correct public API URL
- Keep Swagger enabled only where appropriate for the deployment
