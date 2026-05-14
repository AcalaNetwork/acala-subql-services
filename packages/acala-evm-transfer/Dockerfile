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

COPY packages/acala-evm-transfer/package.json packages/acala-evm-transfer/bun.lock ./
RUN bun install
COPY packages/acala-evm-transfer/ ./
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
    && ls -la /app/dist \
    && echo "Build completed successfully"

# =============

FROM subquerynetwork/subql-node-ethereum:v6.5.0
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/schema.graphql /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/project.yaml.template /app/
COPY --from=builder /app/project.yaml.template /app/project.yaml
COPY --from=builder /app/docker/entrypoint.sh /app/entrypoint.sh
COPY --from=builder /app/abis /app/abis

RUN chmod +x /app/entrypoint.sh && chown -R 1000:1000 /app

USER 1000

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--", "/app/entrypoint.sh"]
CMD ["-f=/app"]
