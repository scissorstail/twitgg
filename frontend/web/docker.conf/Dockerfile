FROM node:16-alpine
RUN mkdir /web
WORKDIR /web

COPY . .

# development
COPY .env .env

RUN npm install

VOLUME '/web'
CMD ["npm", "run", "dev"]
