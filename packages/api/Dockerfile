FROM node:15.10.0-alpine

WORKDIR /app

COPY package.json yarn.lock /app/
COPY ./packages/api/package.json /app/packages/api/package.json

RUN npx @socialgouv/yarn-workspace-focus-install --cwd packages/api --production && yarn cache clean

COPY ./packages/api/knexfile.js ./packages/api/knexfile-aggregator.js /app/packages/api/dist/
COPY ./packages/api/knexfile.js ./packages/api/knexfile-aggregator.js /app/packages/api/
COPY ./packages/api/migrations /app/packages/api/migrations/
COPY ./packages/api/dist /app/packages/api/dist/

USER node

ENV NODE_ENV=production

CMD [ "node", "--enable-source-maps", "--unhandled-rejections=strict", "/app/packages/api/dist/src/server.js"]
