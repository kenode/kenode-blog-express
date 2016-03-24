'use strict';

var _ = require('lodash');
var promise = require('bluebird');
var config = require('./config');
var userProxy = promise.promisifyAll(require('./proxy/user'));

userProxy.removeAllAsync()
  .then( function (doc) {
    console.log(doc.result);
    console.log(config.admin);
    return userProxy.newAndSaveAsync(_.assign(config.admin, {
      user_type: 9999
    }));
  })
  .then( function (doc) {
    console.log(doc);
    process.exit(0);
  })
  .catch( function (err) {
    console.log(err);
    process.exit(0);
  });