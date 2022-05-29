/* eslint-disable no-param-reassign */
const sql = require('@/storage/pg');
const config = require('@/config');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2').Strategy;

// Local Strategy
passport.use('user.local', new LocalStrategy(
  {
    usernameField: 'user_id',
    passwordField: 'user_pw',
    session: false, // 세션 사용안함
  },
  async (userId, userPw, done) => {
    try {
      // userId, userPw로 사용자 인증 확인. 해당 값이 없으면 400 리턴
      const query = await sql`
      SELECT
        user_no,
        user_pw,
        state
      FROM users
      WHERE
        user_id = ${userId}
      `;

      if (query.length === 0) {
        // 없는 사용자
        return done(null, { error: true, state: -1, msg: 'User not found' }, {});
      }
      const user = query[0];

      const check = await bcrypt.compare(userPw, user.userPw);
      if (!check) {
        // 비밀번호 틀림
        return done(null, { error: true, state: -2, msg: 'Incorrect email or password' }, {});
      }

      if (user.state === 0) {
        // 비활성화된 사용자
        return done(null, { error: true, state: -3, msg: 'Disabled user' }, {});
      }

      // JWT 토큰 생성
      const token = jwt.sign({ user_no: user.user_no }, config.auth.jwtSecretUser, {
        expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
      });

      // 로그인 체크 성공
      return done(null, { token }, {});
    } catch (e) {
      // 로그인 확인 중 에러 발생 시
      console.error(e);
      return done(null, { error: true, state: 0, msg: 'Internal Error' }, {});
    }
  },
));

// JWT Strategy
passport.use('user.jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Bearer 인증 방식 사용
    secretOrKey: config.auth.jwtSecretUser,
  },
  async (jwtPayload, done) => {
    try {
      // JWT로 사용자 인증 확인

      // 필요시 유저 정보 조회하는 DB 쿼리 실행

      // 사용자 정보 조회 성공
      return done(null, jwtPayload);
    } catch (e) {
      // 사용자 인증 체크 중 에러 발생 시
      console.error(e);
      return done(null, { error: true, state: 0, msg: 'Internal Error' }, {});
    }
  },
));

passport.use('user.twitter', new TwitterStrategy(
  {
    clientID: config.twitter.clientId,
    clientSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackUrl
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 토큰 값 저장
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      
      console.log(profile)

      // eslint-disable-next-line no-shadow
      const user = await sql.begin(async (sql) => {
        // 기존에 존재하는 유저인지 확인
        const [user] = await sql`
        SELECT
          user_no,
          state
        FROM users
        WHERE
          user_provider = 'twitter'
          AND (user_provider_info ->> 'id') = (${profile.id})::text
        `;

        const userPw = await bcrypt.hash(profile._raw + config.auth.jwtSecretUser, config.auth.saltRounds);
        const userName = profile.displayName || null;

        if(user) {
          // 기존에 존재하는 유저면 유저정보 업데이트
          const [updatedUser] = await sql`
          UPDATE users SET
            user_pw = ${userPw},
            user_name = ${userName},
            user_provider_info = ${profile},
            updated_dt = now()
          WHERE
            user_no = ${user.user_no}
          RETURNING user_no, state
          `;
          return updatedUser;
        } else {
          // 새 유저일 경우 회원가입 처리 
          const [newUser] = await sql`
          INSERT INTO users (
            user_id,
            user_pw,
            user_name,
            user_provider,
            user_provider_info,
            state
          ) VALUES (
            ${profile.id},
            ${userPw},
            ${userName},
            'twitter',
            ${profile},
            1
          ) RETURNING user_no, state
          `;

          return newUser
        }
      });

      if (user.state === 0) {
        // 비활성화된 사용자
        return done(null, { error: true, state: -3, msg: 'Disabled user' });
      }

      // JWT 토큰 생성
      const token = jwt.sign({ user_no: user.user_no }, config.auth.jwtSecretUser, {
        expiresIn: config.auth.jwtExpireUser, // https://github.com/zeit/ms
      });

      // 로그인 체크 성공
      return done(null, { token }, {});
    } catch (e) {
      // 로그인 확인 중 에러 발생 시
      console.error(e);
      return done(null, { error: true, state: 0, msg: 'Internal Error' }, {});
    }
  },
));

module.exports = passport;