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

## DevOps Overview

![CI](https://github.com/gopalsrinivas/hr_employee_management/actions/workflows/ci.yml/badge.svg)

Part 6 adds an interview-ready DevOps layer around the working application: GitHub Actions validation, Docker image optimization, dependency automation, security scanning, Kubernetes demo manifests, health checks, deployment commands, and rollback notes.

## GitHub Actions

The CI workflow is defined in `.github/workflows/ci.yml`.

Backend validation:

```cmd
cd backend
npm ci
npm run lint
npm run db:migrate
npm run db:seed
npm test
npm audit --omit=dev
```

Frontend validation:

```cmd
cd frontend
npm ci
npm run lint
npm run build
npm audit --omit=dev
```

Docker validation:

```cmd
docker compose config
docker build -t hrms-backend-ci backend
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1 -t hrms-frontend-ci frontend
```

The workflow runs on pushes and pull requests to `main`, uses npm caching, cancels outdated runs, and does not print secrets.

## Docker Image Optimization

The backend image uses a multi-stage production build, installs production dependencies only, keeps migrations and seeders available for operational commands, preserves `src/uploads`, and runs as the non-root `node` user.

The frontend image uses a multi-stage Next.js standalone build, copies only the standalone runtime and static build output, and runs as the non-root `node` user. Because `NEXT_PUBLIC_API_BASE_URL` is a public browser variable, pass the correct value at image build time.

```cmd
docker build -t hr_employee_management-backend:latest backend
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1 -t hr_employee_management-frontend:latest frontend
docker images hr_employee_management-backend:latest hr_employee_management-frontend:latest
```

## Docker Compose Deployment

Docker Compose includes PostgreSQL, backend, frontend, a named PostgreSQL volume, a shared network, and health checks. Startup order is PostgreSQL healthy, then backend healthy, then frontend.

```cmd
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed
docker compose down
```

Do not run `docker compose down -v` unless you intentionally want to delete the local PostgreSQL volume.

## Health Checks And Monitoring Basics

- Backend health endpoint: `GET /api/v1/health`
- Docker backend health check: `http://localhost:5000/api/v1/health`
- Docker frontend health check: `http://localhost:3000`
- Kubernetes readiness and liveness probes are included for PostgreSQL, backend, and frontend
- Winston structured logs and request IDs remain enabled
- GitHub Actions, CodeQL, and Trivy provide CI and security feedback

Prometheus, Grafana, OpenTelemetry, Helm, and Terraform are future enhancements, not part of Part 6.

## Dependabot

`.github/dependabot.yml` checks weekly for:

- Backend npm dependency updates
- Frontend npm dependency updates
- GitHub Actions updates
- Backend Docker base image updates
- Frontend Docker base image updates

Minor and patch npm updates are grouped where practical. Major updates remain reviewable and are not auto-merged.

## CodeQL

`.github/workflows/codeql.yml` analyzes JavaScript and TypeScript on pushes, pull requests, and a weekly schedule. Findings appear in GitHub code scanning when the repository is hosted on GitHub with code scanning enabled.

## Trivy

`.github/workflows/trivy.yml` scans:

- Repository filesystem
- Backend Docker image
- Frontend Docker image

It checks vulnerabilities, secrets, and misconfigurations, fails on HIGH and CRITICAL findings, and uploads scan reports as workflow artifacts. The workflow writes reports to files instead of printing detected secret values directly to logs.

## Kubernetes Architecture

The `k8s/` directory contains demo manifests for namespace `hrms`:

- ConfigMap with non-sensitive values
- Secret example with placeholders only
- PostgreSQL Deployment, PVC, and ClusterIP Service
- Backend Deployment and ClusterIP Service
- Frontend Deployment and ClusterIP Service
- Ingress for `hrms.local`

The PostgreSQL manifest is a single-replica demo setup, not production high availability.

Before applying manifests, replace placeholder images and create real Kubernetes secrets without committing them.

```cmd
kubectl apply --dry-run=client -f k8s\
kubectl apply -f k8s\
kubectl get all -n hrms
kubectl get pods -n hrms
kubectl get services -n hrms
kubectl get ingress -n hrms
kubectl describe pod <pod-name> -n hrms
kubectl logs <pod-name> -n hrms
```

For local ingress testing, add this hosts-file entry:

```text
127.0.0.1 hrms.local
```

## Kubernetes Rollouts And Rollback

```cmd
kubectl rollout status deployment/hrms-backend -n hrms
kubectl rollout status deployment/hrms-frontend -n hrms
kubectl rollout history deployment/hrms-backend -n hrms
kubectl rollout history deployment/hrms-frontend -n hrms
kubectl rollout undo deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-frontend -n hrms
```

Git rollback:

```cmd
git log --oneline -10
git revert <commit-id>
```

Docker rollback:

```cmd
docker tag hr_employee_management-backend:v1.0.0 hr_employee_management-backend:stable
docker tag hr_employee_management-frontend:v1.0.0 hr_employee_management-frontend:stable
docker compose up -d
```

Database migration rollback:

```cmd
cd backend
npm run db:migrate:undo
```

Back up the database before destructive rollback operations, especially migration rollback or volume removal.

## Environment And Secret Management

- Real `.env` files are ignored by Git.
- Example env files contain placeholders only.
- GitHub Actions use CI-only values and do not print secrets.
- Kubernetes `secret-example.yaml` contains placeholders only.
- Store production secrets in GitHub Secrets, Kubernetes Secrets, or a dedicated secret manager.
- Do not commit JWT secrets, database passwords, registry tokens, private keys, or cloud credentials.

The seeded admin login is a local development credential only and should not be used in production.

## Known DevOps Limitations

- Kubernetes manifests use placeholder image names and require a real registry image before deployment.
- The frontend public API URL is baked into the Next.js build, so build frontend images with the deployment-specific `NEXT_PUBLIC_API_BASE_URL`.
- PostgreSQL Kubernetes deployment is demo-oriented and not high availability.
- Remote GitHub Actions, CodeQL, Dependabot, and Trivy runs require pushing to GitHub.
- Docker image size comparison requires a running Docker daemon.

## Future DevOps Improvements

- Container registry publishing
- Release workflows and version tags
- Environment approvals
- Managed PostgreSQL
- Backup automation
- Helm charts
- Terraform
- Prometheus and Grafana
- OpenTelemetry tracing
- Blue-green or canary deployments
