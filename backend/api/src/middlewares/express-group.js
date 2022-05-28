const express = require('express');

// 라우트 그룹 지정
function group(a, b, c) { // path, middleware, route list
  const router = express.Router();

  if (typeof a === 'string' && typeof c === 'function') {
    // path, middleware, route list
    this.use(a, Array.isArray(b) ? b : [b], router);
    c(router);
  } else if (typeof a === 'string' && typeof b === 'function') {
    // path, route list
    this.use(a, [], router);
    b(router);
  } else if (typeof a !== 'string' && typeof b === 'function') {
    // middleware, route list
    this.use('', Array.isArray(a) ? a : [a], router);
    b(router);
  }

  return router;
}

express.application.group = group;
express.Router.group = group;
