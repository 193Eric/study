### 为什么要用虚拟dom

DOM操作很慢，轻微的操作都可能导致⻚面重新排版，非常耗性能。相对于DOM对象（dom对象打印出来很大，很难diff），js对象 处理起来更快，而且更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行dom 操作，从而提高性能。

React中用JSX语法描述视图，~~通过babel-loader转译后它们变为React.createElement(...)形式~~ ，React 17中的 JSX 转换不会将 **JSX** 转换为 **React.createElement**，而是自动从 React 的 package 中引入新的入口函数并调用。该函数将生成vdom来描述真实dom。将来如果状态变化，vdom将作出相应变化，再通过diff算法

对比新老vdom区别从而做出最终dom操作。

---

### JSX

1. 什么是JSX 语法糖

   React 使用 JSX 来替代常规的 JavaScript。

   JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。

2. 为什么需要JSX

   开发效率:使用 JSX 编写模板简单快速。
    执行效率:JSX编译为 JavaScript 代码后进行了优化，执行更快。 类型安全:在编译过程中就能发现错误。

3. React 16原理:babel-loader会预编译JSX为React.createElement(...)

4. React 17原理:React 17中的 JSX 转换不会将 **JSX** 转换为 **React.createElement**，而是自动从 React 的 package 中引入新的入口函数并调用。另外此次升级不会改变 JSX 语法，旧的 JSX 转换也 将继续工作。

5. 与vue的异同:

   react中虚拟dom+jsx的设计一开始就有，vue则是演进过程中才出现的 jsx本来就是js扩展，转义过程简单直接的多;vue把template编译为render函数的过程需要 复杂的编译器转换字符串-ast-js函数字符串

--- 

### react 核心api

核心api: 

- React.Component:实现自定义组件 
- ReactDOM.render:渲染真实DOM

**render()**

```
  ReactDOM.render(element, container[, callback])
```

当首次调用时，容器节点里的所有 **DOM** 元素都会被替换，后续的调用则会使用 **React** 的 **DOM** 差分算 法(**DOM di****ffi****ng algorithm**)进行高效的更新。

```
如果提供了可选的回调函数，该回调将在组件被渲染或更新之后被执行
```

#### react节点类型
- 文本节点
-  HTML标签节点 
- 函数组件 
- 类组件

- **Fragments**

React 中的一个常⻅模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  )
 }
```

**ReactDOM.render** 实现

```
// vnode 虚拟dom节点
// node dom节点

// * vnode

// type 原生标签 string
//      文本节点 没有type
//      函数组件 函数
//      类组件   类
// props 属性 如className 、 href、 id、children等
//

// *

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  
  //  step1 vnode->node
  const node = createNode(vnode);
  // step2
  container.appendChild(node);
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

// 根据虚拟dom节点，生成真实dom节点
// 这里需要注意的就是节点类型，因为不同节点渲染方式不同
function createNode(vnode) {
  let node;

  const {type} = vnode;

  // todo 根据虚拟dom节点，生成真实dom节点
  if (typeof type === "string") {
    // 原生标签节点， div\a
    node = updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    // 文本标签节点
    node = updateTextComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    // 处理fragment
    node = updateFragmentComponent(vnode);
  }

  return node;
}

// 更新真实dom节点属性，className、id、href
// 源码中需要处理的就复杂了，比如style、合成事件
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

// 原生标签节点，div、a
function updateHostComponent(vnode) {
  const {type, props} = vnode;
  const node = document.createElement(type); //真实dom节点
  updateNode(node, props);
  reconcileChildren(node, props.children);
  return node;
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 返回node
// 执行函数就行啦
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const child = type(props);
  // vnode -> node
  const node = createNode(child);
  return node;
}

// 返回node
// 先实例化
// 再执行render函数
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();
  // vnode -> node
  const node = createNode(child);
  return node;
}

// 返回node
function updateFragmentComponent(vnode) {
  // ! 源码当中并没有使用createDocumentFragment，而是直接处理子节点
  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
  return node;
}

//遍历子节点，子节点是vnode，然后再vnode->node,再插入parentNode中
// 遍历执行render
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // vnode->node, 再把node插入到parentNode
    render(child, parentNode);
  }
}

export default {render};

```



**Component** 实现



```
export default function Component(props) {
  this.props = props;
}
Component.prototype.isReactComponent = {};

