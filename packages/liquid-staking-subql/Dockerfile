FROM node:18-alpine as builder
LABEL maintainer="hello@acala.network"

WORKDIR /app

# required to build some native deps
RUN apk add git python3 make gcc g++ musl-dev

# required by some legacy deps
RUN unlink /usr/bin/python && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    ln -s /usr/bin/pip3 /usr/bin/pip

# Build utils package first
COPY packages/utils/package.json packages/utils/yarn.lock ./utils/
RUN cd utils && yarn install
COPY packages/utils/ ./utils/
RUN cd utils && yarn build

# Build target package
COPY packages/liquid-staking-subql/package.json packages/liquid-staking-subql/yarn.lock ./
RUN yarn install
COPY packages/liquid-staking-subql/ ./
RUN yarn build

# =============

FROM onfinality/subql-node:v6.0.4
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/packages/liquid-staking-subql/package.json /app/
COPY --from=builder /app/packages/liquid-staking-subql/schema.graphql /app/
COPY --from=builder /app/packages/liquid-staking-subql/dist /app/dist
COPY --from=builder /app/packages/liquid-staking-subql/project.yaml /app/

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
