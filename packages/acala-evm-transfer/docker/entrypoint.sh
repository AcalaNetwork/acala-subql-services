#!/usr/bin/env sh
set -eu

require_env() {
  name="$1"
  eval "value=\${$name:-}"
  if [ -z "$value" ]; then
    echo "$name is required to render /app/project.yaml" >&2
    exit 1
  fi
}

escape_sed_replacement() {
  printf '%s' "$1" | sed 's/[\/&]/\\&/g'
}

case "${1:-}" in
  --help | -h | help | --version | -v | version)
    exec subql-node-ethereum "$@"
    ;;
esac

require_env CHAIN_ID
require_env ENDPOINT

chain_id="$(escape_sed_replacement "$CHAIN_ID")"
endpoint="$(escape_sed_replacement "$ENDPOINT")"

sed \
  -e "s/__CHAIN_ID__/$chain_id/g" \
  -e "s/__ENDPOINT__/$endpoint/g" \
  /app/project.yaml.template > /app/project.yaml

exec subql-node-ethereum "$@"
