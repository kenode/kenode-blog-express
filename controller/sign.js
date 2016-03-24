'use strict';

var cookie = require('cookie');
var Proxy = require('../proxy');
var Promise = require('bluebird');
var userProxy = Promise.promisifyAll(Proxy.User);
var Tools = require('../common/tools');
var _ = require('lodash');
var Passport = require('passport');

exports.signInPage = function (req, res) {
  if (req.user && req.route.path === '/signin') {
    return res.redirect('/');
  }
  var cookies = cookie.parse(req.headers.cookie);
  res.render('login', {
    user: req.user,
    cookies: cookies || {}
  });
};

exports.signIn = function (data, req, res, next) {
  Passport.authenticate('local', {
    badRequestMessage: '505 error'
  }, function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
        return res.json({code: 1003, data: null});
    }
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({code: 0, data: user});
    });
  })(req, res, next);
};

exports.signOut = function (req, res) {
  req.logout();
  return res.redirect('/');
}