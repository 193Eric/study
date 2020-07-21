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
  return __webpack_require__("./src/main.js");
})({"./src/main.js":(function(module, exports, __webpack_require__) {      eval("__webpack_require__('./a.js');var abc = function (msg) {  console.log(`hellow ! ${msg}`);};abc('nihao'); // 我是添加的loader文案")    }),"./a.js":(function(module, exports, __webpack_require__) {      eval("__webpack_require__('./c.js');let a = async () => {  await setTimeout(() => {    console.log('lalalal 我是a');  }, 3000);};a(); // 我是添加的loader文案")    }),"./c.js":(function(module, exports, __webpack_require__) {      eval("let c = () => {  console.log('lalalal 我是c');};c(); // 我是添加的loader文案")    }),})// 我是添加的loader文案