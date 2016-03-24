'use strict';

var cookie = require('cookie');

exports.index = function (req, res, next) {
  var cookies = cookie.parse(req.headers.cookie);
  res.render('index', {
  	user: req.user,
  	cookies: cookies
  });
};