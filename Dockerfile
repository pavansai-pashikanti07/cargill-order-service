FROM node:20-alpine AS runner

WORKDIR /app

COPY server.js .

ENV PORT=8080 \
    APP_VERSION=v1.0.4 \
    ENVIRONMENT=dev-eks \
    NODE_ENV=production

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

USER node

CMD ["node", "server.js"]
