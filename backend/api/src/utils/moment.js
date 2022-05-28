const moment = require('moment');
require('moment-timezone');
const { extendMoment } = require('moment-range');

module.exports = extendMoment(moment);
