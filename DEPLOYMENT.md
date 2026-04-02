# Manual Deployment Guide for the Showcase App

## Docket Tags Convention

- `latest`
- `prod` - Image used in deployment of the showcase app
- (hash)

## 1. Build Docker Image

Image in `amd64` architecture is required to be able to run in CERIT-SC Kubernetes environment.

### Linux

Build:

```sh
docker build -t design-system/designsystem-app:latest -f ./deployment/containers/prod/Dockerfile.bun .
```

Tag:

```sh
docker tag design-system/designsystem-app:latest cerit.io/design-system/design-system-showcase:latest
```

Push:

```sh
docker push cerit.io/design-system/designsystem-app:latest
```

### MacOS (with M-series chips)

Build, tag and push:

```sh
docker buildx build -f ./deployment/containers/prod/Dockerfile.bun \
  --platform linux/amd64,linux/arm64 \
  -t cerit.io/design-system/designsystem-app:latest \
  --push .
```

Verify compatible architecture:

```sh
docker manifest inspect design-system/designsystem-app:latest | jq '.manifests[].platform'
```

## 2. Deploy

```sh
kubectl apply -f ./deployment/manifests/deployment.yaml \
  && kubectl apply -f ./deployment/manifests/service.yaml \
  && kubectl apply -f ./deployment/manifests/ingress.yaml
```
