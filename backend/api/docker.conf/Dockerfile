FROM node:16-alpine

RUN mkdir -p /api
WORKDIR /api

COPY ./package*.json ./
RUN npm install -g pm2
RUN npm install

COPY . /api
RUN chown -R node:node ./*

CMD [ "pm2-runtime", "/api/ecosystem.config.js" ]

