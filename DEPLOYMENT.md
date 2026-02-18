# Manual Deployment Guide for the Showcase App

## 1. Build Docker Image

Image in `amd64` architecture is required to be able to run in CERIT-SC Kubernetes environment.

### Linux

Build:

```sh
docker build -t design-system/design-system-showcase:latest -f ./env/prod/Dockerfile.bun .
```

Tag:

```sh
docker tag design-system/design-system-showcase:latest cerit.io/design-system/design-system-showcase:latest
```

Push:

```sh
docker push cerit.io/design-system/design-system-showcase:latest
```

### MacOS (with M-series chips)

Build, tag and push:

```sh
docker buildx build -f ./env/prod/Dockerfile.bun \
  --platform linux/amd64,linux/arm64 \
  -t cerit.io/design-system/design-system-showcase:latest \
  --push .
```

Verify compatible architecture:

```sh
docker manifest inspect design-system/design-system-showcase:latest | jq '.manifests[].platform'
```

## 2. Deploy

```sh
kubectl apply -f ./manifests/deployment.yaml \
  && kubectl apply -f ./manifests/service.yaml \
  && kubectl apply -f ./manifests/ingress.yaml
```
