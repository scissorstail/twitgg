const { handle } = require('@/middlewares/routine-handler');

module.exports = (app) => {
  app.get('/', handle(require('./select')));
};
