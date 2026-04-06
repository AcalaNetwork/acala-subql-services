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
COPY packages/loan-subql/package.json packages/loan-subql/yarn.lock ./
RUN yarn install
COPY packages/loan-subql/ ./
RUN yarn build

# =============

FROM onfinality/subql-node:v6.0.4
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/packages/loan-subql/package.json /app/
COPY --from=builder /app/packages/loan-subql/schema.graphql /app/
COPY --from=builder /app/packages/loan-subql/dist /app/dist
COPY --from=builder /app/packages/loan-subql/project.yaml /app/

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
