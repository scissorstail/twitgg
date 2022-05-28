const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
});

module.exports = {
  app: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || '9595',
  },
  pg: {
    host: process.env.PG_HOST, // Postgres ip address[s] or domain name[s]
    port: process.env.PG_PORT, // Postgres server port[s]
    database: process.env.PG_DATABASE, // Name of database to connect to
    username: process.env.PG_USER, // Username of database user
    password: process.env.PG_PASSWORD, // Password of database user
    max: process.env.PG_POOL_MAX || 10, // Max number of connections
    idle_timeout: process.env.PG_POOL_IDLE_TIMEOUT || 15, // Idle connection timeout in seconds
    connect_timeout: process.env.PG_POOL_TIMEOUT || 5, // Connect timeout in seconds
  },
  auth: {
    jwtSecretUser: process.env.JWT_SECRET_USER || '',
    jwtExpireUser: process.env.JWT_EXPIRE_USER || '30d',
    jwtSecretAdmin: process.env.JWT_SECRET_ADMIN || '',
    jwtExpireAdmin: process.env.JWT_EXPIRE_ADMIN || '1d',
    saltRounds: 10, // https://github.com/kelektiv/node.bcrypt.js#to-hash-a-password
  },
};
