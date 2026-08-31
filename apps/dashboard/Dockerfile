FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/dashboard ./apps/dashboard
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --frozen-lockfile

WORKDIR /app/apps/dashboard

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
