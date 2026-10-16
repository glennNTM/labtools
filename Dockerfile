# syntax=docker/dockerfile:1

# ---------- Build : bundle Vite ----------
FROM oven/bun:1.3.14-alpine AS build
WORKDIR /app

# Dépendances d'abord : cette couche reste en cache tant que le lockfile ne change pas.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Vite intègre les variables VITE_* dans le bundle : l'ID Google Analytics est fixé au build.
# Sans ID, aucune mesure d'audience n'est chargée.
ARG VITE_GA_MEASUREMENT_ID=""
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID

RUN bun run build

# ---------- Runtime : nginx sans root ----------
FROM nginxinc/nginx-unprivileged:1.30-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
