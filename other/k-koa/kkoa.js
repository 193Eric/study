const http = require('http')

// 导⼊入这三个类
const content = require("./content")
const request = require("./request")
const response = require("./response")
const compose = require("./compose")

function createContent(req,res){
  const ctx = Object.create(content)
  ctx.request = Object.create(request)
  ctx.response = Object.create(response)
  ctx.req = ctx.request.req = req
  ctx.res = ctx.response.res = res
  return ctx
}

class KKoa {
  constructor() {
    this.middlewares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      let ctx = createContent(req,res)

      const fn = compose(this.middlewares)
      
      await fn(ctx)

      res.end(ctx.body)

    });
    server.listen(...args);
  }
  
  use(middleware) { // 中间件用Use来注册
    this.middlewares.push(middleware)
  }
  

}


module.exports = KKoa

