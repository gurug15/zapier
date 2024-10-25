FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy .env file into the image
COPY .env .env

COPY . .

EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000

RUN npm run build

CMD ["npm", "start"]