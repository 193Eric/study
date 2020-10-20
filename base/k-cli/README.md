# 前端大基建

>“基建”，就是研发团队的技术基础设施建设，是一个团队通用技术能力的沉淀，是一个团队未来的保证。网上看到的一句话，说的很好，“业务支撑是活在当下，技术基建是活好未来”。


## 基建的意义在哪里 ？

基建的搭建有三个要素去确定：公司的团队规模、公司的业务、团队水平。根据不同的环境来搭建不同"重量"的基建系统。

对我们开发来说，技术之所以有价值，是因为技术最终是为了解决业务问题。搞基建主要是为了以下几点：

- 提高效率，基建可以提高单个人的工作产出和工作效率，可以从代码层面解决一些普遍性和常用性的业务问题
- 优化流程制度，优异的流程制度必将带来正面的、积极的、有实效的业务支撑
- 更好的面对未来的业务发展，像建房子一样，好的地基可以建出万丈高楼
- 影响力建设和团队的技术沉淀，一个好的技术团队，是一个公司的实力象征




---
  
## 前端基建链路层
> 基建的内容和业务阶段团队既有建设的沉淀是分不开的，所以基建就是从最基础的部分开始搞，怎么样能规范流程，方便开发，方便维护，怎样 能更加优雅的扩展业务，就怎么去搞基建。

接下来我们以“**基建链路层**”来搭建基建系统，下面是我所整理的基建链路层：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020114014451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

###  项目初始化
谈到基建，最基础的就是脚手架init，每个公司都有自己的项目架构，很多新建的项目，都会按照现有项目的架构，进行扩展或者删减，但大致变化不会太大。

用Node创建一个自己的（Webpack， vue）项目的CLI工具，包括以下几个功能：

- 定制命令行界面
- github上面存放一个模板项目，并且clone
- 自动安装依赖
- 发布脚手架

假设公司项目就这些功能架构，这样新项目完全可以做到开箱即用，只用通过一些命令行选择就能创建一个现有架构的新项目。这里我们就创建一个简单的基础的脚手架，如果还想要什么功能，可以按照这种模式去添加，本质是用node去操作文件。

以下是这个简易cli工具的项目图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020163120846.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


#### 创建一个启动入口
创建一个bin文件夹 里面创建`k-cil.js`启动文件。
```
#! /usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version)

program
      .command('init <name>')
      .description('init project name')
      .action(require('./../lib/init'))
      
program.parse(process.argv)
```
这段代码是创建一个需要输入初始项目名称命令的命令行界面  

其中commander包是主要工具，这个包主要是提供人机交互的命令。
- command （用户输入的，<>里面是参数）
- description （-help命令里面的描述）
- aciton （这段输入之后，Node进行的行为，可以理解为函数调用）

*最重要的一点就是 第一句 #!/usr/bin/env node*
这句代码不可以没有，整体的意思就是说会有一个新的shell执行指定的脚本，执行这个脚本的解释程序是node，
如果不加这句代码的话是会报错的

#### 命令行界面
下面我们来分析下，所需要添加的行为函数。

```
// lib/init.js

const {promisify} = require('util')
 
const figlet = promisify(require('figlet')) // 图形，本身是一个回调方法，所以才用promisify来加工

const clear = require('clear') // 清屏

const path = require('path')

const chalk = require('chalk') // 文字修饰

const clone = require('./download')

const log = content =>{
  console.log(chalk.blue(content))
}

module.exports = async name =>{
  // 欢迎界面
  clear()

  const data = await figlet('Welcome To K-cli')

  log(data)

  // 克隆远程模板项目
  
  await clone("github:193Eric/vue-template", path.resolve(process.cwd())+'/'+name)

  log(`模板下载成功！`)
}
```

这段代码是创建一个命令行界面，通过`figlet`、`chalk`来美化界面，并且在里面添加了一些我们需要cli工具去做的行为，克隆模板之类的，类似的还可以加别的行为。

以下是输入命令`node bin/k-cli init projiect `后界面的样子：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020164545125.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


#### 克隆远程仓库的模板项目

```
// lib/download.js
const {promisify} = require('util')

const download = promisify(require('download-git-repo'))

const ora = require('ora') // 修饰

const clone =  async (repo,desc)=>{
  const process = ora('下载中....... '+repo)
  process.start()
  await download(repo,desc)
  process.succeed()
}

module.exports = clone


```
这个代码是通过download-git-repo包来下载仓库项目。  
注意download接收两个参数。  
第一个参数是远程仓库地址，格式是`github:193Eric/vue-template`，先指明什么仓库，然后再是项目地址。  
第二个参数是下载的项目放在什么路径，一般会放在当前文件夹，`process.cwd()`可以得到当前文件夹路径，用它加上输入的项目名就会自动创建项目了。

#### 自动安装依赖

>ps: 由于安装依赖我们要用shell来触发npm install,在node里面我们想调用shell,一般都会子进程的`child_process`方式

```
// lib/init.js

const cProcessInstall = async (...args)=>{
  const {spawn} = require('child_process')
  return new Promise((resolve)=>{
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on("close",()=>{
      resolve()
    })
  })
}

// ....init内容

log(`安装依赖 等待安装...`)

await cProcessInstall('npm',['install'],{cwd:`./${name}`})

log(`🚀安装依赖完成！`)
```

这里用了node子进程的方式封装了一个promise，来异步调用安装依赖。这里面比较重要的就是pipe的操作，子进程完成之后输出都需要通过pipe来发送到主进程。


#### npm发布

- 首先我们创建一个npm的账号[npm官网]("https://www.npmjs.com/")  
- npm login 输入你的账号密码邮箱
- 然后登陆成功后 npm publish 推送

到这里就完成了一个简单的脚手架了。然后我们来测试一下  

```
// 全局安装一下
npm install eric-k-cli -g
// 按照之前的命令
k-cli init ericTest
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020164721571.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

这样一个简易的脚手架就成功了，由于是示例代码就放了两个简单的功能函数。 
在实际项目中我们还可以加入：

- 项目注入sentry监控
- 接入iconfont指定云包
- 接入rap接口管理
....

加油！打工人