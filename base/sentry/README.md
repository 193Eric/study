### 性能、错误监控方案
#### 性能监控

前端性能监控指标  

 - 白屏时间：用户从打开页面开始到页面开始有东西呈现为止；

 - 首屏时间：用户浏览器首屏内所有内容都呈现出来所花费的时间；

 - 用户可交互时间：用户可以进行正常的点击、输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作；

 - 总下载时间：页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间。


性能监控工具

 1.非侵入式（通过运行外部插件监控项目的形式） 
 
 - pagespeed（谷歌开发的分析优化网页工具）
 - Yslow （是Yahoo发布的一款基于FireFox的插件）
 - WebPagetest（网上开源项目）
 
 2.侵入式

 - Performance （是前端性能监控的API。它可以检测页面中的性能，W3C性能小组引入进来的一个新的API，它可以检测到白屏时间、首屏时间、用户可操作的时间节点，页面总下载的时间、DNS查询的时间、TCP链接的时间等）


#### 错误监控

Sentry 简介

Sentry 是一个开源的实时错误报告工具，支持 web 前后端、移动应用以及游戏，支持 Python、OC、Java、Go、Node、Django、RoR 等主流编程语言和框架 ，还提供了 GitHub、Slack、Trello 等常见开发工具的集成。

Sentry有网上的收费版本，如果不想购买，可以在自己服务器上搭建一个，sentry是开源代码。

Sentry 安装

sentry的话建议用docker安装，方便快捷，开源代码现在也是主推docker安装

github:https://github.com/getsentry/sentry

1.安装docker

`sudo yum -y install docker-io`

2.启动docker

`service docker start`

3.安装Docker-compose:
```
curl -L https://github.com/docker/compose/releases/download/1.9.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
4.克隆 git clone https://github.com/getsentry/onpremise.git 按照remind.md 一步步操作

如果执行过程中一切正常的话，在浏览器中输入http://ip:9000 就进入 Sentry 的登录页面了，使用上面创建的管理员用户名和密码登录系统。



![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023113222311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

---

