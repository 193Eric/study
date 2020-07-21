#### 手写webpack


> 实现一个简单weboack可以分为4点

1. 编译一个入口文件(代码文件)
2. 解析并改造代码如将 import、require转换成 __webpack_require__
3. 收集依赖的模块并重复2
4. 生成文件并导出上面的模版。

> 扩展：

 - 加上loader (文件转换)
 - 加上plugin （编译过程中 不同周期 做额外的事，比如编译过程中加注释，加图片等等。。。）

##### 搭建骨架

```
 class KWebpack {
  constructor(){
    // 读取webpack.config.js 且初始化
  }

  // 构建模块
  buildModules(){

  }

  // 生成打包文件
  writeFile(){

  }

  // 读取本地文件
  readFile(){
    
  }

  // 解析模块 将源代码解析成 ast语法树并处理
  parse(){

  }

  // 运行模块
  start(){

  }

}
```

##### 初始化（编译一个入口文件）

```
let path = require('path')
let _config = require(path.resolve('webpack.config.js'))

// 初始化配置
let defaultConfig = {
  entry:'./src/main.js',
  output:{
    fileName:'build.js'
  }
}

class KWebpack {
  constructor(config){
    // 读取webpack.config.js 且初始化
    this.config = {...defaultConfig,...config}
    this.root = process.pwd()
    // 所有模块依赖
    this.modules = {}
    this.entry = this.config.entry
  }
```

##### 构建


1.读取代码文件
```
  // 读取本地文件
  readFile(path){
    return fs.readFileSync(path,'utf-8')
  }
```
2.构建模块
```
  // 构建模块
  buildModules(modulePath){
    let fileContent = this.readFile(modulePath)
    // 获取解析过后的内容和依赖的模块
    let {resrouce,deps}= this.parse(fileContent)
    this.modules['./'+path.relative(this.root,modulePath)] = resrouce
    deps.forEach(dep => {
      this.buildModules(path.join(path.dirname(modulePath),dep))
    })

  }
```
3.解析代码 依赖收集

> 这里由于要解析并且转成ast语法树，需要用到外部插件（babylon,traverse）

```
  // 解析模块 将源代码解析成 ast语法树并处理
  parse(data){
    let deps = []
    let ast = babylon.parse(data)
    let root = this.root
    // @babel/traverse遍历ast节点
    traverse(ast, {
      CallExpression(p) {
          let node = p.node
          if (node.callee.name === 'require') {
              node.callee.name = '__webpack_require__'
              // 构建新的模块路径(模块名)
              
              let moduleName = node.arguments[0].value

              // 这里作了简化处理，可能引用的还有其他模块 。
              moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') // ./a.js
              moduleName = path.join(moduleName) // ./src/a.js
              deps.push(moduleName)
          }
      }
    })
    let resrouce = generator(ast).code
    return { resrouce, deps} 

  }
```

##### 导出模板

> 构建完之后 我们得到moudles对象，里面包括了所有引入文件，现在我们需要导出生成我们要的打包文件。
> 其中template.js是模板文件，

```
  // 生成打包文件
  writeFile(){
    let templateContent = this.readFile(__dirname + '/template.js')
    // 把this.moudles数组转成字符串，为了拼接到template里面。
    let modulesStr = ''
    Object.keys(this.modules).forEach((item)=>{
      modulesStr+= `"${item}":${this.modules[item]},`
    })
    templateContent = templateContent.replace('__entry__',this.entry).replace('__modules_content__',modulesStr)

    fs.writeFileSync(`./dist/${this.config.output.fileName}`,templateContent)
  }
```

```
// template.js
(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    
    return module.exports;
  }
  // return 入口
  return __webpack_require__("__entry__");
})({__modules_content__})
```


##### 扩展loader

> 首先，loader所作的事情就是在加载文件时匹配hash,如果正则匹配则调用loader去处理它并返回处理后的结果。

> 既然我们知道loader是匹配正则去修改并返回结果，那我们可以修改咱们的`readFile`方法。

```
// 修改过后的readFile方法

  // 读取本地文件并且加入loader处理
  readFile(path){
    let _file = fs.readFileSync(path,'utf-8')
    return this.handleLoader(path,_file)
  }

```

