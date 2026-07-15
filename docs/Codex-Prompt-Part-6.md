# Codex Prompt – Part 6

# HR Employee Management System

## Objective

You are a Senior DevOps Engineer and Full Stack Software Engineer.

Enhance the existing HR Employee Management System with a practical, interview-ready DevOps and deployment layer.

Continue from the completed Part 1, Part 2, Part 3, Part 4, and Part 5 implementation.

Implement ONLY Part 6.

---

# Important Safety Requirements

* Do not change working backend business logic.
* Do not change working frontend business logic.
* Do not change the database schema.
* Do not recreate correct migrations, models, seeders, controllers, services, routes, pages, or reusable components.
* Do not redesign the UI.
* Preserve all existing tests.
* Preserve existing API contracts.
* Preserve the `/api/v1` API prefix.
* Preserve existing Swagger behavior.
* Preserve Docker Compose local execution.
* Add only DevOps-related files and minimal configuration changes.
* Keep the project interview-friendly.
* Avoid unnecessary enterprise complexity.
* Do not commit real secrets.
* Do not expose passwords, JWT secrets, tokens, or credentials in logs or generated files.

---

# Read Documentation

Read these files completely before making changes:

```text
docs/Part-6-DevOps-and-Deployment.md
docs/Codex-Prompt-Part-6.md
README.md
```

Also inspect:

```text
backend/Dockerfile
frontend/Dockerfile
docker-compose.yml
backend/package.json
frontend/package.json
backend/.env.example
frontend/.env.example
.env.example
backend/src/server.js
backend/src/config/database.js
backend health route
existing GitHub workflow files
```

---

# Scope

Implement:

1. GitHub Actions CI
2. Docker optimization
3. Docker ignore files
4. Dependabot
5. CodeQL
6. Trivy scanning
7. Kubernetes manifests
8. Health checks and probes
9. Environment and secret management documentation
10. Deployment verification
11. Rollback documentation
12. README updates
13. DevOps checklist

Do not implement:

* New HR business modules
* New database tables
* UI redesign
* Cloud-specific infrastructure
* Terraform
* Helm
* Prometheus
* Grafana
* OpenTelemetry

These may be future enhancements.

---

# 1. GitHub Actions CI Workflow

Create:

```text
.github/workflows/ci.yml
```

Trigger on:

```text
push to main
pull_request to main
```

Add concurrency control so outdated runs can be cancelled.

Use minimum required permissions.

---

## Backend CI Job

The backend job must:

1. Checkout the repository.
2. Set up the Node.js version compatible with the current project.
3. Use npm dependency caching.
4. Start a PostgreSQL service container if tests require PostgreSQL.
5. Create the required test environment variables using safe CI-only values.
6. Run:

```bash
cd backend
npm ci
npm run lint
npm test
npm audit --omit=dev
```

7. Run migrations or seeders only when required by the existing tests.
8. Ensure test data is isolated or cleaned up.
9. Fail if lint or tests fail.
10. Do not print credentials.

Preserve the existing passing backend tests.

---

## Frontend CI Job

The frontend job must:

1. Checkout the repository.
2. Set up the project-compatible Node.js version.
3. Use npm dependency caching.
4. Configure safe build-time environment values.
5. Run:

```bash
cd frontend
npm ci
npm run lint
npm run build
npm audit --omit=dev
```

6. Fail if lint or build fails.
7. Do not introduce a new test framework unless it is necessary and low-risk.

---

## Docker CI Job

The Docker job must:

1. Run after required backend and frontend checks.
2. Validate:

```bash
docker compose config
```

3. Build backend and frontend Docker images.
4. Do not push images.
5. Fail when the build fails.
6. Use BuildKit or build cache where practical.
7. Report final image sizes.

---

# 2. Docker Optimization

Inspect the existing Dockerfiles before changing them.

Make only minimal compatible changes.

---

## Backend Dockerfile

Optimize the backend Dockerfile.

Requirements:

* Use a stable Node.js LTS base image.
* Use `npm ci`.
* Use a multi-stage build where it reduces size or improves security.
* Install only production dependencies in the final image.
* Set `NODE_ENV=production`.
* Copy only required runtime files.
* Preserve migrations and seeders when they are needed at runtime.
* Preserve the uploads directory.
* Preserve the current production start command.
* Use a non-root user where practical.
* Add or preserve a health check if appropriate.
* Do not break Winston logging or static uploads.
* Do not copy local `.env` files.

---

## Frontend Dockerfile

Convert the frontend Dockerfile to a Next.js multi-stage production build.

Recommended stages:

```text
dependencies
builder
runner
```

Requirements:

* Use `npm ci`.
* Run `npm run build`.
* Use Next.js standalone output if compatible.
* Update Next.js configuration minimally if standalone output is needed.
* Copy standalone server files.
* Copy `.next/static`.
* Copy the public directory.
* Run with `NODE_ENV=production`.
* Use a non-root user where practical.
* Preserve current API URL behavior.
* Do not copy development `node_modules` into the final image.
* Do not break favicon or static assets.

---

## Docker Image Size

Record image sizes before optimization.

Build optimized images.

