const passport = require('@/api/user/v1/auth/passport');
const { handle } = require('@/middlewares/routine-handler');

async function login(req, res) {
  // 에러처리
  if (req.user.error) {
    delete req.user.error;
    return res.status(500).json(req.user);
  }

  // 로그인 성공 시
  const { token } = req.user;

  return res.json({ token });
}

module.exports = (app) => {
  app.post('/login', [passport.authenticate('user.local', { session: false })], login);

  app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
    router.get('/profile', handle(require('./profile')));
  });
};
