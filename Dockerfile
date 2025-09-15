FROM node:22.18-slim as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22.18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/src/server.js"]
