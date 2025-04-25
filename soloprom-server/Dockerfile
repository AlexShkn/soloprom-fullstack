FROM node:20.17.0-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npm run prisma:generate

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./

RUN npm ci --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

CMD ["node", "dist/main"]

