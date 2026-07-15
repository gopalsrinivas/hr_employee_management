# HR Employee Management System

# Part-6 – DevOps and Deployment

---

# 1. Overview

This phase adds a practical DevOps layer to the existing HR Employee Management System.

The objective is to automate code validation, improve Docker images, add dependency and security scanning, prepare Kubernetes deployment files, and document deployment and rollback procedures.

Part 6 should not modify the existing application business logic, database schema, API contracts, or frontend design.

---

# 2. DevOps Objectives

The main objectives are:

* Automate linting, testing, and build validation.
* Validate every push and pull request.
* Build production-ready Docker images.
* Reduce Docker image size.
* Detect dependency and security vulnerabilities.
* Automate dependency update pull requests.
* Prepare Kubernetes deployment manifests.
* Maintain health checks and startup dependencies.
* Improve environment variable management.
* Document deployment, verification, and rollback steps.
* Keep the solution suitable for an interview demonstration.

---

# 3. DevOps Technology Stack

| Tool             | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| Git              | Source control                                   |
| GitHub           | Remote repository                                |
| GitHub Actions   | CI/CD automation                                 |
| Docker           | Application containerization                     |
| Docker Compose   | Local multi-container orchestration              |
| Dependabot       | Dependency update automation                     |
| CodeQL           | Static code security analysis                    |
| Trivy            | Filesystem and container image security scanning |
| Kubernetes       | Container orchestration                          |
| kubectl          | Kubernetes deployment and verification           |
| Nginx Ingress    | External routing example                         |
| PostgreSQL       | Database                                         |
| Winston          | Application logging                              |
| Health Endpoints | Service health verification                      |

---

# 4. DevOps Scope

Part 6 includes:

* GitHub Actions CI workflow
* Dockerfile optimization
* Docker ignore files
* Docker Compose validation
* Dependabot configuration
* CodeQL scanning
* Trivy scanning
* Kubernetes manifests
* Health checks
* Readiness and liveness probes
* Environment configuration
* Deployment verification
* Rollback commands
* Documentation updates
* Final DevOps checklist

Part 6 does not include:

* Application business logic changes
* Database schema redesign
* Frontend redesign
* Cloud infrastructure provisioning
* Production secrets
* Enterprise-grade managed monitoring
* Production database high availability

---

# 5. GitHub Actions CI

Create the following workflow:

```text
.github/workflows/ci.yml
```

The CI workflow should run on:

```text
push to main
pull_request to main
```

The workflow should contain independent backend and frontend validation jobs.

---

## Backend CI Steps

The backend CI job should:

1. Checkout the repository.
2. Configure the required Node.js version.
3. Enable npm dependency caching.
4. Run `npm ci`.
5. Run backend lint.
6. Start or configure PostgreSQL for tests where required.
7. Run migrations where required.
8. Run backend tests.
9. Run a production dependency audit.
10. Fail when any mandatory check fails.

Recommended commands:

```bash
cd backend
npm ci
npm run lint
npm test
npm audit --omit=dev
```

---

## Frontend CI Steps

The frontend CI job should:

1. Checkout the repository.
2. Configure the required Node.js version.
3. Enable npm dependency caching.
4. Run `npm ci`.
5. Run frontend lint.
6. Run the production build.
7. Run a production dependency audit.
8. Fail when lint or build fails.

Recommended commands:

```bash
cd frontend
npm ci
npm run lint
npm run build
npm audit --omit=dev
```

---

## Docker Validation Job

The Docker validation job should:

* Validate `docker-compose.yml`.
* Build backend and frontend images.
* Avoid pushing images during the normal CI workflow.
* Fail when image build or Compose validation fails.

Recommended commands:

```bash
docker compose config
docker build -t hrms-backend-ci ./backend
docker build -t hrms-frontend-ci ./frontend
```

---

## CI Workflow Requirements

