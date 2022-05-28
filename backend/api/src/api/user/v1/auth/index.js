const config = require('@/config');
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

async function loginTwitter(req, res) {
  if (req.user.error) {
    // 로그인 실패 시
    return res.redirect(`${config.app.webUrl}/social-redirect/twitter?success=false&message=${encodeURIComponent(req.user.message)}`);
  }

  // 로그인 성공 시
  const { token } = req.user;
  return res.redirect(`${config.app.webUrl}/social-redirect/twitter?success=true&token=${encodeURIComponent(Buffer.from(token).toString('base64'))}`);
  // 로그인 정보가 없을시 passport 에서 400 리턴
}

module.exports = (app) => {
  // twitter
  app.get('/login/twitter', passport.authenticate('user.twitter')); // 트위터 로그인
  app.get('/login/twitter/callback', passport.authenticate('user.twitter', { session: false }), loginTwitter); // 트위터 로그인 콜백

  // local
  app.post('/login', [passport.authenticate('user.local', { session: false })], login);

  app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
    router.get('/profile', handle(require('./profile')));
  });
};
