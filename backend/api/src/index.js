require('module-alias/register');

const moment = require('@/utils/moment');
require('log-timestamp')(() => `[${moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')}]`); // console에 시간정보 자동추가

const config = require('@/config');

const express = require('express');
require('@/middlewares/express-group');
const compression = require('compression');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectRedis = require('connect-redis');
const redisClient = require('@/storage/redis');

const RedisStore = connectRedis(session);

const app = express();
app.use(cors()); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.urlencoded({ extended: true, limit: '1024mb' })); // nginx 설정 필요
app.use(express.json({ limit: '1024mb' }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.auth.jwtSecretUser,
  store: new RedisStore({
    client: redisClient,
    logErrors: false,
  }),
}));
app.use(passport.initialize());
app.use(compression()); // 응답압축
app.disable('x-powered-by'); // x-powered-by 헤더 비활성화

if (process.env.NODE_ENV === 'development') {
  // API 호출 시 URL 로그 출력
  app.all('*', (req, res, next) => {
    if (req.originalUrl === '/') {
    // Ignore hck
      return next();
    }

    console.log(`Server:${process.env.NODE_APP_INSTANCE || 0} ${req.method} ${req.originalUrl}`);
    return next();
  });
}

// hck
app.get('/', (req, res) => {
  res.send('hck');
});

// API 라우트
app.group('/', require('@/api'));

(async () => {
  // Redis 연결
  await redisClient.connect();

  // 서버 시작
  app.listen(config.app.port, config.app.host, () => {
    console.log(`Server:${process.env.NODE_APP_INSTANCE || 0} Running on ${config.app.host}:${config.app.port} By ${process.env.NODE_ENV} Mode`);
  });
})();
