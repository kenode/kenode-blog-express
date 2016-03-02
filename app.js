'use strict';

var config = require('./config');
var express = require('express');
var log4js = require('log4js');
var path = require('path');
var errorhandler = require('errorhandler');
var swig = require('swig');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compress = require('compression');
var RedisStore = require('connect-redis')(session);

var logger = require('./common/logger');
var webRouter = require('./web_router');

var app = express();
var _basename = process.cwd();

// logger
app.use(log4js.connectLogger(logger, {
  level: config.logger.level,
  format: config.logger.format
}));

// views
app.set('views', path.join(_basename, 'views'));
app.set('view engine', 'html');
app.engine('.html', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });

// method override
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(methodOverride());

// cookie
app.use(cookieParser(config.session_secret));

// compress
app.use(compress());

// session
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
  }),
  resave: true,
  saveUninitialized: true
}));


// static
var staticDir = path.join(_basename, 'public');
app.use(express.static(staticDir));

// routers
app.use('/', webRouter);

// 404
app.use('*', function (req, res) {
  logger.error('status:404; url:', req.originalUrl);
    return res.status(404).send('404 not page');
});

// error handler
if (config.debug) {
  app.use(errorhandler());
}
else {
  app.use(function (err, req, res, next) {
    logger.error('server 500 error: ', err);
    return res.status(500).send('500 status');
  });
}

// run app
var urlInfo = require('url').parse(config.host);
config.hostname = urlInfo.hostname || config.host;
if (!module.parent) {
  app.listen(config.port, config.hostname, function () {
    logger.info('Kenode Blog listening on port', config.port);
    logger.info('God bless love....');
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
    logger.info('');
  });
}

module.exports = app;


/*

console.log(process.cwd());
var isProduction = process.env.NODE_ENV === 'production';
*/