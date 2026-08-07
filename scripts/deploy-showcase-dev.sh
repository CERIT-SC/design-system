#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

REGISTRY="${DOCKER_REGISTRY:-cerit.io}"
IMAGE="${REGISTRY}/design-system/app:dev"
NAMESPACE="${KUBE_NAMESPACE:-einfra-design-system-ns}"
DEPLOYMENT_NAME="dev-app"
DOCKERFILE="deployment/containers/prod/Dockerfile.app.bun"
MANIFEST="deployment/manifests/dev-app-deployment.yaml"
VERSION="$(git rev-parse --short HEAD)"
ASSUME_YES=0

usage() {
  cat <<EOF
Usage: $(basename "$0") [-y]

Builds the showcase app (amd64) from ${DOCKERFILE}, pushes it to
${IMAGE}, then applies ${MANIFEST} to namespace "${NAMESPACE}"
and restarts the rollout so the new image is picked up.

  -y    Skip the confirmation prompt (non-interactive use)
EOF
}

while getopts "yh" opt; do
  case "$opt" in
    y) ASSUME_YES=1 ;;
    h) usage; exit 0 ;;
    *) usage; exit 1 ;;
  esac
done

for cmd in docker kubectl; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: '$cmd' is required but not found on PATH." >&2
    exit 1
  fi
done

if ! docker buildx version >/dev/null 2>&1; then
  echo "Error: docker buildx is required (used to build for linux/amd64)." >&2
  exit 1
fi

CURRENT_CONTEXT="$(kubectl config current-context 2>/dev/null || echo "<none>")"

echo "About to deploy the showcase dev instance:"
echo "  Image:      ${IMAGE}"
echo "  Build arg:  NEXT_PUBLIC_TAG=${VERSION}"
echo "  Namespace:  ${NAMESPACE}"
echo "  kubectl ctx: ${CURRENT_CONTEXT}"
echo

if [ "$ASSUME_YES" -ne 1 ]; then
  read -r -p "Proceed? [y/N] " reply
  case "$reply" in
    [yY][eE][sS]|[yY]) ;;
    *) echo "Aborted."; exit 1 ;;
  esac
fi

echo "==> Building and pushing ${IMAGE} (linux/amd64)"
docker buildx build \
  --platform linux/amd64 \
  -f "$DOCKERFILE" \
  --build-arg "NEXT_PUBLIC_TAG=${VERSION}" \
  -t "$IMAGE" \
  --push \
  .

echo "==> Applying ${MANIFEST}"
kubectl apply -f "$MANIFEST" --namespace="$NAMESPACE"

echo "==> Restarting rollout so the dev tag is re-pulled"
kubectl rollout restart "deployment/${DEPLOYMENT_NAME}" --namespace="$NAMESPACE"
kubectl rollout status "deployment/${DEPLOYMENT_NAME}" --namespace="$NAMESPACE" --timeout=180s

echo "==> Done. Dev instance updated in namespace ${NAMESPACE}."