* Use the minimum required GitHub permissions.
* Do not print secrets.
* Do not use real credentials.
* Use repository secrets only when absolutely required.
* Use clear job names.
* Use timeouts for long-running jobs.
* Cancel outdated runs when newer commits are pushed.
* Preserve build logs for troubleshooting.

---

# 6. GitHub Actions Workflow Status

Add a workflow status badge to the root README.

Example:

```md
![CI](https://github.com/<owner>/<repository>/actions/workflows/ci.yml/badge.svg)
```

Replace the placeholder with the actual GitHub repository path.

---

# 7. Docker Optimization

The project already contains Docker support.

Part 6 should optimize the existing Dockerfiles without breaking local execution.

---

## Backend Docker Optimization

The backend Dockerfile should:

* Use a stable Node.js LTS base image.
* Use a multi-stage build where useful.
* Install dependencies using `npm ci`.
* Install only production dependencies in the final stage.
* Set `NODE_ENV=production`.
* Copy only required runtime files.
* Run using a non-root user where practical.
* Expose the backend port.
* Preserve the upload directory.
* Use the existing production start command.
* Avoid copying logs, tests, documentation, and local configuration.

Recommended stages:

```text
dependencies
runtime
```

---

## Frontend Docker Optimization

The frontend Dockerfile should use a multi-stage build.

Recommended stages:

```text
dependencies
builder
runner
```

The frontend should:

* Use `npm ci`.
* Run `npm run build`.
* Use Next.js standalone output when compatible.
* Copy only standalone runtime files.
* Copy static assets.
* Copy the public directory.
* Use `NODE_ENV=production`.
* Run as a non-root user where practical.
* Avoid copying the complete source tree into the final image.
* Reduce the final image size.

Recommended Next.js configuration:

```javascript
output: "standalone"
```

This should only be added if compatible with the current application.

---

# 8. Docker Ignore Files

Create:

```text
backend/.dockerignore
frontend/.dockerignore
```

Recommended excluded content:

```text
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
logs
tests
coverage
docs
README.md
.next
.next/cache
Dockerfile*
docker-compose*
```

Frontend exclusions should not remove source files required for the build.

Backend exclusions should not remove migrations, seeders, or runtime upload directory creation logic when required.

---

# 9. Docker Compose

The root `docker-compose.yml` should contain:

* PostgreSQL service
* Backend service
* Frontend service
* Persistent PostgreSQL volume
* Shared application network
* Health checks
* Environment variable mapping
* Startup dependency conditions

Expected startup order:

```text
PostgreSQL healthy
        ↓
Backend starts
        ↓
Backend healthy
        ↓
Frontend starts
```

---

## PostgreSQL Health Check

Example:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
  interval: 10s
  timeout: 5s
  retries: 5
```

---

## Backend Health Check

The backend should use the existing health API:

```text
GET /api/v1/health
```

Example:

```yaml
healthcheck:
  test:
    [
      "CMD",
      "node",
      "-e",
      "fetch('http://localhost:5000/api/v1/health').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"
    ]
  interval: 15s
  timeout: 5s
  retries: 5
```

---

## Frontend Health Check

Use a lightweight HTTP request to:

```text
http://localhost:3000
```

The health check should fail when the application is not ready.

---

# 10. Docker Volumes

Use a named volume for PostgreSQL:

```text
postgres_data
```

Employee uploads may also use a named or bind-mounted volume if persistence is required.

Do not store PostgreSQL data only inside the container filesystem.

---

# 11. Docker Image Naming

Recommended local image names:

```text
hr_employee_management-backend:latest
hr_employee_management-frontend:latest
```

Optional versioned image tags:

```text
hr_employee_management-backend:v1.0.0
hr_employee_management-frontend:v1.0.0
```

---

# 12. Docker Verification Commands

```cmd
docker version
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

Run migrations:

```cmd
docker compose exec backend npm run db:migrate
```

Run seeders:

```cmd
docker compose exec backend npm run db:seed
```

Stop containers:

