const KKoa = require('./kkoa')

let app = new KKoa()

app.listen(3000,()=>{
  console.log("启动在3000端口")
})

app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "3";
});


app.use(async (ctx, next) => {
  ctx.body += "2";
});
