FROM node:14.11.0-alpine

WORKDIR /app

COPY ./packages/api/package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile --cache-folder /dev/shm/yarn

COPY ./packages/api/knexfile.js ./packages/api/knexfile-aggregator.js /app/
COPY ./packages/api/migrations /app/migrations
COPY ./packages/api/dist /app/dist

USER node

ENV NODE_ENV=production

CMD [ "node", "--enable-source-maps", "--unhandled-rejections=strict", "dist/server.js"]
