## 如何构建一个高可用的node环境

主要解决问题：

- 故障恢复
- 多核利用
- 多进程共享端口

项目源码和更多案例放在[github](https://github.com/193Eric/blog)上面，欢迎star.  

---

### cluster （集群）

cluster可以多核监听同一个端口。实现多进程共享端口，这个在node底层已经做好了。

**folk（child_process.fork）方式不能实现多进程共享端口,还需要nginx去做多个端口的负载均衡，一般来说用cluster要好点，folk方式适用与多个程序之间。**

建立一个cluster.js文件

```
var cluster = require('cluster'); //cluster库
var os = require('os'); // 获取CPU 的数量
var numCPUs = os.cpus().length;
var process = require('process') // 管理进程用的

console.log('numCPUs:', numCPUs) // 打印cpu数量 ①
var workers = {};
if (cluster.isMaster) { // 这里是进入主进程，第一次启动的时候，运行这里
    // 主进程分支
    cluster.on('death', function (worker) { ②
        // 当一个工作进程结束时，重启工作进程 delete workers[worker.pid]; 这里主要是为了让代码即使报错，也不会影响服务器运行。故障恢复
        worker = cluster.fork();
        workers[worker.pid] = worker;
    });
    // 初始开启与CPU 数量相同的工作进程  多核利用 ③
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork(); // 复制进程，有多少个核，复制多少个子进程,复制的过程会重新运行一遍该文件（因为是复制进程，代码也会复制份在子进程运行）。
        workers[worker.pid] = worker;
    } 
} else { // 这里是子进程开启的时候，就是主进程folk之后，会走到这里。所以这里会启动与cpu相同数量的子进程服务。
    // 子进程启动服务器，多进程共享3000端口 ④
    var app = require('./app');
    app.use(async (ctx, next) => {
        console.log('worker' + cluster.worker.id + ',PID:' + process.pid)
        next()
    })
    app.listen(3000);
}

// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function () { ⑤
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});


```

直接看代码，这样看可能看不太懂。我们用一个流程图来展示。我在上面代码标记了①-⑤ ,5个代码块，假设本机是双核cpu的。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109164619230.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
这里看运行情况，启动后，打印了5次cpu数量（主进程一次，子进程4次），①这段代码执行了5次。  

然后我们通过访问localhost:3000,得到当前访问的是第三子进程。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109164545122.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

---

### 更优雅的部署node (pm2)

- 内建负载均衡(使⽤用Node cluster 集群模块、子进程)
- 线程守护，keep alive
- 0秒停机重载，维护升级的时候不不需要停机.
- 现在 Linux (stable) & MacOSx (stable) & Windows (stable).多平台⽀支持
- 停⽌止不不稳定的进程(避免⽆无限循环)
- 控制台检测 https://id.keymetrics.io/api/oauth/login#/register
- 提供 HTTP API

命令行部署方法：

```
 
npm install -g pm2
pm2 start app.js --watch -i 2 // watch 监听⽂文件变化
// -i 启动多少个实例例
pm2 stop all
pm2 list
pm2 start app.js -i max # 根据机器器CPU核数，开启对应数⽬目的进程
 
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201110154350270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

process.yml文件部署方法：

```
 
apps:
  - script : app.js
    instances: 2
    watch  : true
    env    :
      NODE_ENV: production
      
```
运行`pm2 start  process.yml`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201110154526738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
pm2设置为开机启动 `pm2 startup`

可以看到两种方式的效果是一样的，但是大多会选择以yml文件来启动。

---

### docker概念
- Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口
- 1）提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
- 2）提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
- 3）组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。
- 4）image可以创建容器，每个容器有自己的容器端口，我们需要把它映射到主机端口
- 5）Docker Compose是 docker 提供的一个命令行工具，用来定义和运行由多个容器组成的应用。使用 compose，我们可以通过 YAML 文件声明式的定义应用程序的各个服务，并由单个命令完成应用的创建和启动。

特点

- ⾼高效的利利⽤用系统资源
- 快速的启动时间
- 一致的运⾏行行环境
- 持续交付和部署
- 更更轻松的迁移

对⽐传统虚拟机总结
|  特性   | 容器器  |虚拟机  |
|  ----  | ----  |----  |
| 启动  | 秒级 | 分钟级  |
| 硬盘使⽤  | 一般为 MB | 一般为 GB  |
| 性能  | 接近原⽣ | 弱于  |
| 系统支持量  | 单机⽀持上千个容器 | 一般⼏十个  |
 
 
三个核⼼心概念

- 镜像 
- 容器器 
- 仓库


和pm2类似，docker也有两种方式启动，一种是命令行方式，一种是Dockerfile定制镜像方式。

DockerFile参数 : 

|  FROM   | MAINTAINER  | RUN |  ADD&COPY   | WORKDIR  | VOLUME | EXPOSE|
|  ----  | ----  | ----  | ----  | ----  | ----  | ----  | ----  |
| 它依赖什么镜像  | 维护者信息 | 执行命令行命令| 复制文件到指定路径（ADD能解压） | 指定工作目录 | 目录挂载 | 容器的端口 |

常用的doker命令：  

 - 查看docker版本:docker version  
  
 - 显示docker系统的信息:docker info  
  
 - 检索image:docker search image_name  
  
 - 下载image  : docker pull image_name  
  
 - 已下载镜像列表: docker images  
  
 - 删除镜像: docker rmi image_name  

 - 启动容器:docker run image_name


#### docker构建一个nginx服务器

 1. 拉取官⽅方镜像
 ```
	拉取官⽅方镜像 
	docker pull nginx
	查看镜像
	docker images nginx
    启动镜像
    docker run -p 80:80  -d nginx
    查看进程
	docker ps
	docker ps -a // 查看全部
	停⽌
	docker stop id
	删除镜像
	docker rm id
 ```
 2. Dockerfile定制镜像

```
#Dockerfile
FROM nginx:latest
RUN echo '<h1>Hello, docker</h1>' > /usr/share/nginx/html/index.html
```
```
 
# 定制镜像
docker build -t mynginx .
# 运⾏
# -d 守护态运⾏
docker run -p 80:80 -d mynginx

```




####  Docker-Compose
> Docker-Compose项目是Docker官方的开源项目，负责实现对Docker容器集群的快速编排。
Docker-Compose将所管理的容器分为三层，分别是工程（project），服务（service）以及容器（container）。Docker-Compose运行目录下的所有文件（docker-compose.yml，extends文件或环境变量文件等）组成一个工程，若无特殊指定工程名即为当前目录名

docker-compose主要是可以集合多个服务，一起运行。比如一个项目有（前端、后台、数据库、nginx）4个服务需要去启动，如果单独去启动的话，我们需要运行4次docker。这里我们能通过docker-compose，一起运行。

案例：nginx+node+pm2后台

nginx：

在nginx文件夹里，里面建立个conf.d文件夹。添加一个docker.conf文件

```
## nginx/conf.d/docker.conf

server {
    listen       80;
    location / {
        root   /var/www/html;
        index  index.html index.htm;
    }
    location ~ \.(gif|jpg|png)$ {
        root /static;
        index index.html index.htm;
    }
    location /api {
            proxy_pass  http://127.0.0.1:3000;
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}

```

node：

```
 // app.js
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    ctx.body = 'Hello Docker'
})
app.listen(3000, () => {
    console.log('app started at http://localhost:3000/')
})

