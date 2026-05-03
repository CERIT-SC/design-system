# Manual Deployment Guide

## Docker Tags Convention

### designsystem-app
- `latest`
- `prod` - Image used in deployment of the showcase app
- (hash)

### designsystem-storybook
- `latest`
- `prod` - Image used in deployment of the storybook
- (hash)

## 1. Build Docker Image

Image in `amd64` architecture is required to be able to run in CERIT-SC Kubernetes environment.

### Linux

#### Showcase App

Build:

```sh
docker build -t design-system/designsystem-app:latest -f ./deployment/containers/prod/Dockerfile.bun .
```

Tag:

```sh
docker tag design-system/designsystem-app:latest cerit.io/design-system/designsystem-app:latest
```

Push:

```sh
docker push cerit.io/design-system/designsystem-app:latest
```

#### Storybook

Build:

```sh
docker build -t design-system/designsystem-storybook:latest -f ./deployment/containers/prod/Dockerfile.storybook .
```

Tag:

```sh
docker tag design-system/designsystem-storybook:latest cerit.io/design-system/designsystem-storybook:latest
```

Push:

```sh
docker push cerit.io/design-system/designsystem-storybook:latest
```

### MacOS (with M-series chips)

#### Showcase App

Build, tag and push:

```sh
docker buildx build -f ./deployment/containers/prod/Dockerfile.bun \
  --platform linux/amd64,linux/arm64 \
  -t cerit.io/design-system/designsystem-app:latest \
  --push .
```

#### Storybook

Build, tag and push:

```sh
docker buildx build -f ./deployment/containers/prod/Dockerfile.storybook \
  --platform linux/amd64,linux/arm64 \
  -t cerit.io/design-system/designsystem-storybook:latest \
  --push .
```

#### Verify Compatible Architecture

Showcase App:

```sh
docker manifest inspect design-system/designsystem-app:latest | jq '.manifests[].platform'
```

Storybook:

```sh
docker manifest inspect design-system/designsystem-storybook:latest | jq '.manifests[].platform'
```

## 2. Deploy

### Showcase App

```sh
kubectl apply -f ./deployment/manifests/deployment.yaml \
  && kubectl apply -f ./deployment/manifests/service.yaml \
  && kubectl apply -f ./deployment/manifests/ingress.yaml
```

### Storybook

```sh
kubectl apply -f ./deployment/manifests/storybook-deployment.yaml \
  && kubectl apply -f ./deployment/manifests/storybook-service.yaml \
  && kubectl apply -f ./deployment/manifests/ingress.yaml
```
