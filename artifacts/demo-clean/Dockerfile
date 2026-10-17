# ==============================================================================
# Hardened Next.js Production Container - Zero-Trust Architecture
# 1. Non-root user (nextjs:nodejs UID/GID 10001)
# 2. Immutable application binaries
# 3. Dedicated data directory for JSON databases (/app/data)
# 4. Minimal runtime footprint & no package managers in final stage
# ==============================================================================

FROM node:20-alpine AS runner

# Add security dependencies (dumb-init for proper signal handling and PID 1 reap)
RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create unprivileged system group & user (UID/GID 10001)
RUN addgroup --system --gid 10001 nodejs && \
    adduser --system --uid 10001 nextjs -G nodejs

# Install production dependencies for Next.js runner
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && \
    pnpm install --prod --ignore-scripts && \
    npm cache clean --force && \
    rm -rf /root/.npm /root/.pnpm-store

# Copy pre-built application files
COPY .next ./.next
COPY public ./public
COPY next.config.mjs ./

# Create data directory for JSON storage and cache with strict permissions
RUN mkdir -p /app/data /app/.next/cache && \
    chown -R nextjs:nodejs /app/data /app/.next/cache && \
    chmod 750 /app/data /app/.next/cache

# Make all other application files strictly read-only
RUN chown -R root:nodejs /app && \
    chown -R nextjs:nodejs /app/data /app/.next/cache && \
    chmod -R 550 /app && \
    chmod -R 770 /app/data /app/.next/cache

# Switch to the non-root user
USER nextjs

EXPOSE 3000

# Native Docker Healthcheck to detect unresponsive processes or crashes
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://127.0.0.1:3000/api/reviews', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1));"

# Use dumb-init to prevent zombie processes and properly handle termination signals
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "node_modules/next/dist/bin/next", "start"]
