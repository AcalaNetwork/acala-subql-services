FROM node:18-alpine as builder
LABEL maintainer="hello@acala.network"

WORKDIR /app

# required to build some native deps
RUN apk add git python3 make gcc g++ musl-dev

# required by some legacy deps
RUN unlink /usr/bin/python && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    ln -s /usr/bin/pip3 /usr/bin/pip

COPY . .
RUN yarn install --immutable
RUN yarn workspace @acala-subql-services/histories-subql build

# =============

FROM onfinality/subql-node:v6.0.4
LABEL maintainer="hello@acala.network"

# subql node changed default user to USER 1000
USER root

WORKDIR /app

COPY --from=builder /app/packages/histories-subql/package.json /app/
COPY --from=builder /app/packages/histories-subql/schema.graphql /app/
COPY --from=builder /app/packages/histories-subql/dist /app/dist
COPY --from=builder /app/packages/histories-subql/project.yaml /app/

RUN chown -R 1000:1000 /app

USER 1000

EXPOSE 3000
