# webpack-vue-demo
webpack+vue+vueRouter+vuex+es6 构建的简单实例项目 

> github地址 https://github.com/193Eric/webpack-vue-vueRouter 

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^  

> 如果你觉得对你有帮助，可以点击folk，或者follow一下，我会不定时跟新一些有趣的东西.~~~ 0.0  


Vue很轻量，它写组件的方式非常舒服。代码风格也很干净。所以我用Vue写了一个demo.

为了帮助理解vuex，在demo中还运用了vuex来对底部Icon进行变化。

暂时只增加了6个功能，虽然是个小demo,不过能用上的技术，基本上都用上了，适合初学者学习。

Demo的主要功能有：

- 查询当日运势
- 搞笑图片  


##### 演示效果
 ---

![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page1.png)  

---
##### 环境
 1. node v6.10.1
 2. cnpm 4.5.0
 3. npm 3.10.10

##### 技术栈

> [vue]

> [vue-router]

> [vue-resource]

> [webpack]

> [es6-babel]

> [less]


### 目录结构
<pre>
.
├── README.md           
├── dist                     // 项目build目录
├── package.json             // 项目配置文件
├── src                      // 生产目录
│   ├── assets               // css js 和图片资源
│   ├── components           // 各种组件
│   ├── views                // 各种页面
│   ├── router.js            // 路由配置
│   └── app.vue              // 根组件
│   └── main.js              // Webpack 预编译入口         
├── index.html               // 项目入口文件
├── webpack.config.js        //webpack配置文件
├── .gitignore               //git忽略文件
</pre>
### 安装
项目地址：（使用`git clone`）

```shell
git clone https://github.com/193Eric/webpack-vue-vueRouter.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))，使用npm安装依赖模块可能会很慢，建议换成[cnpm](http://cnpmjs.org/)

```shell
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

```bash
# 安装依赖模块
cnpm install

npm run build

npm run dev


然后会自动弹出浏览器地址 http://localhost:8081