```


--- 

###  Diff
diff算法 :

算法复杂度O(n) 

diff策略:

1. 同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。

2. 拥有不同类型的两个组件将会生成不同的树形结构。

   例如:div->p, CompA->CompB

3. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定;

Diff过程:

比对两个虚拟**dom**时会有三种操作:删除、替换和更新 vnode是现在的虚拟dom，newVnode是新虚拟dom。

- 删除:newVnode不存在时

- 替换:vnode和newVnode类型不同或key不同时 
- 更新:有相同类型和key但vnode和newVnode不同时 
- 在实践中也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能


--- 

### fiber

为什么需要fiber

- 对于大型项目，组件树会很大，那遍历的成本也会高，会造成主线程持续被占用，结果就是主线程上的布局，动画等周期性的任务无法得到立即的处理，造成视觉上的卡顿，影响用户体验。为了给任务划定优先级，所以需要fiber。
- 任务分解
- 增量渲染（把渲染任务拆成块，匀到多帧）
- 更新时能暂停，终止，复用渲染任务
- 给不同类型的更新赋予优先级
- 并发方面新的基础能力
- 更流畅 下图任务更新图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201221120330716.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70)


什么是fiber?

fiber是指组件上将要完成或者已经完成的任务，每个组件可以一个或者多个



实现fiber

fiber结构

```
type 类型
props属性
child 第一个子节点
sibling 下一个兄弟节点
return 父节点
stateNode 原生标签的dom节点
```

**`window.requestIdleCallback()`**方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间`timeout`，则有可能为了在超时前执行函数而打乱执行顺序。



Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。

一个更新过程可能被打断，所以React Fiber一个更新过程被分为两个阶段(Phase):第一个阶段 Reconciliation Phase和第二阶段Commit Phase。

在第一阶段Reconciliation Phase，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的；但是到了第二阶段Commit Phase，那就一鼓作气把DOM更新完，绝不会被打断。



Fiber的原理就是通过requestIdleCallback，这个api，把更新过程碎片化（把dom更新，拆成碎片，可以逐步去渲染），每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。

Fiber实现：

```

// *
// fiber 结构
// type 类型
// props 属性
// child 第一个子节点 fiber
// sibling 下一个兄弟节点 fiber
// return 父节点 fiber
// stateNode 原生标签的dom节点
// *

// wipRoot 正在工作的fiber的跟节点
let wipRoot = null;
function render(vnode, container) {
  wipRoot = {
    type: "div",
    props: {
      children: {...vnode}
    },
    stateNode: container
  };
  nextUnitOfWork = wipRoot;
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

// 给原生标签 创建dom节点
function createNode(workInProgress) {
  const {type, props} = workInProgress;
  let node = document.createElement(type);
  updateNode(node, props);

  return node;
}

// 更新真实dom节点属性，className、id、href
// 源码中需要处理的就复杂了，比如style、合成事件
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach(k => {
      if (k === "children") {
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else {
        node[k] = nextVal[k];
      }
    });
}

// 原生标签节点，div、a
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    // 创建dom节点
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);
  console.log("workInProgress", workInProgress); //sy-log
}

// 函数组件
// 拿到子节点，然后协调
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const child = type(props);

  reconcileChildren(workInProgress, child);
}

function updateClassComponent(workInProgress) {
  const {type, props} = workInProgress;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(workInProgress, child);
}

function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 协调子节点
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  // 记录上一个fiber节点（就是哥哥或者姐姐）
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];

    let newFiber = {
      type: child.type,
      props: {...child.props},
      child: null,
      sibling: null,
      return: workInProgress,
      stateNode: null
    };

    if (i === 0) {
      // newFiber 是workInProgress第一个子fiber
      workInProgress.child = newFiber;
    } else {
      // sibling是下一个兄弟节点
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

// 下一个要渲染更新的任务 fiber
let nextUnitOfWork = null;
// work in progress

function performUnitOfWork(workInProgress) {
  //step1:  渲染更新fiber
  // todo

  const {type} = workInProgress;
  if (typeof type === "string") {
    // 原生标签节点
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateFragmentComponent(workInProgress);
  }

  // step2: 并且返回下一个(王朝的故事)
  // 有长子
  if (workInProgress.child) {
    return workInProgress.child;
  }
  let nextFiber = workInProgress;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 渲染更新fiber，并且返回下一个
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }
  // step1  渲染更新自己
  // todo
  // vode->node, node更新到container
  //怎么拿到 parentNode

  let parentNodeFiber = workInProgress.return;
  // fiber节点不一定有dom节点，比如fragment、Consumer
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.stateNode;

  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  // step2 渲染更新子节点
  commitWorker(workInProgress.child);
  // step3 渲染更新sibling
  commitWorker(workInProgress.sibling);
}

export default {render};

```

--- 

### Hook

react之前有动态状态改变的，都是用类组件，因为函数组件没法用数据来控制展示。



1. Hooks是什么?为了拥抱正能量函数式

2. Hooks带来的变革，让函数组件有了状态和其他的React特性，可以替代class



#### 没有破坏性改动

在我们继续之前，请记住 Hook 是:

完全可选的。 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必 现在就去学习或使用 Hook。
 **100%** 向后兼容的。 Hook 不包含任何破坏性改动。
 现在可用。 Hook 已发布于 v16.8.0。

#### 没有计划从 **React** 中移除 **class**。

**Hook** 不会影响你对 **React** 概念的理解。 恰恰相反，Hook 为已知的 React 概念提供了更直接的 API: props， state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组 合他们。

**Hook**解决了什么问题

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正 在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问 题似曾相识。

```
在组件之间复用状态逻辑很难
```

React 没有提供将可复用性行为“附加”到组件的途径(例如，把组件连接到 store)。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类 方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中 观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成 的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题: React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook** 使你在无需修改 组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。