FROM node:16-alpine

RUN mkdir -p /api
WORKDIR /api

COPY . .

RUN npm install -g pm2
RUN npm install

RUN chown -R node:node ./*

CMD [ "pm2-runtime", "/api/ecosystem.config.js" ]
