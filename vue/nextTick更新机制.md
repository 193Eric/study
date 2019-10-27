## nextTick更新机制

为什么大家听到的vue是异步更新机制？传统的dom更新不是同步的吗？  

vue修改视图的方式是：  
setter -> Dep -> Watcher -> patch -> 视图

假设我们有一个特殊的情况：
```
  <div>{{text}}</div>

  export default {
    data () {
        return {
            text: 1
        };
    },
    mounted(){
      for(let i = 0; i < 100; i++) {
        this.text++;
      }
    }
  }
```
我们可以看到，text更新了99次，如果每一次修改都去修改视图，走修改流程的话，就要99次。这是非常低的效率

### nextTick

从上面的案例我们可以看到，为什么需要异步更新。  

nextTick是vue.js实现的一个函数，他是创建一个队列，里面会传入事件，存储到队列中，在下一个tick时触发队列中所有的事件。  

因为目前浏览器平台并没有实现 nextTick 方法，所以 Vue.js 源码中分别用 Promise、setTimeout、setImmediate 等方式在 microtask（或是task）中创建一个事件，目的是在当前调用栈执行完毕以后（不一定立即）才会去执行这个事件。

根据上面的例子，我们可以看到，更新了99次，是同一个watcher(具体看响应式文章部分)。我们不可能把99个都插入一个队列。这样是重复触发相同事件，我们对于队列中相同的watcher只需要一个最终结果。所以，vue.js里面给了wathcer一个id。  

同时实现了二个方法，**queueWatcher**来判断是否为同一个watcher,如果相同通过
**flushSchedulerQueue**来更新队列里面的watcher。

这样上面那个案例，在下一个tick时候只会触发一次watcher,把text直接变成100。  

到这里，这是批量异步更新策略及 nextTick 原理。