```cmd
docker compose down
```

Stop and remove volumes only when intentional:

```cmd
docker compose down -v
```

---

# 13. Dependabot

Create:

```text
.github/dependabot.yml
```

Configure weekly checks for:

* Backend npm dependencies
* Frontend npm dependencies
* GitHub Actions
* Backend Docker image
* Frontend Docker image

Recommended schedule:

```text
Weekly
```

Recommended behavior:

* Group minor and patch npm updates where practical.
* Limit the number of open pull requests.
* Add dependency labels.
* Do not automatically merge breaking major updates.

---

# 14. CodeQL Security Scanning

Create:

```text
.github/workflows/codeql.yml
```

CodeQL should:

* Run for JavaScript and TypeScript.
* Trigger on pull requests.
* Trigger on pushes to the main branch.
* Run on a weekly schedule.
* Use minimum required security permissions.
* Upload findings to GitHub code scanning.

CodeQL should not modify application code automatically.

---

# 15. Trivy Security Scanning

Create:

```text
.github/workflows/trivy.yml
```

Trivy should scan:

* Repository filesystem
* Backend Docker image
* Frontend Docker image

Recommended scan categories:

```text
Vulnerabilities
Secrets
Misconfigurations
```

The workflow should:

* Avoid printing actual secrets.
* Fail only according to a documented severity policy.
* Upload results where practical.
* Use reasonable timeouts.

For an interview project, the default policy may fail on:

```text
CRITICAL
HIGH
```

The policy can be adjusted if unavoidable upstream issues exist, but should be documented.

---

# 16. npm Audit

The CI workflow should run:

```bash
npm audit --omit=dev
```

Run separately for backend and frontend.

Do not use `npm audit fix --force` automatically in CI.

Major dependency upgrades must be reviewed before merging.

---

# 17. Kubernetes Overview

Create:

```text
k8s/
```

Kubernetes support is intended for demonstration and interview purposes.

The manifests should be simple, readable, and deployable to a local cluster such as:

* Docker Desktop Kubernetes
* Minikube
* Kind

---

# 18. Kubernetes Files

Recommended structure:

```text
k8s/
├── namespace.yaml
├── configmap.yaml
├── secret-example.yaml
├── postgres-pvc.yaml
├── postgres-deployment.yaml
├── postgres-service.yaml
├── backend-deployment.yaml
├── backend-service.yaml
├── frontend-deployment.yaml
├── frontend-service.yaml
├── ingress.yaml
└── README.md
```

---

# 19. Kubernetes Namespace

Use a dedicated namespace:

```text
hrms
```

All HRMS Kubernetes resources should be deployed inside this namespace.

---

# 20. Kubernetes ConfigMap

The ConfigMap should contain non-sensitive configuration such as:

* Node environment
* Backend port
* Frontend API URL
* Database host
* Database port
* Database name
* CORS origin
* Log level

Do not store:

* Database passwords
* JWT secrets
* Production credentials

inside the ConfigMap.

---

# 21. Kubernetes Secret Example

Create:

```text
k8s/secret-example.yaml
```

Use placeholders only.

Example fields:

```text
DB_USER
DB_PASSWORD
JWT_SECRET
```

Do not commit real secrets.

Document that real deployments should create secrets using:

```cmd
kubectl create secret generic hrms-secrets ...
```

---

# 22. PostgreSQL Kubernetes Deployment

For demo purposes, PostgreSQL may use a Deployment or StatefulSet.

It should include:

* One replica
* PersistentVolumeClaim
* Environment variables from Secret and ConfigMap
* Readiness probe
* Liveness probe
* Resource requests
* Resource limits
* ClusterIP service

This is not a production high-availability PostgreSQL configuration.

---

# 23. Backend Kubernetes Deployment

The backend Deployment should include:

* Container image
* One or more replicas
* Port 5000
* ConfigMap values
* Secret values
* Readiness probe using `/api/v1/health`
* Liveness probe using `/api/v1/health`
* Resource requests
* Resource limits
* Rolling update strategy

