### AST（抽象语法树）

在计算机科学中，抽象语法树（abstract syntax tree 或者缩写为 AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。


无论是LL(1)文法，还是LR(1)，或者还是其它的方法，都要求在语法分析时候，构造出相同的语法树，这样可以给编译器后端提供了清晰，统一的接口。即使是前端采用了不同的文法，都只需要改变前端代码，而不用连累到后端。即减少了工作量，也提高的编译器的可维护性。

--- 


抽象语法树有什么用呢？

- IDE的错误提示、代码格式化、代码高亮、代码自动补全等
- JSLint、JSHint、ESLint对代码错误或风格的检查等
- webpack、rollup进行代码打包等
- Babel 转换 ES6 到 ES5 语法
- 注入代码统计单元测试覆盖率


---

AST是如何生成的？

能够将JavaScript源码转化为抽象语法树（AST）的工具叫做JS Parser解析器。
JS Parser的解析过程包括两部分  

词法分析（Lexical Analysis）：词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流。   
语法分析（Syntax Analysis）：  语法分析阶段会把一个令牌流转换成 AST 的形式。 这个阶段会使用令牌中的信息把它们转换成一个 AST 的表述结构，这样更易于后续的操作。


你会留意到 AST 的每一层都拥有相同的结构：
```

{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}

```
```
{
  type: "Identifier",
  name: ...
}
```
```
{
  type: "BinaryExpression",
  operator: ...,
  left: {...},
  right: {...}
}
```


---

手写一个简易babel转化。


Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

解析
解析步骤接收代码并输出 AST。 这个步骤分为两个阶段：词法分析（Lexical Analysis）和 语法分析（Syntactic Analysis）

转换

转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。 这是 Babel 或是其他编译器中最复杂的过程 

生成

生成啊其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

我们做一个对加法进行处理的简单程序。

首先先去网站[https://astexplorer.net/](https://astexplorer.net/) 得到`var a = 1 + 1`的AST语法树.

```
{
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 11,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "a"
          },
          "init": {
            "type": "BinaryExpression",
            "start": 8,
            "end": 11,
            "left": {
              "type": "Literal",
              "start": 8,
              "end": 9,
              "value": 1,
              "raw": "1"
            },
            "operator": "+",
            "right": {
              "type": "Literal",
              "start": 10,
              "end": 11,
              "value": 1,
              "raw": "1"
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
}

```
然后写babel代码。babel转化需要三步。（解析--转换--生成）

```
//引入工具包
const esprima = require('esprima');//JS语法树模块
const estraverse = require('estraverse');//JS语法树遍历各节点
const escodegen = require('escodegen');//JS语法树反编译模块
const fs = require('fs');//读写文件


const before = fs.readFileSync('./test.js', 'utf8');
const ast = esprima.parseScript(before); // 解析

estraverse.traverse(ast, { // 转换
  enter: (node) => {
    if(node.type == 'BinaryExpression'){
      var num = toEqual(node);//把 1+1 改成2
      Object.assign(node,{
        "type": "Literal",
        "value": num,
        "raw":num
      })
      
    }
  }
});


const code = escodegen.generate(ast); 
//写入文件  生成
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
fs.writeFileSync('./after.js', code, 'utf8');


function toEqual(node){
 if(node.operator == '+'){
   return node.left.value + node.right.value
 }
}



```

新建一个test.js，里面写入var a = 1 + 2

运行代码，可以看到after.js文件,里面是a = 3

这样我们就简易的写了个babel的实现原理。

其实babel也是这么做的，只不过它的转换规则函数相当的复杂，因为需要考虑各种JavaScript的语法情况，工作量巨大，这也就是babel最核心的地方。

---

a.b 和 a['b'] 谁的速度快？


在V8引擎中，js从源代码到机器码的转译主要有三个步骤：Parser（AST） ->Ignition（Bytecode）->TurboFan（Machine Code）

- Parser：负责将JavaScript源码转换为Abstract Syntax Tree (AST)
- Ignition：interpreter，即解释器，负责将AST转换为Bytecode，解释执行Bytecode；同时收集TurboFan优化编译所需的信息，比如函数参数的类型
- TurboFan：compiler，即编译器，利用Ignitio所收集的类型信息，将Bytecode转换为优化的汇编代码


