FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM node:20-alpine AS runner

# WORKDIR /app

# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/next.config.*js ./next.config.*js

ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:4001/api/v1
ENV NEXT_PUBLIC_HOOKS_URL=http://localhost:4002

EXPOSE 4000

CMD ["npm","run","start"]