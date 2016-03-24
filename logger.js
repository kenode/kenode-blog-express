'use strict';

var config = require('../config');
var log4js = require('log4js');
var path = require('path');
var fs = require('fs');

var _basename = process.cwd();
var _dirname = 'logger';
var logpath = path.join(_basename, _dirname);

if (!fs.existsSync(logpath)) {
  fs.mkdirSync(logpath);
};

log4js.configure({
  appenders: [
    {
      type: 'console'
    },
    {
      type: 'file',
      filename: path.join(_basename, _dirname, config.logger.filename),
      maxLogSize: config.logger.maxlogsize * 1024,
      backups: 3,
      category: config.logger.category
    }
  ],
  replaceConsole: true
});

var logger = log4js.getLogger(config.logger.category);
logger.setLevel('INFO');

module.exports = logger;