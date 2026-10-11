FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install production dependencies for next start
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --prod --ignore-scripts

# Copy pre-built application
COPY .next ./.next
COPY public ./public
COPY next.config.mjs ./

EXPOSE 3000

CMD ["pnpm", "start"]
