FROM oven/bun:latest
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/api
RUN bun install
WORKDIR /usr/src/app/client
RUN bun run build
WORKDIR /usr/src/app/api
EXPOSE 3000
ENTRYPOINT ["bun", "index.ts"]