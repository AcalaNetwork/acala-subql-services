FROM oven/bun:1-alpine AS builder
LABEL maintainer="hello@acala.network"

WORKDIR /app

# required to build some native deps
RUN apk add git python3 make gcc g++ musl-dev py3-pip
RUN pip3 install --break-system-packages setuptools wheel

# required by some legacy deps
RUN unlink /usr/bin/python && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 /usr/bin/pip

COPY packages/dex-subql-fixed/package.json packages/dex-subql-fixed/bun.lock ./
RUN bun install
COPY packages/dex-subql-fixed/ ./
RUN set -e \
    && rm -rf /app/dist \
    && ./node_modules/.bin/subql codegen \
    && ./node_modules/.bin/subql build --output dist \
    && for i in 1 2 3 4 5; do [ -d /app/dist ] && break; sleep 1; done \
    && if [ ! -d /app/dist ]; then \
        echo "SubQL build did not create /app/dist"; \
        find /app -maxdepth 2 -type d -name dist -print; \
        find /app -maxdepth 2 -type f \( -name 'index.js' -o -name 'index.js.LICENSE.txt' \) -print; \
        exit 1; \
    fi \
    && if [ -f /app/src/chain-types.ts ] && [ ! -f /app/dist/chain-types.js ]; then \
        ./node_modules/.bin/tsc /app/src/chain-types.ts --module commonjs --target es2019 --esModuleInterop --skipLibCheck --outDir /app/dist; \
      fi \
    && if [ -f /app/src/chaintypes.ts ] && [ ! -f /app/dist/chaintypes.js ]; then \
        ./node_modules/.bin/tsc /app/src/chaintypes.ts --module commonjs --target es2019 --esModuleInterop --skipLibCheck --outDir /app/dist; \
      fi \
    && if grep -R "rpc\\.oracle\\.getValue" /app/dist; then \
        echo "Built dex-fixed output still contains stale direct rpc.oracle.getValue"; \
        exit 1; \
      fi \
    && ls -la /app/dist \
    && echo "Build completed successfully"

# =============

FROM subquerynetwork/subql-node-substrate:v6.4.6
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/schema.graphql /app/
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/project.yaml /app/project.yaml

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
