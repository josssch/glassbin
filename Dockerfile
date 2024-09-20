FROM oven/bun:1.1.28-slim AS build

WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

FROM node:22.7.0-slim

COPY --from=build /app/package.json .

WORKDIR /app

RUN npm install --omit=dev

COPY --from=build /app/build /app
RUN ls -R

CMD ["node", "./index.js"]
