FROM node:16-alpine

RUN mkdir /web
WORKDIR /web

COPY . .

# development
COPY .env .env

RUN npm install

RUN chown -R node:node ./*

CMD ["npm", "run", "dev"]
