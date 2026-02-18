FROM node:22-alpine AS base

WORKDIR /app

# Install Bun for package management
RUN apk add --no-cache curl unzip bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

FROM base AS dependencies

COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build:showcase

RUN ls -la .next/ && ls -la .next/standalone/ || (echo "Standalone build not found!" && exit 1)

FROM base AS production

WORKDIR /app

ENV NODE_ENV=production \
    PORT=80 \
    HOSTNAME="0.0.0.0"

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Leverage output traces to reduce the final image size by only copying necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

CMD ["node", "server.js"]
