var cluster = require('cluster');
var os = require('os'); // 获取CPU 的数量
var numCPUs = os.cpus().length;
var process = require('process')

console.log('numCPUs:', numCPUs)
var workers = {};
if (cluster.isMaster) { // 这里是进入主进程，第一次启动的时候，运行这里
    // 主进程分支
    cluster.on('death', function (worker) {
        // 当一个工作进程结束时，重启工作进程 delete workers[worker.pid]; 这里主要是为了让代码即使报错，也不会影响服务器运行。故障恢复
        worker = cluster.fork();
        workers[worker.pid] = worker;
    });
    // 初始开启与CPU 数量相同的工作进程  多核利用
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork(); // 复制进程，有多少个核，复制多少个子进程,复制的过程会重新运行一遍该文件（因为是复制进程，代码也会复制份在子进程运行）。
        workers[worker.pid] = worker;
    } 
} else { // 这里是子进程开启的时候，就是主进程folk之后，会走到这里。所以这里会启动与cpu相同数量的子进程服务。
    // 子进程启动服务器，多进程共享3000端口
    var app = require('./app');
    app.use(async (ctx, next) => {
        console.log('worker' + cluster.worker.id + ',PID:' + process.pid)
        next()
    })
    app.listen(3000);
}
// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function () {
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});

// require('./test')