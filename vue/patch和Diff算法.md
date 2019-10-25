## Patch和Diff算法

---

我们知道的，在数据更改后，会触发getter，然后通过dep.notify()来通知watcher触发update进而更新视图，最终是通过Diff算法来对比新老Vnode的差异，并把差异更新到Dom视图上  

--- 

### Diff

我们知道的，Virtual DOM是一颗树，而diff算法主要把两颗树进行对比，找出之间的差异，来渲染页面

diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)，是一种相当高效的算法 


1.调用patch函数比较Vnode和OldVnode,如果不一样直接return Vnode即将Vnode真实化后替换掉DOM中的节点

2.如果OldVnode和Vnode值得进一步比较则调用patchVnode方法进行进一步比较，分为以下几种情况：

- Vnode有子节点，但是OldVnode没有，则将Vnode的子节点真实化后添加到真实DOM上  

- Vnode没有子节点，但是OldVnode上有，则将真实DOM上相应位置的节点删除掉  

- Vnode和OldVnode都有文本节点但是内容不一样，则将真实DOM上的文本节点替换为Vnode上的文本节点

- Vnode和OldVnode上都有子节点，需要调用updateChildren函数进一步比较

updateChildren比较规则

- 提取出Vnode和OldVnode中的子节点分别为vCh和OldCh，并且提出各自的起始和结尾变量标记为 oldS oldE newS newE

- 如果是oldS和newE匹配上了，那么真实dom中的第一个节点会移到最后

- 如果是oldE和newS匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动

- 如果都没有，在没有key的情况下直接在DOM的oldS位置的前面添加newS，同时newS+1。在有key的情况下会将newS和Oldch上的所有节点对比，如果有相同的则移动DOM并且将旧节点中这个位置置为null且newS+1。如果还没有则直接在DOM的oldS位置的前面添加newS且newS+1
直到出现任意一方的start>end，则有一方遍历结束，整个比较也结束

updateChildren例子：

假设:   
 
真实dom为 A、B、C   
oldDom为 A1、B1、C1   
newDom为 A2、D2、C2、B2 

> 先确定oldS = A1 ; oldE = C1; newS = A2; newE = B2   

- 先对比oldS和newS,oldE和newE,发现oldS = newS 所以真实dom的A固定不动。排序为 A、B、C

> 然后oldS = B1 ; oldE = C1; newS = D2; newE = B2

- 对比发现 oldS = newE , 所以真实dom,B要插入到后面去

- 真实dom排序为：A、C、B

> 然后oldS = C1; oldE = C1; newS = D2; newE = B2

- 对比发现两两都不对等，所以走第三步。
- 假设有key存在，所以newS直接和oldDom里面的所有节点对比，发现没有存在，然后插入到oldS前面，且newS+1
- 真实dom排序为：A、D、C、B

> 然后重新开始，oldS++ > oldE-- ,结束了。


**这就是updateChildren，之后就是一直遍历，运行updateChildren直到没有**




