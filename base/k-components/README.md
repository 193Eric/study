### CI/CD云端构建发布

GitLab CI/CD 是一个内置在GitLab中的工具，用于通过持续方法进行软件开发：

 - Continuous Integration (CI)  持续集成
 - Continuous Delivery (CD)     持续交付
 - Continuous Deployment (CD)   持续部署

软件开发的持续方法基于自动执行脚本，以最大程度地减少在开发应用程序时引入错误的机会。从开发新代码到部署新代码，他们几乎不需要人工干预，甚至根本不需要干预。 



#### GitLab CI/CD 是如何工作的？

使用GitLab CI/CD，你需要一个托管在GitLab上的应用程序代码库，并且在根目录中的`.gitlab-ci.yml`文件中指定构建、测试和部署的脚本。  

一旦你已经添加了.gitlab-ci.yml到仓库中，GitLab将检测到该文件，并使用名为**GitLab Runner**的工具运行你的脚本。  

.gitlab-ci.yml文件告诉GitLab Runner要做什么。一个简单的管道通常包括三个阶段（Stage）：build、test、deploy

- GitLab CI/CD 是通过 GitLab Runner 来执行的

- GitLab CI/CD 将按照 Stage 定义的顺序来执行，任何一个 Stage 失败，整个 CI/CD 将失败

- 每一个 Stage 可以被若干个 Job 关联。Stage 在执行的时候，关联到这个 Stage 的所有 Job 都将被执行，不过不同的 Job 可能是并行执行的。

- 每个 Job 在执行的时候，会先按照缓存策略加载缓存数据，然后按照顺序依次运行

> ps: 这里解释下webhook 和gitlab-runner的差别，webhook方式是我们主动配置了一个连接给gitlab；gitlab-runner只要注册一下就好了

#### GitLab CI/CD 工作流程


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022163842935.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

当我们写好代码之后通过git push到gitlab仓库，然后gitlab根据代码中的`.gitlab-ci.yml`文件的要求触发了gitlab-runner的操作，gitlab-runner帮我们测试代码，打包，全部通过之后，推送到代码仓库，然后通知生产服务器拉取最新代码。



#### 安装gitlab 
所需配置：

centos 服务器
至少2g内存不然会卡

gitlab 安装：
```
yum install -y git 安装git

yum install -y http://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-12.5.6-ce.0.el7.x86_64.rpm

rpm -i gitlab-ce-12.5.6-ce.0.el7.x86_64.rpm

ps:如果出现安装失败，提示：policycoreutils-python is needed by gitlab-ce-12.5.6-ce.0.el7.x86_64.rpm

yum install policycoreutils-python

// 然后修改配置文件

vim  /etc/gitlab/gitlab.rb 

`external_url`后面的链接改为`http://localhost`

```
重置并启动GitLab

执行：

gitlab-ctl reconfigure

gitlab-ctl restart


然后访问 ip就可以了，默认安装在80端口，如果需要换端口，参考文章[https://cloud.tencent.com/developer/article/1139779](https://cloud.tencent.com/developer/article/1139779)`，这里有详细的修改教程，亲测过了~。


#### 安装gitlab-runner
GitLab Runner 安装：
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash
// 添加runner官方库
sudo yum install -y gitlab-ci-multi-runner
```

GitLab Runner 注册：

首先要先获取gitlab-ci的Token:  

输入：`gitlab-runner register`

1.Please enter the gitlab-ci coordinator URL (输入入Gitlab CI地址):  
 图片中的url
2.Please enter the gitlab-ci token for this runner(输入项目CI token):  
登录刚刚安装的gitlab，gitlab->setting->OverView->runner 可以看到token  ，图片中的token
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020102218071615.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


3.Please enter the gitlab-ci description for this runner(输入 Runner 描述):  
	
4.Please enter the gitlab-ci tags for this runner (comma separated)(输入 Runner 标签，可以多个，用逗号隔开):  
  这里的tag，是为了识别不同的runner。**这里tag配置一下，以后会用到**
  
5.Please enter the executor: shell, ssh, virtualbox, docker+machine, kubernetes, custom, docker, parallels, docker-ssh, docker-ssh+machine(输入 Runner 执行的语言):  
shell **选择执行器，这里选shell**


配置完之后 OverView->runner下面可以看到刚刚注册过的runner，这样一个runner就注册成功了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022180904533.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


下面我们需要的是新建一个项目，同时配置yml文件。

以vue-cli创建的项目为例子，写一个.yml文件

```

stages: # 定义的两个流程，一个是拉依赖，一个是打包
  - install_deps
  - build

cache: # 缓存
  paths:
    # 缓存node_mudules将大大提高ci运行的速度
    - node_modules/
    - dist/

job_install_deps: # 定义一个安装依赖job
  stage: install_deps
  # 匹配使用哪个tag的runner(注册时填写的)
  tags:
    - help-man
  only:
    - develop
    - master
  script:
    - npm install

job_build: # 必须定义一个名为 job_build 的 job
  stage: build
  tags:
      - help-man
  script:
    - npm ci
    - npm run build
  only:
    - develop
    - master

```

然后我们push到gitlab仓库 ，点开该项目的CI/CD，就可以看到GitLab CI/CD开始工作了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022181215978.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
同时我们还能在job里面看到它的终端运行情况（和本地终端的显示一样）。

好了，这里 一个完整的GitLab CI/CD 完成了。

