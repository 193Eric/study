

function compose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(ctx,function next() {
        return dispatch(i + 1)
      }))
    }x
  }
}

module.exports = compose

// async function fn1(ctx,next) {
//   console.log("fn1"); 
//   await next(); 
//   console.log("end fn1");
// }

// async function fn2(ctx,next) {
//   console.log("fn2");
//   await delay();
//   await next();
//   console.log("end fn2");
// }

// function fn3(ctx,next) {
//   console.log("fn3");
// }

// function delay() {
//   return new Promise((reslove, reject) => {
//     setTimeout(() => {
//       reslove();
//     }, 2000);
//   });
// }

// const middlewares = [fn1, fn2, fn3];

// const finalFn = compose(middlewares);


// finalFn('ctx');



// 执行流程 先执行fn1, 
// console.log(fn1)
// 遇到next(),挂起等待fn2的promise执行的reslove ， 因为resolve返回里面有个执行函数，所以是异步的，要等待函数里面的都执行完 才会往下走。
// 执行 fn2
// console.log(fn2)
// delay 2s
// 遇到next ,挂起等待fn3的promise执行的reslove resolve 
// 执行fn3
// console.log(fn3)
// 没有遇到next , 直接取middlewares[3]为空，返回resolve()
// 此时 fn2得到fn3的resolve,执行fn2,

// conosle.log(fn2end)
// 然后fn1得到fn2的resolve

// console.log(fn1end)


