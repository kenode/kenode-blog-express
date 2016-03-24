'use strict';

var express = require('express');
var config = require('./config');
var controller = require('./controller');
var sign = require('./controller/sign');
var policiesSign = require('./policies/sign');

var auth = require('./middlewares/auth');
var manager = require('./controller/manager');

var router = express.Router();

// 前台
router.get('/', controller.index);  // 首页
router.get('/signin', sign.signInPage);  // 登录页面
router.post('/signin', policiesSign.signIn, sign.signIn);  // 登录验证
router.get('/signout', sign.signOut);  // 登出

// 后台
router.get(config.manager, auth.adminRequired, manager.index);


module.exports = router;