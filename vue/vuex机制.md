## Vuex机制

正常的vue.js里面我们用来传递数据或者状态是用props,或者$emit事件的方式，但是当应用很复杂的时候，还单独用这种方式，页面会乱七八糟，页面与页面的通信，组件与组件的通信，这样的通信方式会导致数据流异常地混乱。 

这个时候我们就需要状态管理器Vuex了。Vuex与vue高度契合，因为Vuex内部采用了new Vue的方式将Store里面的数据跟Vue里面的Data数据一样，响应化了。  

通过[vuex](https://github.com/vuejs/vuex)的源码我们可以看到，Vuex其实是通过Vue.mixin，把Vuex放到beforeCreate钩子中的。

--- 
### Install

vue里面是提供了一个use方法来安装插件的，内部会调用插件提供的 install 方法  

我们模拟一个vuex的install方法

```
  let Vue
  let install = (_Vue)=>{
    if( Vue && _Vue == Vue){
      return
      // 因为已经声明过vuex了
    }
    Vue = _Vue
    applyMixin(Vue) 
    // applyMixin这个方法有两个作用，一个是把通过Vue.mixin方法把vuexInit 方法混淆进 beforeCreate 钩子中，另个一个是把store挂载在Vue的Data上面响应化。
  }
```




