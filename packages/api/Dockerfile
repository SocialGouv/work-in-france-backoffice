FROM node:14.11.0-alpine

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./packages/api/knexfile.js ./packages/api/knexfile-aggregator.js /app/
COPY ./packages/api/migrations /app/migrations/
COPY ./packages/api/dist /app/dist/

USER node

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "--trace-deprecation", "--unhandled-rejections=strict", "/app/dist/index.js"]
