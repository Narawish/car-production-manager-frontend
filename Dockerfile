# --- Base image with pnpm via corepack ---
FROM node:20-alpine AS base
WORKDIR /app

# Enable corepack so pnpm is available
RUN corepack enable

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# --- Dependencies stage ---
FROM base AS deps

# Only copy files needed to install dependencies
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# --- Build stage ---
FROM base AS builder

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Build Next.js (expects "build": "next build" in package.json)
RUN pnpm build

# --- Runtime stage ---
FROM base AS runner

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 nodejs \
    && adduser -S -u 1001 nextjs

USER nextjs

WORKDIR /app

# Copy only necessary files for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Copy production node_modules
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

# Start Next.js in production (expects "start": "next start")
CMD ["pnpm", "start"]