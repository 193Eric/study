
## 数据结构


### 时间空间复杂度

一个是运行时间的长短，一个是占用内存空间的大小。衡量程序好坏的重要因素

----

### 逻辑结构和物理结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111811414365.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

#### 逻辑结构

- 线性结构 （顺序表、栈、队列..）
- 非线性结构 （二叉树、图...）

#### 物理结构

- 顺序存储结构（数组）
- 链式存储结构（链表）

> 数组的访问速度最快，直接访问下标就行。

----


### 链表

  单向链表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118104705956.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
双向链表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118104720137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

查找元素的时候，链表不像数组可以通过下标，快速定位，只能从头结点一个个往下找。

**数组在内存中是顺序存储，所以可以直接用下标查找，而链表是乱序存储，只能通过next指针一个个往下找。**

--- 


### 栈

栈是一种线性数据结构，栈中的元素只能先入后出，栈这种结构可以用数组，也可以用链表实现。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111810563033.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118105638421.png#pic_center)

---

### 队列

队列是一种线性数据结构，只能先进先出，与栈类似，队列这种结构可以用数组，也可以用链表实现

![在这里插入图片描述](https://img-blog.csdnimg.cn/202011181057082.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118105716391.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


优先队列是用二叉堆实现的。

---


### 散列表（哈希表）

这种数据结构提供了，key(键)和value（值）。通过提供的key值可以快速的得到value值，时间复杂度接近O(1)

散列表本质是一个数组，或者说是数组和链表的结合体。

#### 难点

- 哈希函数（一则运算，可以是取模，可以是位运算等等，最终得到Key对应的数组下标）
- 哈希冲突（由于数组长度是有限的，当插入的key值越来越多，不同的key对应哈希函数算出来的下标可能是相同的，这就叫哈希冲突）
> 哈希冲突解决办法：1.开放寻址法（很简单，就是如果这个位置有key了，就往后面插，找下一个空档） 2.链表法（一般都是这种方法，这就是为什么说哈希表是数组和链表的结合，就是数组的每个元素都是一个链表的头节点，它的next指针指向下一个链表节点。当哈希冲突的时候，把key值插入到对应链表）
- 扩容（因为哈希表是数组实现的，是数组就会涉及到扩容问题）
> 假设数组容量不多，那根据哈希冲突法，链表后面会有一大串，之后的查询会很浪费性能。**链表是要遍历查询和插入的O(n)**。扩容分为两步：1.创建一个新的数组，是原数组长度的两倍。2.遍历原来的数组，把原来的所有的key重新哈希函数一遍加入到新的数组（为什么要重新计算，因为扩容之后算法规则会变）。

简单的哈希表实现：

```
// 简单哈希表

class HashTable{
  constructor(){
    // 松散的
    this.table=[]
  }
  calcuteHash(key){
    let hash = 0
    for(let s of key){
      hash += s.charCodeAt()
    }
    // 0~9的是一个数字
    return hash*17 % 100
  }
  get(key){
    let hash = this.calcuteHash(key)
    return this.table[hash]
  }
  put(key,val){
    let hash = this.calcuteHash(key)
    this.table[hash] = val
  }
  
}
```

----

### 树（二叉树）

- 两种特殊结构。满二叉树（所有非叶子节点都有左右两个孩子，也就是都是满的）、完全二叉树（每个元素都跟满二叉树对应，也就是最后一个叶子节点之前节点全部都和满二叉树对应）
- 两种存储结构。链式（每个节点包括三部分，自身data,指向左孩子的left指针，指向右孩子的right指针）、组数（数组是按照满二叉树层级顺序去一个个填入数组，即使一个节点左孩子或者右孩子空缺，数组也会空出来，为了方便查找。父节点为a ,左孩子就为a\*2+1,右孩子为a\*2+2）
- 二叉查找树（又称二叉排序树，左子树小于父节点，右子树大于父节点。里面还涉及到一个二叉树自平衡的问题，红黑树，AVL树等等。）
- 二叉树的遍历
> 深度优先遍历（前序，中序，后序），广度优先遍历（层序）。  
>
>深度优先遍历：可以以根节点（父节点）为理解。   **注意，每遍历一个节点的时候，要看该节点是否为叶子节点或者叶子节点已经返回，如果不是，重新执行当前遍历** 。   
前序就是先遍历根节点，再遍历左右子节点；  
中序是先遍历左子树，历根节点，右子树；  
后序是先遍历左子树，根节点，右子树。  **二叉树遍历算法可以用递归，也可以用栈。原理都是回溯**  

>广度优先遍历：是一层层遍历，但二叉树每层的兄弟节点，并没有直接关联   **所以这用队列（先进先出）的方式来实现，例如：先进1号节点，然后1号节点出队，得到2，3号节点入队。然后2号节点出队，4，5入队。依次类推**

- 二叉堆（最小堆、最大堆）
> 本质：完全二叉树  
> | 最小堆|最大堆|
> |----|----|
> |任何一个父节点的值都小于或等于左右孩子|任何一个父节点的值都大于或等于左右孩子|  
> 二叉堆的构建：二叉堆的自我调整有3个  
> 1.插入节点  
> 我们知道二叉堆是完全二叉树，那插入肯定是先插入到最后一个位置。然后跟父节点判断大小，去决定上浮还是不动。  
> 2.删除节点  
> 删除节点和插入节点恰恰相反，是删除根节点，然后把最后一个节点填到根节点，然后跟孩子节点判断大小，去决定下沉还是不动。  
> 3.构建二叉堆  
> 让每个非叶子节点下沉，顺序是从最后一个非叶子节点开始下沉（和左右孩子比较），直到根节点。  
> **二叉堆的插入和删除时间复杂度都是o(logn),而构建堆的事件复杂度为o(n)**  
> 另外因为二叉堆是完全二叉树，所以二叉堆是以数组方式存储的，是顺序存储。  
> 重点：优先队列 **和普通队列不同，不再遵循先入先出，而是优先最大或者最小的值出** 
> 每一次入队就是二叉堆的插入操作，出队就是二叉堆的删除操作。

---

## 算法

### 冒泡排序和优化

冒泡排序是依次遍历，交换位置。

```
// 冒泡排序

// 时间复杂度 (O(n^2))

let a = [2,3,232,34]

function sortFnMP(arr){
  for(let i = 0, len=arr.length; i < len-1; i++){
    for(let j =0,len=arr.length; j < len-i-1; j++){
      if(arr[j] > arr[j+1] && arr[j+1]){
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}
console.log(sortFnMP(a))
```

为什么要优化冒泡排序，因为冒泡排序是从右边开始排列有序，但是如果左边遍历一次后，没有发生变化，就证明左边也已经有序了,
那就不用再循环遍历了，我们需要跳出排序。

所以我们需要用一个isSorted变量来标记，排序是否有发生交换，没有的话，就证明已经是有序的了，直接跳出。

```
// 冒泡排序的优化

function sortFnMPUp(arr){
  for(let i = 0, len=arr.length; i < len-1; i++){
    let isSorted = true
    for(let j =0,len=arr.length; j < len-i-1; j++){
      if(arr[j] > arr[j+1] && arr[j+1]){
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
        isSorted = false
      }
    }
    if(isSorted){
      break
    }
  }
  return arr
}

```

---

### 快速排序和优化

快速排序和冒泡排序一样都是通过”交换“来排序的，不同的是冒泡排序是每一轮把1个元素放到尾端，而快速排序则是在每一轮，找到一个基准元素，
把比它小的元素移动到它左边，比它大的元素移动到右边，然后把数组拆分成两部分，递归完成。
这种思路叫分治法 时间复杂度为O(n*lgn)

其中快排最重要的是基准的选择。如果选择第一个为基准的话，在极端的情况下，时间复杂度为O(n^2)，所以基准我们选择数组中间的一个。

/快排分为两部分，一分为主算法部分，一分为元素交换部分

```
// 主算法
function sortQuick(arr){
  if(arr.length <= 1){
    return arr
  }

  var tagIndex = Math.floor(arr.length / 2)

  var tag = arr[tagIndex]

  arr.splice(tagIndex,1) // 从数组中取出tag，因为后面会链接它，它需要独立开来对比 ，这里比较重要。

  let {leftArr,rightArr} = sortQuickFor(tag,arr)


  return [...sortQuick(leftArr),tag,...sortQuick(rightArr)]
}

// 元素交换法

function sortQuickFor(tag,arr){
  let leftArr = []
  let rightArr = []

  for(let i =0,len=arr.length;i<len;i++){
    if(arr[i] > tag){
      rightArr.push(arr[i])
    }else{
      leftArr.push(arr[i])
    }
  }
  return {rightArr,leftArr}
}
```

快速排序的优化：

上面算法可以看到，我们的元素交换法利用了两个和本身数组一半Size的数组。从算法的角度来说，空间复杂度提高了。所以我们可以省下数组的创建，通过临时变量来写。

```
function sortQuickFor(tag,arr){
  let index = 0 // 用index来标记当前左边元素的下标，如果元素大于tag,则不管，如果小于tag,我们通过交换把元素跟index下标的元素进行交换，然后Index++

  for(let i =0,len=arr.length;i<len;i++){
    if(arr[i] > tag){
      
    }else{
      let temp = arr[i]
      arr[i] = arr[index]
      arr[index] = temp
      index++
    }
  }

  return {leftArr:arr.slice(0,index),rightArr:arr.slice(index)}
}
```

--- 

### 算法实战

#### 斐波那契优化

我们先简单通过递归实现一个斐波那契数列。

```
// 斐波那契数列

function fib (n){
  if(n == 1 || n == 2 ){
    return 1
  }

  return fib(n-1)+fib(n-2)
}

```

从上面的算法我们可以看到，假设n=4 
fib(4) = fib(2) + fn(3)  
fib(3) = fib(2) + fib(1)   
所以 fib(4) = fib(2) + fib(2) + fib(1) 我们可以看到fib(2)计算了两次，这仅仅是n=4，如果n量级一大，我们会涉及到无数次的重复计算，所以这里我们可以利用闭包做个缓存来提升性能。

```
// 递归优化 利用闭包的特性做缓存
function fibUp (n){
  let _ob = []
  function fibS(n){
    if(n == 1 || n == 2 ){
      return 1
    }
    if(_ob[n]){
      return _ob[n]
    }
    _ob[n] = fibS(n-1) + fibS(n-2)
    return _ob[n]
  }

  return fibS(n)

}

```

然后我们利用两个算法，来试试性能优化了多少，运行下面代码

```
console.time()
console.log('递归方法'+fib(40))
console.timeEnd()


console.time()
console.log('递归缓存优化'+fibUp(40))
console.timeEnd()

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118154840758.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
运行之后我们可以看到，这个优化是指数级别的.. 

还有一种优化方法，它和递归是两种相反的结构，**递归是从上到下，动态规划是从下到上** 

```
// 动态规划法优化

function fibUp2(n){

  // 递归是从上到下
  // 动态规划，从下到上
  let _ob = [0,1,1]

  for(let i =3,len=n;i<=len;i++){
     _ob[i] = _ob[i-1]+ _ob[i-2]
  }

  return _ob[n]

}

```

然后我们来看看效果，运行下面这段代码：

```
console.time()
console.log('递归方法'+fib(40))
console.timeEnd()


console.time()
console.log('递归缓存优化'+fibUp(40))
console.timeEnd()


console.time()
console.log('动态规划优化'+fibUp2(40))
console.timeEnd()
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201116180911626.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
从结果上我们可以看到，动态规划甚至比递归缓存的优化还要快一点。这中间应该是省了函数层级嵌套调用的时间。  

动态规划算法，在我们生活中很多时候都会用到，仅仅一个斐波那契数列并不能完全表达，下面我们来看看0-1背包问题。

#### 0-1背包问题：

题目：有一个容量为 V 的背包，和一些物品。这些物品分别有两个属性，体积 w 和价值 v，每种物品只有一个。要求用这个背包装下价值尽可能多的物品，求该最大价值，背包可以不被装满。


解题思路：
 - 对于每一个物品，有两种结果：能装下或者不能装下。第一，包的容量比物品体积小，装不下，这时的最大价值和前i-1个物品的最大价值是一样的。第二，有足够的空间装下，但是不能确定（当前物品价值+剩余空间价值）是否大于当前空间最大价值，所以要进行比较。
 - 利用一个二维数组来展示最大价值表格，横向j为背包容量，纵向i为物品，交界为当前容量，当前物品所能装的最大价值，每一行都是当前容量，对应i物品的最大价值。
- 我们要做的就是填充满这个表格。

```
// 动态规划 背包问题

// n 数量 w重量数组，v价值数组，ca容量

function pack(w,v,ca,n){

  var T = []
  
  for(var i =0;i<n;i++){
    T[i] = []
    T[i][0] = 0
    for(var j =1 ; j<=ca;j++){
      if(w[i] <= j){
        if(i ==0){
          T[i][j] = v[i]
          continue
        }
        T[i][j] = Math.max(T[i-1][j],T[i-1][j-w[i]] + v[i]) // 重点，
        // 因为循环我们都能取到，当前容量可以取的最大值，
        // 所以我们可以拿上次当前容量最大值和 （当前物品值+剩余容量的最大值）作比较，谁大，谁就是当前容量的最大值。
      }else{
        if(i ==0){
          T[i][j] = 0
          continue;
        }
        T[i][j] = T[i-1][j]
      }
    } 
    
  }

  console.log(T)
  
}

 pack([2,3,4],[3,4,5],10,3)
 
```
运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111818160267.png#pic_center)
表格出来了，那要找到最优解就简单了。写一个函数：

```
//找到需要的物品
function findValue(w,v,ca,n,T){
	var i = n-1, j = capacity;
	while ( i > 0 && j > 0 ){
		if(T[i][j] != T[i-1][j]){
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + values[i]);
			j = j- w[i];
			i--;
		}else{
			i--;  //如果相等，那么就到 i-1 行
		}
	}
	if(i == 0 ){
		if(T[i][j] != 0){ //那么第一行的物品也可以取
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + values[i]);
		}
	}
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118182220157.png#pic_center)

这样我们就通过动态规划法得出了10容量的最优解。

--- 


### 二分查找法
二分查找法一般指二分查找。二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。

将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功；否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于查找关键字，则进一步查找前一子表，否则进一步查找后一子表。重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，此时查找不成功

```
// 普通for循环查找方法
function common(arr,key){
  if(Object.prototype.toString.call(arr) !== "[object Array]"){
    return 'err'
  }

  for(let i= 0,len=arr.length;i<len;i++){
    if(arr[i] == key){
      return i
    }
  }
}

// 二分查找法
function diff(arr,key){
  if(Object.prototype.toString.call(arr) !== "[object Array]"){
    return 'err'
  }

  let index = Math.floor(arr.length/2)
  let tag = arr[index]

  if(index == key){
    return index
  }

  if(key > tag){
    diff(arr.slice(index),key)
  }
  
```

我们来对比下普通for循环和二分查找法的差别

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201116183746487.png#pic_center)

可以看到，二分查找法明显要快于for循环，时间复杂度是lgn。

---

最后放上一个排序算法对比表：


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118103956187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
