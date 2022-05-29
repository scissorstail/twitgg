const config = require('@/config');
const redis = require('redis');

const client = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  legacyMode: true,
});

module.exports = client;
