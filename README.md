# webpack-vue-demo
webpack+vue+vueRouter+vuex+es6 构建的简单实例项目 
  
> github地址 https://github.com/193Eric/webpack-vue-vueRouter 

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^  

> 如果你觉得对你有帮助，可以点击folk，或者follow一下，我会不定时跟新一些有趣的东西.~~~ 0.0  
  
对于vuex，就像rudux的作者所说的"**您自会知道什么时候需要它**"  
为了理解vuex，demo中运用了vuex来对底部Icon进行变化。

#### Vuex  

> Vuex是专门为 Vue.js 设计的状态管理库   

> 首先是创建一个 store ，里面有:  

- state(状态)

- mutations（引发状态改变的方法）

- actions(触发mutations的方法)

>然后在每次对数据对象进行操作的时候，进行dispatch（action 的方法名）用来触发mutations的方法来改变state状态..   

>vue的组件中都有computed,当state改变的时候会触发computed,所以我们就可以根据state的值，对页面进行修改。  

暂时只增加了6个功能，虽然是个小demo,不过能用上的技术，基本上都用上了，适合初学者学习。
## Demo的主要功能有：

- 查询当日运势
- 搞笑图片  
- 查询当前ip  
- 英汉互译  
- 历史上的今天  
- 每日励志英文

##### 演示效果（部分图片）
 ---

![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page1.png) 
![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page2.png)
![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page3.png)  
![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page4.png)
![print](https://github.com/193Eric/webpack-vue-vueRouter/blob/master/src/assets/images/page5.png) 
---
##### 环境
 1. node v6.10.1
 2. cnpm 4.5.0
 3. npm 3.10.10

##### 技术栈

> [vue]

> [vue-router]

> [vuex]  

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
