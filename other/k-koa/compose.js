

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