Record image sizes after optimization.

Report:

| Image    | Before | After | Reduction |
| -------- | ------ | ----- | --------- |
| Backend  | value  | value | value     |
| Frontend | value  | value | value     |

Do not make unsupported claims when the environment cannot provide the size.

---

# 3. Docker Ignore Files

Create:

```text
backend/.dockerignore
frontend/.dockerignore
```

Exclude unnecessary files such as:

```text
node_modules
.git
.gitignore
.env
.env.*
npm-debug.log
coverage
tests
logs
.next/cache
docs
README.md
local temporary files
```

Do not exclude files required for production build or runtime.

Preserve empty runtime directories using placeholders where needed.

---

# 4. Docker Compose

Inspect and update the existing `docker-compose.yml` only when required.

Requirements:

* PostgreSQL service
* Backend service
* Frontend service
* Named PostgreSQL volume
* Shared application network
* Safe environment variable mapping
* PostgreSQL health check
* Backend health check
* Frontend health check where practical
* Dependency conditions based on service health
* Correct backend API URL
* Correct container-to-container hostnames
* No real secrets
* No duplicated `/api/v1/api/v1` URLs
* Do not break Windows local execution

Expected startup flow:

```text
PostgreSQL healthy
        ↓
Backend starts and becomes healthy
        ↓
Frontend starts
```

Validate using:

```bash
docker compose config
```

---

# 5. Dependabot

Create:

```text
.github/dependabot.yml
```

Configure weekly updates for:

* Backend npm
* Frontend npm
* GitHub Actions
* Backend Docker image
* Frontend Docker image

Requirements:

* Use correct directory values.
* Limit open pull requests.
* Add clear labels.
* Use a weekly schedule.
* Do not enable automatic merging.
* Group compatible patch/minor npm updates where practical.

---

# 6. CodeQL

Create:

```text
.github/workflows/codeql.yml
```

Requirements:

* Analyze JavaScript and TypeScript.
* Trigger on push to main.
* Trigger on pull requests to main.
* Add a weekly scheduled scan.
* Use GitHub-supported actions.
* Use minimum required permissions.
* Do not duplicate the CI workflow unnecessarily.
* Do not modify application code.

---

# 7. Trivy Security Scan

Create:

```text
.github/workflows/trivy.yml
```

Trivy must scan:

* Repository filesystem
* Backend Docker image
* Frontend Docker image

Scan for:

```text
vulnerabilities
secrets
misconfigurations
```

Requirements:

* Do not expose detected secret values in logs.
* Use a documented severity policy.
* Prefer failing on HIGH and CRITICAL findings.
* Upload scan reports where practical.
* Use timeouts.
* Avoid scanning generated folders unnecessarily.
* Do not automatically apply unsafe dependency upgrades.

---

# 8. npm Audit

Ensure CI runs:

```bash
npm audit --omit=dev
```

for backend and frontend.

Do not run:

```bash
npm audit fix --force
```

automatically.

Report unresolved production dependency vulnerabilities honestly.

---

# 9. Kubernetes Manifests

Create:

```text
k8s/
```

Files:

```text
k8s/namespace.yaml
k8s/configmap.yaml
k8s/secret-example.yaml
k8s/postgres-pvc.yaml
k8s/postgres-deployment.yaml
k8s/postgres-service.yaml
k8s/backend-deployment.yaml
k8s/backend-service.yaml
k8s/frontend-deployment.yaml
k8s/frontend-service.yaml
k8s/ingress.yaml
k8s/README.md
```

Use namespace:

```text
hrms
```

---

## Kubernetes Secret Safety

`secret-example.yaml` must contain placeholders only.

Do not use real:

* Database passwords
* JWT secrets
* Access tokens
* Registry credentials

Document secure secret creation using `kubectl create secret`.

---

## PostgreSQL Kubernetes Resources

Use a simple demo-purpose Deployment or StatefulSet.

Include:

* One replica
* PersistentVolumeClaim
* ConfigMap references
* Secret references
* Port 5432
* Readiness probe
* Liveness probe
* Resource requests
* Resource limits
* ClusterIP service

Clearly document that this is not a production high-availability PostgreSQL setup.

---

## Backend Kubernetes Resources

Include:

* Deployment
* Service
* Two replicas where practical
* Port 5000
* ConfigMap values
* Secret values
* Readiness probe using `/api/v1/health`
* Liveness probe using `/api/v1/health`
* Resource requests
* Resource limits
* Rolling update strategy
* ClusterIP service

Do not assume a real container registry URL.

Use a clearly documented placeholder image name.

---

## Frontend Kubernetes Resources

Include:

* Deployment
* Service
* Port 3000
* API URL configuration
* Readiness probe
* Liveness probe
* Resource requests
* Resource limits
* Rolling update strategy
* ClusterIP service

Use a clearly documented placeholder image name.

---

## Ingress

Create a simple Ingress example.

Recommended host:

```text
hrms.local
```

Recommended routing:

```text
/     -> frontend
/api  -> backend
```

Ensure the selected path strategy is compatible with the current frontend API base URL.

Document local hosts file setup.

