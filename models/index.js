'use strict';

var mongoose = require('mongoose');
var util = require('util');
var config = require('../config').db;
var logger = require('../common/logger')

mongoose.connect(config.uri, {
  server: { poolSize: 20 }
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.uri, err.message);
    process.exit(1);
  }
});

function model (name) {
  return mongoose.model(util.format('%s%s', config.perfix, name), require('./' + name));
}

exports.User = model('user');