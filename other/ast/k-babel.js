//引入工具包
const esprima = require('esprima');//JS语法树模块
const estraverse = require('estraverse');//JS语法树遍历各节点
const escodegen = require('escodegen');//JS语法树反编译模块
const fs = require('fs');//读写文件


const before = fs.readFileSync('./test.js', 'utf8');
const ast = esprima.parseScript(before);

estraverse.traverse(ast, {
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
//写入文件
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
fs.writeFileSync('./after.js', code, 'utf8');


function toEqual(node){
 if(node.operator == '+'){
   return node.left.value + node.right.value
 }
}


