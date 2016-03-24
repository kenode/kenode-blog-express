'use strict';

var _ = require('lodash');
var crypto = require('crypto');
var tools = require('../common/tools');

var userData = {
  username: '',
  password: tools.random(8),
  email: ''
};

module.exports = function(info) {
  var userObj;
  var password = info && info.password ? encryptPwd(info.password) : encryptPwd(userData.password);
  userObj = _.assign(userData, info);
  userObj.password = password.encrypt;
  userObj.salt = password.salt;
  return {
    info: userObj,
    original: {
      password: password.original
    }
  };
};

function encryptPwd(pwd) {
  var salt = _.random(100000, 999999).toString();
  var encrypt = crypto.createHash('sha1').update(pwd + '^' + salt).digest('hex');
  return {
    salt: salt,
    encrypt: encrypt,
    original: pwd
  }
}