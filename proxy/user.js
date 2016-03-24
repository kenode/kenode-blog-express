'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var Promise = require('bluebird');
var moment = require('moment');
var models = require('../models');
var dataTypes = require('../datatypes');
var tools = require('../common/tools');
var User = models.User;
var userProxy = Promise.promisifyAll(this);

/**
 * 创建新用户
 * @param {Object} info
 * @param {Function} callback
 */
exports.newAndSave = function (info, callback) {
  var data = dataTypes.User(info);
  var user = new User(data.info);
  user.save(function (err, doc) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, doc);
    }
  });
}

/**
 * 用户名查找用户
 * @param {String} username
 * @param {Function} callback
 */
exports.findByName = function(username, callback) {
  User.findOne({
    username: username
  }, callback);
};

/**
 * 用户ID查找用户
 * @param {String} uid
 * @param {Function} callback
 */
exports.findById = function(uid, callback) {
  User.findOne({
    _id: uid
  }, callback);
};

/**
 * 校对密码
 * @param {Function} info
 * @param {Function} callback
 */
exports.validPassword = function(info, callback) {
  var encrypt = crypto.createHash('sha1').update(info.pwd + '^' + info.salt).digest('hex');
  callback(null, encrypt === info.encrypt ? true : false);
};

/**
 * 验证登录
 * @param {Object} info
 * @param {Function} callback
 */
exports.loginValid = function(info, callback) {
  userProxy.findByNameAsync(info.username)
    .then(function (doc) {
      if (!doc) {
        tools.error(1001);
      }
      return userProxy.validPasswordAsync({
        pwd: info.password,
        encrypt: doc.password,
        salt: doc.salt
      });
    })
    .then(function (valid) {
      if (!valid) {
        tools.error(1002);
      }
      return userProxy.updateByNameAsync(info.username, {
        token_key: tools.random(32),
        token_time: moment().add(15, 'minutes'),
        update_at: moment()
      })
    })
    .then(function (_doc) {
      var ds = {
        token_key: _doc.token_key,
        token_time: moment(_doc.token_time).format('x'),
        username: _doc.username,
        email: _doc.email,
        uid: _doc._id,
        update_at: moment(_doc.update_at).format('x'),
        create_at: moment(_doc.create_at).format('x'),
        user_type: _doc.user_type
      };
      callback(null, ds);
    })
    .catch(function (err) {
      callback(err);
    });
};

/**
 * 依据用户名更新数据
 * @param {String} username
 * @param {Object} data
 * @param {Function} callback
 */
exports.updateByName = function(username, data, callback) {
  User.findOne({
    username: username
  }, function(err, user) {
    if (err || !user) {
      return callback(err);
    }
    user = _.assign(user, data);
    user.save(callback);
  })
};

// 清除所有数据
exports.removeAll = function (callback) {
  User.remove(function (err, doc) {
    callback(err, doc);
  })
};

// passport-loacl
exports.localStrategy = function (info, callback) {
  userProxy.loginValidAsync(info)
    .then( function (_doc) {
      var user = _.pick(_doc, ['email', 'uid', 'username', 'create_at', 'update_at']);
      return callback(null, user);
    })
    .catch(tools.myError, function () {
      return callback(null, false, { message: 'Incorrect username Or password.' });
    })
    .catch( function (err) {
      return callback(err);
    });
};
