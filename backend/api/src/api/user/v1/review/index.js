const passport = require('@/api/user/v1/auth/passport');
const { handle, handleWithTx } = require('@/middlewares/routine-handler');

module.exports = (app) => {
  app.get('/', handle(require('./select')));

  app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
    router.post('/', handleWithTx(require('./insert')));
    router.put('/:rv_no', handle(require('./update')));
    router.get('/my-review', handle(require('./my-review')));
  });
};