Recommended initial replicas:

```text
2
```

The backend Service should use:

```text
ClusterIP
```

---

# 24. Frontend Kubernetes Deployment

The frontend Deployment should include:

* Container image
* Port 3000
* Backend API URL configuration
* Readiness probe
* Liveness probe
* Resource requests
* Resource limits
* Rolling update strategy

The frontend Service should use:

```text
ClusterIP
```

---

# 25. Kubernetes Ingress

Create an example Ingress.

Recommended routes:

```text
/     → frontend service
/api  → backend service
```

The exact path strategy must match the application's current API URL configuration.

Use placeholder hostname:

```text
hrms.local
```

Document the local hosts file mapping where required.

---

# 26. Kubernetes Resource Requests and Limits

Add practical starter values.

Example backend:

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

Example frontend:

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

Example PostgreSQL:

```yaml
resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 1Gi
```

These values are starting points only.

---

# 27. Kubernetes Validation Commands

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

---

# 28. Kubernetes Rollout Commands

Check rollout status:

```cmd
kubectl rollout status deployment/hrms-backend -n hrms
kubectl rollout status deployment/hrms-frontend -n hrms
```

View rollout history:

```cmd
kubectl rollout history deployment/hrms-backend -n hrms
kubectl rollout history deployment/hrms-frontend -n hrms
```

Rollback:

```cmd
kubectl rollout undo deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-frontend -n hrms
```

Restart deployment:

```cmd
kubectl rollout restart deployment/hrms-backend -n hrms
kubectl rollout restart deployment/hrms-frontend -n hrms
```

---

# 29. Environment Management

Environment-specific files should contain placeholders only.

Required example files:

```text
.env.example
backend/.env.example
frontend/.env.example
```

Real local files must remain ignored:

```text
.env
backend/.env
frontend/.env.local
```

Never commit:

* Real database passwords
* Real JWT secrets
* Cloud credentials
* Private keys
* Access tokens

---

# 30. Secret Management

Local development may use `.env` files.

GitHub Actions should use GitHub Secrets when required.

Kubernetes should use Kubernetes Secrets.

Production environments should use a dedicated secrets manager when available.

---

# 31. Health Checks

The project should maintain:

```text
GET /api/v1/health
```

The health response should confirm:

* Application status
* Database connectivity where appropriate
* Timestamp
* Environment

Do not expose sensitive configuration.

---

# 32. Logging

Existing Winston logging should remain unchanged unless a minimal DevOps-related improvement is required.

Container logs should be written to standard output where practical.

Local file logs may remain available for development.

Do not log:

* Passwords
* JWT tokens
* Secret values
* Full sensitive request payloads

---

# 33. Monitoring Basics

Part 6 includes only basic monitoring readiness.

Minimum monitoring features:

* Health endpoint
* Container health checks
* Structured application logs
* Request IDs
* Docker logs
* Kubernetes probes
* GitHub Actions results
* Security scan reports

Prometheus, Grafana, and OpenTelemetry may be added in a future phase.

---

# 34. Deployment Verification

After deployment, verify:

* PostgreSQL is healthy.
* Backend is healthy.
* Frontend is available.
* Login works.
* Swagger is accessible.
* Database migrations are applied.
* Seeders are applied where intended.
* Employee CRUD works.
* Leave workflow works.
* File uploads persist correctly.
* Logs contain request IDs.
* No secrets appear in logs.

---

# 35. Local URLs

```text
Frontend: http://localhost:3000
Backend: http://localhost:5000
Swagger: http://localhost:5000/api-docs
Health: http://localhost:5000/api/v1/health
```

---

# 36. Docker Rollback Strategy

If a newly built image fails:

1. Stop the new containers.
2. Restore the previous image tag.
3. Update Docker Compose to use the stable tag.
4. Start containers again.
5. Verify health endpoints.
6. Review logs.

