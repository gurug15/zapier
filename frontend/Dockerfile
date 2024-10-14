FROM node:20-alpine AS base
FROM base AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 4000

ENV PORT 4000

CMD npm start