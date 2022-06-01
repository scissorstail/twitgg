module.exports = (app) => {
  // 유저 API 라우트
  app.group('/api/user/v1', (router) => {
    router.group('/auth', require('@/api/user/v1/auth'));
  });
};
