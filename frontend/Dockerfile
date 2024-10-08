FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#Actual Prod Image
FROM node:20-alpine AS production

WORKDIR /app

COPY --FROM=build /app/.next ./.next

COPY --FROM=build /app/package*.json ./
RUN npm install --production