Do not assume a cloud-specific ingress controller.

---

# 10. Kubernetes Validation

Validate all Kubernetes YAML using one of the available methods:

```bash
kubectl apply --dry-run=client -f k8s/
```

or another installed manifest validator.

Report clearly when validation cannot be run because Kubernetes tools are unavailable.

Do not claim Kubernetes deployment success unless it was actually verified.

---

# 11. README Documentation

Update the root README.

Add sections for:

* DevOps overview
* GitHub Actions workflows
* Workflow status badge
* Backend CI checks
* Frontend CI checks
* Docker build validation
* Docker image build commands
* Docker image optimization
* Docker Compose startup
* Docker health checks
* Dependabot
* CodeQL
* Trivy
* Kubernetes architecture
* Kubernetes deployment commands
* Kubernetes verification commands
* Kubernetes logs
* Kubernetes rollout status
* Kubernetes rollback
* Known limitations
* Security notes
* Secret management
* Future DevOps improvements

Do not remove existing project setup and application documentation.

---

# 12. Deployment Commands

Document exact Windows CMD commands.

Local Docker:

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
```

Kubernetes:

```cmd
kubectl apply --dry-run=client -f k8s\
kubectl apply -f k8s\
kubectl get all -n hrms
kubectl get pods -n hrms
kubectl get services -n hrms
kubectl get ingress -n hrms
```

---

# 13. Rollback Documentation

Document:

## Git rollback

```cmd
git log --oneline -10
git revert <commit-id>
```

## Docker rollback

Use stable image tags and restart Compose.

## Kubernetes rollback

```cmd
kubectl rollout history deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-frontend -n hrms
```

## Sequelize migration rollback

```cmd
cd backend
npm run db:migrate:undo
```

Do not recommend destructive rollback without a database backup warning.

---

# 14. Monitoring Basics

Preserve and document:

* Health endpoint
* Docker health checks
* Kubernetes liveness probes
* Kubernetes readiness probes
* Winston structured logs
* Request IDs
* GitHub Actions results
* CodeQL findings
* Trivy findings

Do not add Prometheus, Grafana, or OpenTelemetry in Part 6.

Mention them only as future enhancements.

---

# 15. Secret Audit

Search the tracked repository for:

* `.env` files
* Passwords
* JWT secrets
* Tokens
* Private keys
* Cloud credentials
* Hardcoded production URLs

Confirm:

* Real `.env` files are ignored.
* Example files contain placeholders.
* Kubernetes Secret file contains placeholders.
* GitHub workflows do not print secrets.
* README contains only safe local demo credentials, if retained.

Use commands such as:

```cmd
git ls-files
git status --ignored
```

Do not remove safe demo documentation without reason.

---

# Before Making Changes

1. Run `git status`.
2. Inspect the complete repository structure.
3. Inspect current Dockerfiles.
4. Inspect `docker-compose.yml`.
5. Inspect package scripts.
6. Inspect backend tests.
7. Inspect health endpoints.
8. Inspect README.
9. Inspect existing GitHub Actions files.
10. Inspect current Docker image sizes if available.
11. Produce a DevOps implementation plan.
12. List every file expected to be created or modified.
13. Identify any risks before modifying files.

---

# After Implementation

1. List all created files.
2. List all modified files.
3. Explain each change.
4. Run backend lint.
5. Run backend tests.
6. Confirm all existing tests still pass.
7. Run frontend lint.
8. Run frontend production build.
9. Validate Docker Compose.
10. Build backend Docker image.
11. Build frontend Docker image.
12. Report image sizes before and after optimization.
13. Verify local Docker Compose startup where Docker is available.
14. Verify backend health.
15. Verify frontend availability.
16. Validate Kubernetes manifests.
17. Verify no secrets were committed.
18. Verify GitHub workflow YAML syntax.
19. Verify Dependabot configuration.
20. Verify CodeQL workflow.
21. Verify Trivy workflow.
22. Confirm existing local application behavior remains unchanged.
23. List checks that require GitHub Actions to verify remotely.
24. List checks that require a Kubernetes cluster to verify.
25. List remaining known issues honestly.
26. Do not start a new project phase.

---

# Acceptance Criteria

Part 6 is complete only when:

* CI workflow exists.
* Backend CI steps are configured.
* Frontend CI steps are configured.
* Docker validation is configured.
* Docker images build.
* Docker image optimization is applied safely.
* Docker ignore files exist.
* Dependabot exists.
* CodeQL exists.
* Trivy exists.
* Kubernetes manifests exist.
* Kubernetes manifests validate where tooling is available.
* Health checks and probes exist.
* README contains deployment and rollback documentation.
* No real secrets are committed.
* Existing backend tests pass.
* Existing frontend build passes.
* Application behavior remains unchanged.

---

# Final Output Format

Provide:

## Summary

## Files Created

## Files Modified

## GitHub Actions

## Docker Optimization

## Docker Image Size Comparison

## Dependabot

## CodeQL

## Trivy

## Kubernetes Resources

## Health Checks

## Environment and Secret Management

## README Changes

## Verification Results

## Remote Verification Required

## Remaining Known Issues
