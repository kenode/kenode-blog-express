'use strict';

var sign = require('../controller/sign');

exports.adminRequired = function (req, res, next) {
  if (!req.user) {
    return sign.signInPage(req, res);
  }
  next();
};