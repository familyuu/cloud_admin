/**
 * config
 */

var config = {
  debug: true,

  // mongodb 配置
  DBPath: '/usr/local/src/',

  // 程序运行的端口
  port: 3000,

  //Express CORS config
  corsOptions: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'csrf-token'],
    exposeHeaders: 'csrf-token',
    credentials: true,
    maxAge: 1728000,
    optionsSuccessStatus: 200,
    // "preflightContinue": false
  },

  //CSRF config
  csurfOptions: {
    cookie: {
      path: '/api',
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  },
};

module.exports = config;