`handleLoader`方法：
loader有几个规则要注意下：  
- loader是一个数组，从下往上执行
- 每个子loader执行完，会返回结果给下一个子loader执行
- loader是一个可执行函数

```
  handleLoader(path,content){
    let rules = this.config.module.rules
    rules.forEach((rule)=>{
      let length = rule.use.length - 1 
      let test = rule.test
      if(test.test(path)){
        do{
          let lo = rule.use[length].loader || rule.use[length]
          let loader = require(lo)  
          content = loader(content) // 这里如果引用正常的loader会报错，因为官方loader里面封装了很多方法。这里没写，所以这里代码封装了一个简单添加文字的loader。来演示
          length--
        }while(length > 0)
      }
      
    })
    return content
  }
```

>ps：由于loader功能比较复杂。涉及到api比较多。理解主要功能就好了。loader就是在加载文件的时候，匹配正则，然后调用loader这个函数去执行返回新的文件内容。

这里我们写一个简单的loader,不涉及原生的loader api。功能是在每个匹配的js后面添加一句注释

```
// loaderText.js

function loader (source) {
  source += '// 我是添加的loader文案'
  return source
}

module.exports = loader
```
这样一个简单的loader就成功了。

##### 扩展plugins

> plugins只用记住一句话 ：**插件即钩子**，插件的实现就很简单了。只要在constructor的时候添初始化钩子，然后在合适的地方调用即可。

一个webpack的插件由以下几方面组成：

- 一个非匿名的js函数
- 在它的原型对象上定义apply方法
- 指明挂载自身的webpack钩子事件
- 操作webpack内部情况的特定数据
- 方法完成时唤起webpack提供的回调


> 划重点：webpack的钩子离不开`tapable`,去看webpack4.0的源码，会发现里面都是一些tapable的解构函数。tapable可以说是webpack的灵魂，webpack基本就是各种插件累积起来的，各种插件穿插在各种生命钩子里面就是靠的它。不理解的话，建议去看下tapable文档。不然去看webpack源码会一脸懵逼

> 这里简单说下tapable钩子，类似于node的Events, 也是注册类似于事件，然后通过不同的钩子调用，来触发一个个事件。（*实现事件流机制的 “钩子” 大方向可以分为两个类别，“同步” 和 “异步”，“异步” 又分为两个类别，“并行” 和 “串行”，而 “同步” 的钩子都是串行的*）

我们先来扩展下webpack内容配置。前面说了插件就是钩子，所以我们先配置钩子** (这里只是演示，所以所有的都用同步钩子SyncHook了)**

```
  initHooks() {
    // 配置钩子
    this.hooks = {
        entryOption: new SyncHook(),
        compile: new SyncHook(),
        afterCompile: new SyncHook(),
        afterPlugins: new SyncHook(),
        run: new SyncHook(),
        emit: new SyncHook(),
        done: new SyncHook()
    }
  }

```

然后我们配置一个注册调用plugins的方法。

```
  hanldePlugins() {
    // 处理插件
    let { plugins } = this.config
    if (Array.isArray(plugins)) {

        plugins.forEach((plugin) => {
            plugin.apply(this) // 每个插件里面都会有一个apply方法来调用
        })
        this.hooks.afterPlugins.call(this)
    }
  }
```

继续修改启动项：

```
  // 运行模块
  start(){
    this.hooks.run.call(this)
    this.hooks.compile.call(this)

    this.buildModules(path.resolve(this.root, this.entry),this.entry)

    this.hooks.afterCompile.call(this)

    this.writeFile()
    
    this.hooks.emit.call(this)
    this.hooks.done.call(this)
  }
```

> 本质来说，插件就是生命钩子的调用，可以看到启动模块里面不同地方放了不同的钩子。然后通过**tapable**来调用设置的插件修改complie等等。

这里我们写一个简单插件(构建完之后emit钩子插件)：

```
class PluginTest{
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function() {
            console.log('现在是emit钩子触发')
        })
    }
}

module.exports = PluginTest
```

然后config文件里面plugins数组里面添加一个new PluginTest()   

这样一个简单的plugin就成功了。