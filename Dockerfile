FROM oven/bun:1.1.28-slim AS build

WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:1.1.28-slim AS release

COPY --from=build /app/build ./

RUN bun install
CMD bun run start
