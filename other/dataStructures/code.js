// 冒泡排序

// 时间复杂度 (O(n^2))

// let a = [2,3,232,34]

// function sortFnMP(arr){
//   for(let i = 0, len=arr.length; i < len-1; i++){
//     for(let j =0,len=arr.length; j < len-i-1; j++){
//       if(arr[j] > arr[j+1] && arr[j+1]){
//         let temp = arr[j]
//         arr[j] = arr[j+1]
//         arr[j+1] = temp
//       }
//     }
//   }
//   return arr
// }
// console.log(sortFnMP(a))


// // 冒泡排序的优化

// // 为什么要优化冒泡排序，因为冒泡排序是从右边开始排列有序，但是如果左边遍历一次后，没有发生变化，就证明左边也已经有序了,
// // 那就不用再循环遍历了，我们需要跳出排序。

// // 所以我们需要用一个isSorted变量来标记，排序是否有发生交换，没有的话，就证明已经是有序的了，直接跳出。

// function sortFnMPUp(arr){
//   for(let i = 0, len=arr.length; i < len-1; i++){
//     let isSorted = true
//     for(let j =0,len=arr.length; j < len-i-1; j++){
//       if(arr[j] > arr[j+1] && arr[j+1]){
//         let temp = arr[j]
//         arr[j] = arr[j+1]
//         arr[j+1] = temp
//         isSorted = false
//       }
//     }
//     if(isSorted){
//       break
//     }
//   }
//   return arr
// }


// console.log(sortFnMPLevel1(a))




// 快速排序

// 快速排序和冒泡排序一样都是通过”交换“来排序的，不同的是冒泡排序是每一轮把1个元素放到尾端，而快速排序则是在每一轮，找到一个基准元素，
// 把比它小的元素移动到它左边，比它大的元素移动到右边，然后把数组拆分成两部分，递归完成。
// 这种思路叫分治法 时间复杂度为O(n*lgn)

// 其中快排最重要的是基准的选择。如果选择第一个为基准的话，在极端的情况下，时间复杂度为O(n^2)，所以基准我们选择数组中间的一个。


// 快排分为两部分，一分为主算法部分，一分为元素交换部分

// let a = [2,3,232,34,5,99,2234]

// function sortQuick(arr){
//   if(arr.length <= 1){
//     return arr
//   }

//   var tagIndex = Math.floor(arr.length / 2)

//   var tag = arr[tagIndex]

//   arr.splice(tagIndex,1) // 从数组中取出tag，因为后面会链接它，它需要独立开来对比 ，这里比较重要。

//   let {leftArr,rightArr} = sortQuickFor(tag,arr)


//   return [...sortQuick(leftArr),tag,...sortQuick(rightArr)]
// }

// 元素交换法

// function sortQuickFor(tag,arr){
//   let leftArr = []
//   let rightArr = []

//   for(let i =0,len=arr.length;i<len;i++){
//     if(arr[i] > tag){
//       rightArr.push(arr[i])
//     }else{
//       leftArr.push(arr[i])
//       // let temp = sortArr[i]
//       // sortArr[i] = sortArr[index]
//       // sortArr[index] = temp
//       // index++
//     }
//   }
//   return {rightArr,leftArr}
// }



// 快速排序的优化，我们可以看到 我们在快速排序中用了leftArr,和rightArr，从算法的角度来说，我们浪费了一个arr数组的空间，假设这个数组有1亿个数据，那我们就会需要2亿个数据的空间来计算。

// 所以我们可以不用数组存储的方式，用临时变量来替换。


// 元素交换法的优化

// function sortQuickFor(tag,arr){
//   let index = 0 // 用index来标记当前左边元素的下标，如果元素大于tag,则不管，如果小于tag,我们通过交换把元素跟index下标的元素进行交换，然后Index++

//   for(let i =0,len=arr.length;i<len;i++){
//     if(arr[i] > tag){
      
//     }else{
//       let temp = arr[i]
//       arr[i] = arr[index]
//       arr[index] = temp
//       index++
//     }
//   }

//   return {leftArr:arr.slice(0,index),rightArr:arr.slice(index)}
// }

// console.log(sortQuick(a))


// 斐波那契数列

// function fib (n){
//   if(n == 1 || n == 2 ){
//     return 1
//   }

//   return fib(n-1)+fib(n-2)
// }

// // 递归优化 利用闭包的特性做缓存
// function fibUp (n){
//   let _ob = []
//   function fibS(n){
//     if(n == 1 || n == 2 ){
//       return 1
//     }
//     if(_ob[n]){
//       return _ob[n]
//     }
//     _ob[n] = fibS(n-1) + fibS(n-2)
//     return _ob[n]
//   }

//   return fibS(n)

// }

// // 动态规划法优化

// function fibUp2(n){

//   // 递归是从上到下
//   // 动态规划，从下到上
//   let _ob = [0,1,1]

//   for(let i =3,len=n;i<=len;i++){
//      _ob[i] = _ob[i-1]+ _ob[i-2]
//   }

//   return _ob[n]

// }


// console.time()
// console.log('递归方法'+fib(40))
// console.timeEnd()


// console.time()
// console.log('递归缓存优化'+fibUp(40))
// console.timeEnd()


// console.time()
// console.log('动态规划优化'+fibUp2(40))
// console.timeEnd()


// 可以看到动态规划要比递归要快，因为避免了函数一层层嵌套调用花费的时间



// 二分查找法

// let arr = [1,2,3,5,7,10,11,13,15,18,20,23,30,40,50,60,66,68]

// function common(arr,key){
//   if(Object.prototype.toString.call(arr) !== "[object Array]"){
//     return 'err'
//   }

//   for(let i= 0,len=arr.length;i<len;i++){
//     if(arr[i] == key){
//       return i
//     }
//   }
// }


// function diff(arr,key){
//   if(Object.prototype.toString.call(arr) !== "[object Array]"){
//     return 'err'
//   }

//   let index = Math.floor(arr.length/2)
//   let tag = arr[index]

//   if(index == key){
//     return index
//   }

//   if(key > tag){
//     diff(arr.slice(index),key)
//   }
  
// }

// console.time()
// console.log('普通查找'+common(arr,20))
// console.timeEnd()

// console.time()
// console.log('二分查找'+diff(arr,20))
// console.timeEnd()



// // 简单哈希表

// class HashTable{
//   constructor(){
//     // 松散的
//     this.table=[]
//   }
//   calcuteHash(key){
//     let hash = 0
//     for(let s of key){
//       hash += s.charCodeAt()
//     }
//     // 0~9的是一个数字
//     return hash*17 % 100
//   }
//   get(key){
//     let hash = this.calcuteHash(key)
//     return this.table[hash]
//   }
//   put(key,val){
//     let hash = this.calcuteHash(key)
//     this.table[hash] = val
//   }
  
// }



// 动态规划 背包问题

// n 数量 w重量数组，v价值数组，ca容量
function pack(w,v,ca,n){

  let T = []
  
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
  findValue(w,v,ca,n,T)
  return 
  
}


pack([2,3,4],[3,4,5],10,3)

//找到需要的物品
function findValue(w,v,ca,n,T){
	var i = n-1, j = ca;
	while ( i > 0 && j > 0 ){
		if(T[i][j] != T[i-1][j]){
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + v[i]);
			j = j- w[i];
			i--;
		}else{
			i--;  //如果相等，那么就到 i-1 行
		}
	}
	if(i == 0 ){
		if(T[i][j] != 0){ //那么第一行的物品也可以取
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + v[i]);
		}
	}
}