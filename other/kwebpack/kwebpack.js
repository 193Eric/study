let path = require('path')
let _config = require(path.resolve('webpack.config.js'))
let fs = require('fs')
let traverse = require('@babel/traverse').default
let babelTyeps = require('@babel/types')
let generator = require('@babel/generator').default
let { SyncHook } = require('tapable')
let babylon = require('babylon')
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
    this.root = process.cwd()
    // 所有模块依赖
    this.modules = {}
    this.entry = this.config.entry
    this.initHooks()
    this.hanldePlugins()
  }

  // 构建模块
  buildModules(modulePath,name){
    let fileContent = this.readFile(modulePath)
    // 获取解析过后的内容和依赖的模块
    let {resrouce,deps}= this.parse(fileContent)
    resrouce = `(function(module, exports, __webpack_require__) {
      eval("${resrouce}")
    })`
    // 去掉空格换行符
    this.modules[name] = resrouce.replace(/[\r\n]/g,"")
    deps.forEach(dep => {
      this.buildModules(path.join(path.dirname(modulePath),dep),'./'+dep)
    })

  }

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

  // 读取本地文件并且加入loader处理
  readFile(path){
    let _file = fs.readFileSync(path,'utf-8')
    return this.handleLoader(path,_file)
  }

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

  // loader处理模块

  handleLoader(path,content){
    let rules = this.config.module.rules
    rules.forEach((rule)=>{
      let length = rule.use.length - 1 
      let test = rule.test
      if(test.test(path)){
        do{
          let lo = rule.use[length].loader || rule.use[length]
          let loader = require(lo)
          content = loader(content)
          length--
        }while(length > 0)
      }
      
    })
    return content
  }


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

  hanldePlugins() {
    // 处理插件
    let { plugins } = this.config
    if (Array.isArray(plugins)) {

        plugins.forEach((plugin) => {
            plugin.apply(this)
        })
        this.hooks.afterPlugins.call(this)
    }
  }

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

}

let run = new KWebpack(_config)
run.start()