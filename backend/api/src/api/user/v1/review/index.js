const passport = require('@/api/user/v1/auth/passport');
const { handle } = require('@/middlewares/routine-handler');

module.exports = (app) => {
  app.get('/', handle(require('./select')));

  app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
    router.post('/', handle(require('./insert')));
    router.put('/:rv_no', handle(require('./update')));
  });
};
