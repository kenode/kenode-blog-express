'use strict';

module.exports = {

	// 调试模式
	debug: true,

  // host
  host: '127.0.0.1',

  // 服务端口
  port: 3000,

  // session secret
  session_secret: 'kenode_blog_secret',

  // redis
  redis_host: '127.0.0.1',
  redis_port: 6379,

  // mongodb
  db: {
  	uri: 'mongodb://localhost:27017/kenode_blog',
  	perfix: 'kn_'
  },

  // logger
  logger: {
  	filename: 'access.log',
  	maxlogsize: 500,
  	category: 'kenode_blog',
  	format: ':method :url :status',
  	level: 'auto'
  }
  
};