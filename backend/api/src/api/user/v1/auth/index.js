const config = require('@/config');
const passport = require('@/api/user/v1/auth/passport');
const { handle } = require('@/middlewares/routine-handler');

async function login(req, res) {
  // 로그인 실패 시
  if (req.user.error) {
    delete req.user.error;
    return res.status(500).json(req.user);
  }

  // 로그인 성공 시
  const { token } = req.user;
  res.cookie(config.auth.jwtTokenName, token);
  return res.json({ token });
}

async function loginTwitter(req, res) {
  // 로그인 실패 시
  if (req.user.error) {
    const { state } = req.user;
    return res.redirect(`${config.app.webUrl}?success=false&state=${state}`);
  }

  // 로그인 성공 시
  const { token } = req.user;
  res.cookie(config.auth.jwtTokenName, token);
  return res.redirect(`${config.app.webUrl}`);
}

module.exports = (app) => {
  // twitter
  app.get('/login/twitter', passport.authenticate('user.twitter', { session: false, scope: ['tweet.read', 'tweet.write', 'users.read'] })); // 트위터 로그인
  app.get('/login/twitter/callback', passport.authenticate('user.twitter', { session: false, failureRedirect: `${config.app.webUrl}/social-redirect/twitter?success=false&state=${-4}` }), loginTwitter); // 트위터 로그인 콜백

  // local
  app.post('/login', [passport.authenticate('user.local', { session: false })], login);

  app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
    router.get('/profile', handle(require('./profile')));
  });
};
