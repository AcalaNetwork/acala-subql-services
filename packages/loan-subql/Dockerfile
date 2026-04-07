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

COPY packages/loan-subql/package.json packages/loan-subql/bun.lock ./
RUN bun install
COPY packages/loan-subql/ ./
RUN set -e \
    && if [ -d /app/dist ]; then \
        echo "Using prebuilt dist from build context"; \
      else \
        ./node_modules/.bin/subql codegen; \
        ./node_modules/.bin/subql build --output dist; \
      fi \
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

FROM onfinality/subql-node:v6.0.4
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/schema.graphql /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/project.yaml /app/

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
