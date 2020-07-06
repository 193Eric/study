//master
var fork = require('child_process').fork
var server = require('http').createServer((req,res)=>{
  let begin_time  = new Date().getTime()
  console.log("begin_time"+begin_time)
  fibonacci(43)
  let end_time = new Date().getTime()
  res.end("end_time"+end_time+'-----'+(end_time-begin_time)/1000 +'s')
})
server.listen(8111, () => {     //master监听8888
    console.log('master on :', 8111)
})

let fibonacci = (n) =>{
  return n <2? n : fibonacci(n -1) + fibonacci(n -2);
};

// var workers = {}
// for (var i = 0; i < 2; i++) {
//     var worker = fork('./worker.js')
//     worker.send('server', server)//发送句柄给worker
//     worker[worker.pid] = worker
//     console.log('worker create pid:', worker.pid)
// }
//worker
var http = require('http')



// var server = http.createServer((req, res) => {
//         res.end('hahahaha')
//     })//不监听

// process.on('message', (msg, tcp) => {

//     if (msg === 'server') {
//         const handler = tcp
//         handler.on('connection', socket => {//代表有链接
//             server.emit('connection', socket)//emit方法触发 worker服务器的connection
//         })
//     }
// })