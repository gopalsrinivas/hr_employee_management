# HRMS Kubernetes Demo Manifests

These manifests are for an interview-friendly local Kubernetes demonstration. They are not a production high-availability PostgreSQL setup.

## Resources

- Namespace: `hrms`
- PostgreSQL Deployment, PVC, and ClusterIP Service
- Backend Deployment and ClusterIP Service
- Frontend Deployment and ClusterIP Service
- Example Ingress for `hrms.local`
- ConfigMap for non-sensitive configuration
- Secret example with placeholders only

## Secret Setup

Edit `secret-example.yaml` for local demos only, or create a real secret without committing values:

```cmd
kubectl create namespace hrms
kubectl create secret generic hrms-secrets -n hrms --from-literal=DB_USER=postgres --from-literal=DB_PASSWORD=<password> --from-literal=JWT_SECRET=<long-random-secret>
```

## Image Setup

The deployment files use placeholder images:

```text
ghcr.io/example/hrms-backend:latest
ghcr.io/example/hrms-frontend:latest
```

Replace them with images you have built and pushed to a registry. For the frontend, build with the public API URL expected by browser users:

```cmd
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://hrms.local/api/v1 -t <registry>/hrms-frontend:latest frontend
```

## Local Hostname

Add a hosts-file entry for local testing:

```text
127.0.0.1 hrms.local
```

## Validate

```cmd
kubectl apply --dry-run=client -f k8s\
```

## Deploy

```cmd
kubectl apply -f k8s\
kubectl get all -n hrms
kubectl get pods -n hrms
kubectl get services -n hrms
kubectl get ingress -n hrms
```

## Logs And Rollouts

```cmd
kubectl logs deployment/hrms-backend -n hrms
kubectl logs deployment/hrms-frontend -n hrms
kubectl rollout status deployment/hrms-backend -n hrms
kubectl rollout status deployment/hrms-frontend -n hrms
kubectl rollout history deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-backend -n hrms
kubectl rollout undo deployment/hrms-frontend -n hrms
```

Back up the database before destructive rollback operations.
