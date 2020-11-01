# Vue源码剖析

***网上看了好多的博客和源码教程，感觉很多仔细的地方没有说清，而且在一些复杂的部分加了好多的描述，所以就想自己也写下心得, 方便自己, 方便他人***

---
### Vuejs全局机制

这里想从全局讲一下vue的全局机制，Vue.js 内部是怎么的一个流程

![image](./image/intro.png)

### 初始化过程    

就像我们所知道的，vue是需要一个new Vue()的过程，在这之中，首先会调用_init()函数进行初始化，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等.其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现**响应式**以及**依赖收集**  

在一系列的初始化之后，会执行$mount（数据挂载），然后需要compile编译。  
compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。

- parse
  用正则的方式来解析template的指令，class,id等等 生成ast语法树
- optimize
  是寻找Html里面的静态节点，比如说`<div>look me </div>`是一个纯html，是单纯static节点，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
- generate
  将ast语法树转成render function字符串

--- 
### 响应式，双向绑定

getter,和setter 两个是通过init的时候的Object.defineProperty来设置的，

当render function的时候会触发getter来获取值，这个时候就会进行**依赖收集**生成了一个watcher，并加入当前对象值的闭包Dep数组中。  

之后当我们修改该对象值得时候，会触发setter同时会通知watcher，去循环触发dep里面的watcher通过调用update来触发视图更新。

这里面有个很关键的点，就是第一次init的时候为什么没有生成watcher加入dep。之后在下一篇会通过源码讲到。

---

### 虚拟dom

看图我们就知道，render function字符串最终会生成Virtual DOM, 是reder function通过转化成vnode来生成。virtual dom 是一颗用vnode构成的虚拟树，因为它不依赖真实环境是虚拟的，所以就为跨平台提供了可能。

---
### patch （渲染）

因为我们已经有了虚拟dom树了，我们可以知道html就是虚拟dom映射过去的，那如果我们只修改一个小小的节点，难道就需要更新整个dom树了嘛，那是肯定不行的  

patch里面是通过比较新老vnode 通过diff算法算出**差异**，更新dom就只要更新差异部分就行了。

