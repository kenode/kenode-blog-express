'use strict';

var validator = require('validator');


exports.signIn = function (req, res, next) {
  console.log(req.body);
  var data = {
    username: req.body.username.replace(/\s/, '') || '',
    password: req.body.password || ''
  };
  if (validator.isNull(data.username) || validator.isNull(data.password)) {
    return res.json({
      code: 1003,
      data: null
    });
  }
  return next(data);
}