FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base AS runner
WORKDIR /app

# Instala apenas o Nginx para rodar junto com o Node
RUN apk add --no-cache nginx

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY nginx.conf /etc/nginx/nginx.conf

USER root
# Script para rodar o Nginx e o Next.js
RUN echo "nginx && node server.js" > /app/start.sh && chmod +x /app/start.sh

EXPOSE 2411
ENV PORT 3000
ENV HOSTNAME "127.0.0.1"

CMD ["/bin/sh", "/app/start.sh"]
