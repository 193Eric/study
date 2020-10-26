## Vue3.0体验

> vue3.0已经问世了，Vue 团队先后对外发布了 vue-function-api 和 vue-compisition-api 的 RFC，我们从最新发布的vue-compisition-api来学习vue3.0的新特性，看看对比vue2.0有什么不同。

### 1.初始化项目

- 安装vue-cli3 `npm install -g @vue/cli`
- 创建项目 `vue create my-project`
- 项目中安装 composition-api `npm install @vue/composition-api --save`
- 在`main.js`中通过 Vue.use() 进行安装  composition-api 
```
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi) 
```

### 2.setup

**setup 函数会在 beforeCreate 之后、created 之前执行**

setup有两个参数 `setup(props,content){}`

- props 外接传过来的参数
- content 上下文对象，类似于this,可以调用很多vue2.0需要通过this访问的属性，类似于`context.attrs、context.emit、context.refs...`，所以setup里面不能用this

setup优点:

原本一个组件我们要声明`data()、methods、created、mounted、wathch...`一系列option，现在的操作只用在setup内部，更加简洁，功能模块把状态和方法等划分在一起，更利于模块化。我们就不需要每建立一个，要重新写各种option一遍。



### 3.ref && reactive

- ref ref() 函数用来根据给定的值创建一个响应式的数据对象 `const count = ref(0)`,通过`count.value`来获取值
- reactive 创建响应式的数据对象, reactive的返回值类似于vue2.0的data()返回的响应式对象 `const state = reactive({ count: 0 })`,通过`state.count`来获取值

> ref和reactive都是创建响应式，那为什么要有两种方式创建呢？ vue的团队是为了使api适用于不同的开发风格。举个例子参数声明(var x = 1,y=2 ) 和（var state = {x:1,y:2}），第一种直接声明是ref的方式，第二种用个对象存储是reactive的方式。

**注意！ reative定义的state，如果用了展开运算符...，展开之后就不再是响应了, 可以用...toRefs(state)的形式 转成ref**




### 4.isRef & toRefs

`isRef() `用来判断某个值是否为 `ref()` 创建出来的对象

`toRefs()` 函数可以将 `reactive()`创建的响应式对象转化成`ref`创建的，这个函数的主要应用场景：

```
setup() {
    // 定义响应式数据对象
    const state = reactive({
      count: 0
    }) // reative创建的响应式
    
    const _ref = ref(1) // ref创建的响应式

    return {
      // 将 state 上的每个属性，都转化为 ref 形式的响应式数据
      ...toRefs(state),
      _ref
    }
}
```

为什么要这样做呢？ 因为`reactive()`创建的响应对象只能通过`return state`出去,而不能以展开对象`{state}`的方式出去。所以有多个要`return`的响应式对象时，就需要这个函数。所以一般建议直接用ref，简洁明了


### 5. computed & watch 

vue3.0的computed和watch都是放在setup函数里面，通过声明的方式来创建。

- computed  
```
setup(){
    const count = ref(1)
    const countAdd = computed(() => count.value + 1)
    return{
        count,
        countAdd
    }
}

```
- watch 

```
const count = ref(1)

watch(() => console.log(count.value))

```


### 6. lifeCycle Hooks

- ~~beforeCreate~~ -> use setup()
- ~~created~~ -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured

添加了两个新的调试钩子

- onRenderTracked
- onRenderTriggered


```
export default {
  onRenderTriggered(e) {
    debugger
    // inspect which dependency is causing the component to re-render
  }
}
```

### 7.provide & inject

`provide()` 和 `inject()` 可以实现嵌套组件之间的数据传递。这两个函数只能在 `setup() `函数中使用。父级组件中使用` provide()` 函数向下传递数据；子级组件中使用 `inject() `获取上层传递过来的数据。

父组件：
```
  setup() {
    const conut = ref(1)
    
    provide('count', count) // 传递给子组件count=1
    
  },
```

子组件:

```
  setup() {
    
    const count = inject('count') // 1

  },
  
```