Example:

```cmd
docker tag hr_employee_management-backend:v1.0.0 hr_employee_management-backend:stable
docker tag hr_employee_management-frontend:v1.0.0 hr_employee_management-frontend:stable
docker compose up -d
```

---

# 37. Git Rollback Strategy

View recent commits:

```cmd
git log --oneline -10
```

Create a safe revert commit:

```cmd
git revert <commit-id>
```

Avoid force-pushing to the main branch.

---

# 38. Database Rollback

Sequelize migration rollback:

```cmd
cd backend
npm run db:migrate:undo
```

Rollback all migrations only in a controlled non-production environment:

```cmd
npm run db:migrate:undo:all
```

Database backups should be created before destructive migration rollback.

---

# 39. Deployment Checklist

Before deployment:

* Backend lint passed.
* Backend tests passed.
* Frontend lint passed.
* Frontend production build passed.
* Docker Compose config is valid.
* Docker images build successfully.
* Environment variables are configured.
* No secrets are committed.
* Database backup is available where required.
* Migrations are reviewed.
* Swagger routes match Express routes.
* Health checks are configured.

After deployment:

* All containers or pods are healthy.
* Login works.
* Dashboard loads.
* Employee CRUD works.
* Leave workflow works.
* File upload works.
* Logs are available.
* No critical security scan failures remain.
* Rollback method is documented.

---

# 40. DevOps Acceptance Criteria

Part 6 is complete when:

* GitHub Actions CI exists.
* Backend lint and tests run in CI.
* Frontend lint and build run in CI.
* Docker Compose validation runs in CI.
* Backend and frontend Docker images build successfully.
* Docker image sizes are improved where possible.
* Docker ignore files exist.
* Dependabot is configured.
* CodeQL is configured.
* Trivy is configured.
* Kubernetes manifests exist.
* Kubernetes manifests pass dry-run validation where tools are available.
* Health checks and probes are configured.
* README contains DevOps instructions.
* No real secrets are committed.
* Existing application behavior remains unchanged.

---

# 41. DevOps Interview Explanation

The project can be explained as follows:

```text
Developers push code to GitHub.

GitHub Actions runs backend lint, tests, frontend lint, frontend build, dependency audit, Docker validation, and security scans.

Docker packages the backend, frontend, and PostgreSQL services.

Docker Compose runs the application locally.

Kubernetes manifests demonstrate scalable container deployment with health probes, resource limits, configuration, secrets, persistent storage, services, and ingress.

Dependabot automatically proposes dependency updates.

CodeQL and Trivy identify code and container security risks.
```

---

# 42. Future DevOps Enhancements

Possible future additions:

* Container registry publishing
* Automated deployment to AWS or Azure
* Helm charts
* Terraform
* Prometheus
* Grafana
* OpenTelemetry
* Centralized log aggregation
* Blue-green deployment
* Canary deployment
* Managed PostgreSQL
* Backup automation
* GitHub environment approvals
* Release workflows

---

# Part-6 Completion Checklist

* [ ] GitHub Actions CI workflow
* [ ] Backend validation job
* [ ] Frontend validation job
* [ ] Docker build validation
* [ ] Multi-stage backend Dockerfile
* [ ] Multi-stage frontend Dockerfile
* [ ] Backend `.dockerignore`
* [ ] Frontend `.dockerignore`
* [ ] Dependabot
* [ ] CodeQL
* [ ] Trivy
* [ ] Kubernetes namespace
* [ ] Kubernetes ConfigMap
* [ ] Kubernetes Secret example
* [ ] PostgreSQL persistent storage
* [ ] Backend Deployment and Service
* [ ] Frontend Deployment and Service
* [ ] Ingress
* [ ] Readiness probes
* [ ] Liveness probes
* [ ] Resource requests and limits
* [ ] README DevOps documentation
* [ ] Deployment verification
* [ ] Rollback instructions
* [ ] No committed secrets
