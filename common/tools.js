'use strict';

var _ = require('lodash');
var crypto = require('crypto-js');
var moment = require('moment');
var errcode = require('./error');
var config = require('../config');
var encrypt = config.encrypt;

var ran_len = 6;
var ran_str = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';

exports.random = function () {
  var arg = _.zipObject(['len', 'char'], Array.prototype.slice.call(arguments));
  var str_num = typeof arg['len'] === 'number' ? arg['len'] : ran_len;
  str_num = typeof arg['len'] === 'object' ? _.random(arg['len'][0], arg['len'][1]) : str_num;
  var chars = typeof arg['len'] === 'string' ? arg['len'] : ran_str;
  chars = typeof arg['char'] === 'string' && typeof arg['len'] !== 'string' ? arg['char'] : chars;
  var str_arr = chars.split("");
  var r_num = str_arr.length;
  var str = '';
  for (var i = 0; i < str_num; i++) {
    var pos = Math.floor(Math.random() * r_num);
    str += chars[pos];
  }
  return str;
};

exports.error = function(code) {
  var o = _.find(errcode, { code: code });
  var e = new Error();
  e.code = o.code;
  e.message = o.message;
  throw e;
};

exports.myError = function(e) {
  return e.code > 1000;
};

exports.formatDate = function (date, friendly) {
  date = moment(date);
  if (friendly) {
    return date.fromNow();
  }
  else {
    return date.format('YYYY-MM-DD HH:mm');
  }
};