#!/usr/bin/env bash
set -euo pipefail

TAG="${1:-}"

if [[ -z "${TAG}" ]]; then
  echo "usage: $0 <image-tag>"
  exit 64
fi

SMOKE_SECONDS="${SMOKE_SECONDS:-90}"
IMAGE_PREFIX="${IMAGE_PREFIX:-acala}"
POSTGRES_IMAGE="${POSTGRES_IMAGE:-postgres:12-alpine}"
DOCKER_PLATFORM="${DOCKER_PLATFORM:-linux/amd64}"
NETWORK="subql-smoke-${TAG//[^a-zA-Z0-9]/-}-$$"
POSTGRES="subql-smoke-postgres-$$"

cleanup() {
  docker rm -f "${POSTGRES}" >/dev/null 2>&1 || true
  docker network rm "${NETWORK}" >/dev/null 2>&1 || true
}

trap cleanup EXIT

docker network create "${NETWORK}" >/dev/null
docker run -d \
  --platform "${DOCKER_PLATFORM}" \
  --name "${POSTGRES}" \
  --network "${NETWORK}" \
  -e POSTGRES_PASSWORD=postgres \
  "${POSTGRES_IMAGE}" >/dev/null

for _ in {1..30}; do
  if docker exec "${POSTGRES}" pg_isready -U postgres >/dev/null 2>&1; then
    postgres_ready=true
    break
  fi

  sleep 1
done

if [[ "${postgres_ready:-false}" != "true" ]]; then
  docker logs "${POSTGRES}" 2>&1 || true
  echo "postgres failed to become ready"
  exit 1
fi

run_smoke() {
  local name="$1"
  local image="$2"
  local manifest="$3"
  local schema="$4"
  local endpoint="$5"
  local container="subql-smoke-${name}-$$"
  local logs
  local running
  local exit_code

  echo "==> ${name}: ${image} ${manifest}"

  docker run -d \
    --platform "${DOCKER_PLATFORM}" \
    --name "${container}" \
    --network "${NETWORK}" \
    -e DB_USER=postgres \
    -e DB_PASS=postgres \
    -e DB_DATABASE=postgres \
    -e DB_HOST="${POSTGRES}" \
    -e DB_PORT=5432 \
    "${image}" \
    -f="${manifest}" \
    --network-endpoint="${endpoint}" \
    --workers=1 \
    --batch-size=10 \
    --disable-historical \
    --unsafe \
    --db-schema="${schema}" \
    --schema="${schema}" >/dev/null

  sleep "${SMOKE_SECONDS}"

  logs="$(docker logs "${container}" 2>&1 || true)"
  running="$(docker inspect -f '{{.State.Running}}' "${container}")"
  exit_code="$(docker inspect -f '{{.State.ExitCode}}' "${container}")"

  docker rm -f "${container}" >/dev/null 2>&1 || true

  if grep -E "JavaScript heap out of memory|Cannot convert NaN to a BigInt|TextEncoder is not defined|Failed to index block" <<<"${logs}" >/dev/null; then
    echo "${logs}"
    echo "${name} failed: runtime error found in logs"
    exit 1
  fi

  if [[ "${running}" != "true" && "${exit_code}" != "0" ]]; then
    echo "${logs}"
    echo "${name} failed: container exited with ${exit_code}"
    exit 1
  fi

  echo "${name} passed ${SMOKE_SECONDS}s smoke window"
}

docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/liquid-staking-subql:${TAG}" /app/acala-project.yaml >/dev/null
docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/liquid-staking-subql:${TAG}" /app/karura-project.yaml >/dev/null
docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/chain-stats-subql:${TAG}" /app/acala-project.yaml >/dev/null
docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/chain-stats-subql:${TAG}" /app/karura-project.yaml >/dev/null
docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/dex-subql:${TAG}" /app/karura-project.yaml >/dev/null
docker run --rm --platform "${DOCKER_PLATFORM}" --entrypoint ls "${IMAGE_PREFIX}/histories-subql:${TAG}" /app/karura-project.yaml >/dev/null

run_smoke \
  "chain-stats-acala" \
  "${IMAGE_PREFIX}/chain-stats-subql:${TAG}" \
  "/app/acala-project.yaml" \
  "smoke-chain-stats-acala" \
  "${ACALA_ENDPOINT:-wss://acala.polkawallet.io}"

run_smoke \
  "chain-stats-karura" \
  "${IMAGE_PREFIX}/chain-stats-subql:${TAG}" \
  "/app/karura-project.yaml" \
  "smoke-chain-stats-karura" \
  "${KARURA_ENDPOINT:-wss://karura.api.onfinality.io/public-ws}"

run_smoke \
  "dex-karura-2649603" \
  "${IMAGE_PREFIX}/dex-subql:${TAG}" \
  "/app/karura-project.yaml" \
  "smoke-dex-karura" \
  "${KARURA_ENDPOINT:-wss://karura.api.onfinality.io/public-ws}"

run_smoke \
  "histories-karura-2649500" \
  "${IMAGE_PREFIX}/histories-subql:${TAG}" \
  "/app/karura-project.yaml" \
  "smoke-histories-karura" \
  "${KARURA_ENDPOINT:-wss://karura.api.onfinality.io/public-ws}"
