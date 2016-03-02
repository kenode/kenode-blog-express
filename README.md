# Kenode Blog

## `PM2` 开机自启动

生成启动脚本
```bash
$ pm2 startup centos
```

赋予权限
```bash
$ chmod +x /etc/init.d/pm2-init.sh
```

加入启动项
```bash
chkconfig --add pm2-init.sh
```

重启服务器，执行
```bash
$ pm2 resurrect
```

命令集
```bash
$ service pm2-init.sh {start|stop|status|restart|reload|force-reload}
```

## `Nginx` 代理

添加 `nginx` 配置
```conf
server
{
	listen       80;
	server_name: xxx.com;
	index        index.html index.htm default.html default.htm;
	root         /srv/nodejs/kenode-blog-express/public;
	location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
	{
		expires          30d;
	}
	location ~ .*\.(js|css)$
	{
		expires          12h;
	}
	location / {
		proxy_pass       http://127.0.0.1:3000;
	}
}
```


## 部署 `alinode`

安装 `tnvm`
```bash
$ cd ~ && wget -qO- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash
```

为 `tnvm` 添加环境变量
```bash
$ source ~/.bashrc
```

查看 `alinode`
```bash
$ tnvm ls-remote alinode
```

安装 `alinode` 的一个版本
```bash
$ tnvm install alinod-v1.5.0
```

使用`alinode` 的一个版本
```bash
$ tnvm use alinod-v1.5.0
```

查看是否为 `alinode` 的版本
```bash
$ node -p 'process.alinode'
```

编辑 `~/.bashrc`
```bash
$ vi ~/.bashrc
```

添加两个环境变量
```
export ENABLE_NODE_LOG=YES
export NODE_LOG_DIR=/tmp/
```

安装命令集
```bash
$ cd /srv/alinode && git clone https://github.com/aliyun-node/commands.git
```

部署 `AgentX`
```bash
$ npm install agentx -g
```

编辑 `./alinode.json`
```json
{
  "server": "120.55.151.247:8080",
  "appid": "您的应用ID",
  "secret": "您的应用Secret",
  "heartbeatInterval": 60,
  "reconnectDelay": 10,
  "reportInterval": 60,
  "logdir": "/tmp/",
  "cmddir": "/srv/alinode/commands",
  "error_log": [
    "/root/.logs/error.#YYYY#-#MM#-#DD#.log"
  ]
}
```

启动 `Afentx`
```bash
$ nohup agentx /srv/nodejs/kenode-blog-express/alinode.json &
```
