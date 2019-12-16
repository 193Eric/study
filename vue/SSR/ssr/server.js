const express = require("express");

const fs = require('fs');
let path = require("path");
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
let renderer
let readyPromise
const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('./src/index.template.html')
function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    // this is only needed when vue-server-renderer is npm-linked
    // recommended for performance
    runInNewContext: false
  }))
}

if(isProd){
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })

}else{
  readyPromise = require('./build/server.dev.conf.js')(
    server,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}
server.use(express.static('./dist'))
// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  if(isProd){
    renderer.renderToString(context, (err, html) => {
      // 处理异常……
      res.end(html)
    })
  }else{
    readyPromise.then(()=>{
      renderer.renderToString(context, (err, html) => {
        // 处理异常……
        res.end(html)
      })
    })
  }
})
server.listen(3001, () => {
    console.log('服务已开启')
})

