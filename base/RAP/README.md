###  接口联调
说到接口联调，我们是经历三个时代的演变。  

1、石器时代

团队评审完需求，前端开始做静态页面，后端开始写接口。等两边都写完之后，后端给出接口，前端一个个接入。  

尿点：无法合理利用两个人时间，浪费联调接口时间

2、青铜时代

mock的引入，解决了石器时代的痛点。  
后端先设计接口，抛出接口文档，前端引入mock.js，做好项目后，直接无缝衔接后端接口。

尿点：每次前端都要复写一份后端的接口文档，到本地。mock数据结构一多，分了很多模块，不好管理（毕竟后端也维护了一份）且本地代码厚重


3、白银时代

Rap平台，RAP（基于Mock.js）是一个新的解决方案，将前端后端拉倒一个团队仓库中，共享一个仓库，无论是URL地址，还是请求需要的参数，在团队仓库中双方都可以管理，并且可以记录团队成员修改了哪些接口。解决了青铜时代所面临的问题

现在我们用Rap的方式，来处理接口联调。

github有提供 RAP的开源代码和release下载 [https://github.com/thx/RAP/releases](https://github.com/thx/RAP/releases)。我们可以部署一个RAP服务在我们本地服务器。

具体的RAP流程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020172657352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
#### centos安装RAP

##### 安装基础软件
wget http://repo.mysql.com/yum/mysql-5.6-community/el/7/x86_64/mysql-community-libs-5.6.26-2.el7.x86_64.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install -y mysql-server nginx tomcat unzip redis
下载war包

wget http://rap.taobao.org/release/RAP-0.14.0-SNAPSHOT.war
解压至ROOT

unzip -x RAP-0.14.0-SNAPSHOT.war -d ROOT

##### 配置数据库
创建数据库及用户
```
create database rap_db default charset utf8 COLLATE utf8_general_ci;
grant all on rap_db.* to 'rap'@'localhost' IDENTIFIED BY 'password';
flush privileges;
```
初始化数据库,输入刚才创建用户的密码

`mysql -u rap -p rap_db < ROOT/WEB-INF/classes/database/initialize.sql`
配置应用中数据库连接

`vi ROOT/WEB-INF/classes/config.properties `
修改为刚才创建的数据库用户名及密码
```
jdbc.username=rap
jdbc.password=password
```

其中redis配置可根据需求更改

启动redis
`systemctl  start redis`

配置tomcat
`sudo cp -rf ROOT /var/lib/tomcat/webapps`
`sudo chown -R tomcat. /var/lib/tomcat/webapps/ROOT`

重启tomcat
`systemctl restart tomcat`

##### 配置nginx
在/etc/nginx/conf.d 中添加如下配置 rap.conf

注意: 将其中的xxxx替换为你的本机ip地址或者域名
```
server {
        listen        80;
        server_name   xxxxx;            #本机IP或者域名
        access_log    /var/log/nginx/rap_access.log;
        charset           utf-8;
        autoindex off;

        location /{
            proxy_pass   http://localhost:8080;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        }
}
```
重启nginx
`systemctl restart nginx`

##### 配置防火墙
`firewall-cmd --permanent --add-service=http`
`firewall-cmd --reload`
##### 访问
访问http://ip地址或者域名
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020184432523.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


为什么信赖RAP？

 - 企业级应用，包括阿里集团在内得350多个企业都在使用RAP管理重要的接口文档。

 - 快速高效的技术支持，持续的更新，去Issues看一看就知道有多热闹。

 -  免费、开源，一切尽在掌握中！