// process.yml

apps:
  - script : server.js
    instances: 2
    watch  : true
    env    :
      NODE_ENV: production


// Dockerfile

#Dockerfile
#制定node镜像的版本
FROM node:10-alpine
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 3000
#程序启动脚本
CMD ["pm2-runtime", "start",  "process.yml"]
```

然后构建docker-compose.yml

```
## docker-compose.yml

version: '3.1'
services:
  app-pm2:
      container_name: app-pm2
      #构建容器
      build: ./node 
      ports:
        - "3000:3000"
  nginx:
    restart: always
    image: nginx
    ports:
      - 80:80
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d/  #本地配置文件写入到nginx配置目录
      - ./www/:/var/www/html/ 
```

然后创建一个www文件夹里面放一个静态html文件

```
//index.html

hello web!! 

```

可以看到在docker-compose文件里面，我们运行了两个镜像，一个是打包后的node名为app-pm2的镜像，一个是nginx的镜像。 
同时我们把nginx的配置文件从本地写到了docker运行的nginx目录里面。现在我们来看运行效果：

输入：` docker-compose up -d` 后台启动命令。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111116230168.png#pic_center)
可以看到，两个容器都被创建。现在我们先访问80端口（nginx映射在80端口）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111162434400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
访问成功，成功访问到www/index.html![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111162611618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
然后我们访问/api路径，看是否能访问到node服务器。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111116313679.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
访问成功。这里一个docker-compose的案例就成功运行了。里面用了nginx反向代理3000端口接口到80端口/api路径，同时用了pm2去启动node接口服务器。


项目搭建好之后，就需要持续集成了，这里具体请参考我之前写的文章。[Gitlab-CI/CD云端构建发布]('https://ericli.blog.csdn.net/article/details/109185041')