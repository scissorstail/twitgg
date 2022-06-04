const { handle } = require('@/middlewares/routine-handler');

module.exports = (app) => {
  app.get('/', handle(require('./select')));
  app.get('/recently-reviewed', handle(require('./recently-reviewed')));
};
