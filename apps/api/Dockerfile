# ------------------------
# Base image
# ------------------------
FROM node:22-alpine AS base
ENV APP_NAME=api
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apk add --no-cache gcompat dumb-init && corepack enable pnpm
ENTRYPOINT ["/usr/bin/dumb-init", "--"]


# ------------------------
# Prune stage: install turbo + generate pruned monorepo
# ------------------------
FROM base AS prune

# Work in /temp/prune so we don't pollute /app
WORKDIR /temp/prune
COPY . .

RUN apk add --no-cache yq && \
    TURBO_VERSION=$(yq e '.packages | keys | .[] | select(. == "turbo@*")' pnpm-lock.yaml | cut -d '@' -f 2) && \
    pnpm install -D -w turbo@$TURBO_VERSION && \
    pnpm turbo prune @workspace/$APP_NAME --docker


# ------------------------
# Build stage: install deps (offline) + build target app
# ------------------------
FROM base AS build
WORKDIR /app

# Copy only package.json + lockfile from prune
COPY --from=prune /temp/prune/out/json/package.json ./package.json
COPY --from=prune /temp/prune/out/json/pnpm-lock.yaml ./pnpm-lock.yaml

# Fetch deps into pnpm store (no install yet)
RUN pnpm fetch

# Copy the full pruned workspace files
COPY --from=prune /temp/prune/out/full/ ./

# Offline install from pnpm store and build only target app
RUN pnpm install -r --offline && pnpm turbo build -F @workspace/$APP_NAME


# ------------------------
# Production image: minimal runtime
# ------------------------
FROM base AS prod
ENV NODE_ENV=production
WORKDIR /app

# Copy built app (dist folder) from build stage
COPY --from=build --chown=node:node /app/apps/$APP_NAME/dist ./dist

USER node
CMD ["node", "dist/server.js"]
