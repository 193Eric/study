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

