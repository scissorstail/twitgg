const config = require('@/config');
const postgres = require('postgres');

module.exports = postgres(config.pg);
