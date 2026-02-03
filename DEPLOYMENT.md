# Deployment

## Build Docker Image

Image in `amd64` architecture is required to be able to run in CERIT-SC Kubernetes environment.

### Linux

```sh
docker build -t design_system -f env/prod/Dockerfile .
```

Tag and push the image.

### MacOS (with M-series chips)

```sh
docker buildx build -f ./env/prod/Dockerfile \
  --platform linux/amd64,linux/arm64 \
  -t cerit.io/xcillik/design_system:latest \
  --push .
```

Verify compatible architecture:

```sh
docker manifest inspect xcillik/design_system:latest | jq '.manifests[].platform'
```

## Deploy

```sh
kubectl apply -f ./manifests/deployment.yaml \
  && kubectl apply -f ./manifests/service.yaml \
  && kubectl apply -f ./manifests/ingress.yaml
```
