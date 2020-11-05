
### 简介
>Koa由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数。同时koa的中间件机制和洋葱模型是它独有的特点，并且它没有捆绑任何中间件，而是可以让用户以更优雅的方式去扩展。

Koa是一个精简的web框架，它主要做了以下几件事：

- 为request和response对象赋能，并基于它们封装成一个context对象，可以通过get，set调用参数
- 基于async/await的中间件容器机制



---


### 源码解读

打开koa的[源码](https://github.com/koajs/koa/tree/master/lib)，核心文件共四个在lib目录下：

- application.js
- context.js
- request.js
- response.js

#### application(初始化)
application是Koa2的入口，里面引入了`request.js`,`response.js`,`context.js`。然后用构造函数的形式，暴露出来。

这里列出主要结构代码：

```
module.exports = class Application extends Emitter {

  constructor(options) { 
	// xxx
    this.middleware = []; // 注：用来存放通过use函数引入的中间件的数组。
    this.context = Object.create(context); // 注：创建content对象
    this.request = Object.create(request); // 注：同上
    this.response = Object.create(response); // 注：同上
   }
   
  listen(...args) {  // 注：创建node服务实例
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  
  use(fn) { // 注： 用来把中间件加入到middleware数组里面
	// xxx
    this.middleware.push(fn);
    return this;
  }
  
  callback() {  // 注： 返回一个函数给node服务，作为处理请求的回调函数
    const fn = compose(this.middleware);  // 注： 很重要，将所有的中间件通过compose组合一下，弄成洋葱模型。这里是Koa的精髓部分
 
    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
  
  handleRequest(ctx, fnMiddleware) { // 注：处理错误
        // xxx
    }
    
  createContext(req, res) { // 注：创建ctx对象，并且把req,res写入ctx
	// xxx 
  }
```

#### content
里面都是一堆对参数的set get设置，方便一些参数的获取。

```
const util = require('util');
const createError = require('http-errors');
const httpAssert = require('http-assert');
const delegate = require('delegates');
const statuses = require('statuses');
const Cookies = require('cookies');

const COOKIES = Symbol('context#cookies');

const proto = module.exports = {
	// xxx 注：一些方法函数，toJosn之类的。
}

// 注：这里就是为了在application.js 里面createContent 的时候，把一些response,request的对象属性代理给content。
delegate(proto, 'response')
  .method('attachment')
  .xxx
  
delegate(proto, 'request')
  .method('acceptsLanguages')
  .xxx

```

#### request
```
module.exports = {
  // 注：基于req封装很多便利的函数和属性，可以让application.js 里面request对象直接调用。
  get header() {
    return this.req.headers;
  },
  
  set header(val) {
    this.req.headers = val;
  },
```

#### response
```
module.exports = {
  // 注：基于res封装很多便利的函数和属性，可以让application.js 里面responset对象直接调用。
   get headers() {
    return this.header;
  },

  get status() {
    return this.res.statusCode;
  },
```

--- 

### 中间件机制koa-compose
介绍application.js的时候，提到里面有个koa-compose，这里是整个koa框架的精髓。

我们所知的koa中间件是一个洋葱模型：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201105160735986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
现在我们来学习compose是怎么实现洋葱模型的。

要学会洋葱模型，我们必须先要懂一个函数式编程的东西，就是函数合成和函数柯里化。compose就是运用了函数式编程的方式，来实现洋葱模型的。

#### 函数的合成与柯里化

- 函数合成：

如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（compose）。

```
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}
```

- 柯理化：

f(x)和g(x)合成为f(g(x))，有一个隐藏的前提，就是f和g都只能接受一个参数。如果可以接受多个参数，比如f(x, y)和g(a, b, c)，函数合成就非常麻烦。

这时就需要函数柯里化了。所谓"柯里化"，就是把一个多参数的函数，转化为单参数函数。

```

// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}

addX(2)(1) // 3
```


#### compose实现
学习完函数式编程之后，我们来实现compose函数。

```
// compose.js

function compose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i] // 注：application.js 里面用来存放中间件的数组
      if (!fn) { 
        return Promise.resolve()
      }
      return Promise.resolve(fn(ctx,function next() {
        return dispatch(i + 1)
      }))
    }x
  }
}

// 写几个中间件案例：

async function fn1(ctx,next) {
  console.log("fn1"); 
  await next(); 
  console.log("end fn1");
}

async function fn2(ctx,next) {
  console.log("fn2");
  await next();
  console.log("end fn2");
}

function fn3(ctx,next) {
  console.log("fn3");
}


const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);


finalFn('ctx'); // 注：这里ctx随便用个字符串代替，正式调用的话，ctx是createContent创建的上下文对象，里面有response,request等等。

```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201104185308193.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
洋葱模型，先从外往里面执行，然后再从里往外执行。

- ① 先执行fn1，打印fn1
- ② 遇到next函数，fn1后面代码挂起，等待next1执行完毕（这里命名next1，方便理解）
- ③ next1通过dispatch函数执行fn2
- ④ 打印fn2
- ⑤ 遇到next函数，fn2后面代码挂起，等待next2执行完毕
- ⑥ next2通过dispatch函数执行fn3
- ⑦ 打印fn3
- ⑧ 此时fn3函数全部走完，通知fn2,next2已经执行完毕，运行fn2后面代码，打印end fn2
- ⑨ 此时fn2函数也已经全部走完，再通知fn1,next1已经执行完，运行fn1后面的代码，打印end fn1

到这里一个全部compose就完成了，简单来说这里就是一个Promise嵌套，加上函数式编程。


