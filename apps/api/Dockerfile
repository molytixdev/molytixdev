# ------------------------
# Base image
# ------------------------
FROM node:22-alpine AS base
ENV APP_NAME=api
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN apk add --no-cache gcompat dumb-init && corepack enable pnpm
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# ADDED: Prune stage - same pattern as web dockerfile for consistency
FROM base AS prune
WORKDIR /temp/prune
COPY . .
RUN apk add --no-cache yq && \
 TURBO_VERSION=$(yq e '.packages | keys | .[] | select(. == "turbo@*")' pnpm-lock.yaml | cut -d '@' -f 2) && \
 pnpm install -D -w turbo@$TURBO_VERSION && \
 pnpm turbo prune @workspace/$APP_NAME --docker

# CHANGED: Updated dev stage to use prune output for better caching
FROM base AS dev
WORKDIR /app
COPY --from=prune /temp/prune/out/json/package.json ./package.json
COPY --from=prune /temp/prune/out/json/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /temp/prune/out/json/ ./
RUN apk add --no-cache jq && pnpm install -r --frozen-lockfile
COPY --from=prune /temp/prune/out/full/ ./
USER node
CMD ["sh", "-c", "./packages/dev-all.sh"]

# ADDED: Build stage for API (was missing)
FROM base AS build
WORKDIR /app
COPY --from=prune /temp/prune/out/json/package.json ./package.json
COPY --from=prune /temp/prune/out/json/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /temp/prune/out/json/ ./
RUN pnpm install -r --frozen-lockfile
COPY --from=prune /temp/prune/out/full/ ./
RUN pnpm turbo build -F @workspace/$APP_NAME

# ADDED: Production dependencies stage - only install production deps
FROM base AS prod-deps
WORKDIR /app
COPY --from=prune /temp/prune/out/json/package.json ./package.json
COPY --from=prune /temp/prune/out/json/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /temp/prune/out/json/ ./
# MAIN OPTIMIZATION: --prod flag excludes all devDependencies
RUN pnpm install -r --frozen-lockfile --prod

# ADDED: Production stage (was missing)
FROM base AS prod
ENV NODE_ENV=production
WORKDIR /app
# Copy only production dependencies
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=prod-deps --chown=node:node /app/apps/$APP_NAME/node_modules ./apps/$APP_NAME/node_modules
COPY --from=prod-deps --chown=node:node /app/packages ./packages
# Copy built application
COPY --from=build --chown=node:node /app/apps/$APP_NAME/dist ./apps/$APP_NAME/dist
COPY --from=build --chown=node:node /app/apps/$APP_NAME/package.json ./apps/$APP_NAME/package.json
USER node
EXPOSE 8000
CMD ["sh", "-c", "node apps/$APP_NAME/dist/server.js"]