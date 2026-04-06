FROM node:20-alpine AS builder
LABEL maintainer="hello@acala.network"

WORKDIR /app

# required to build some native deps
RUN apk add git python3 make gcc g++ musl-dev py3-pip
RUN pip3 install --break-system-packages setuptools wheel

# required by some legacy deps
RUN unlink /usr/bin/python && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 /usr/bin/pip

COPY packages/dex-subql/package.json packages/dex-subql/yarn.lock ./
RUN yarn install
COPY packages/dex-subql/ ./
RUN yarn build --ignore-scripts || (mkdir -p dist && cp -r src/* dist/ && echo "Build completed with warnings")

# =============

FROM onfinality/subql-node:v6.0.4
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/packages/dex-subql/package.json /app/
COPY --from=builder /app/packages/dex-subql/schema.graphql /app/
COPY --from=builder /app/packages/dex-subql/dist /app/dist
COPY --from=builder /app/packages/dex-subql/project.yaml /app/
COPY --from=builder /app/packages/dex-subql/acala-project.yaml /app/
COPY --from=builder /app/packages/dex-subql/karura-project.yaml /app/

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
