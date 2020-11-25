### 测试分类
常见的开发流程里面，都有测试人员，这种我们称之为黑盒测试。测试人员并不需要去管实现机制，只看最外层的输入输出。比如一个计算机加法页面，设计人员会设计n个case，去测试该加法的正确性。这种如果我们开发人员用代码去做的话，我们称之为e2e测试。

还有一种测试叫白盒测试。我们针对⼀些内部机制的核⼼逻辑，使⽤代码进行编写，我们称之为单元测试。

其实我们代码里面的console.log，也算是一种测试的雏形。

---


### 测试的好处

组件的单元测试有很多好处:

- 提供描述组件⾏行行为的⽂文档 
- 节省⼿手动测试的时间
- 减少研发新特性时产⽣生的 bug 
- 改进设计
- 促进重构

**⾃动化测试使得⼤团队中的开发者可以维护复杂的基础代码。让你改代码不再⼩心翼翼**

------


### 单元测试
>单元测试(unit testing)，是指对软件中的最⼩可测试单元进行检查和验证

在vue项目中，我们可以看到vue-cli推荐两种单测方式：Mocha+chai 或者jest，我们这里使⽤jest演示，他们的语法基本⼀致， 新建`kaikeba.spec.js`，`.spec.js`是命名规范。[jest文档](https://www.jestjs.cn/docs/)

Jest api介绍：

- describe : 定义⼀个测试套件 
- it :定义⼀个测试用例
- expect :断⾔的判断条件 
- toBe :断言的⽐较结果

jest 也有多种方式，可以直接在测试文件中写一个的test或it用来测试，也可以使用describe 函数，创建一个测试集，再在describe里面写test或it 。  

在jest中，it和test 是一样的功能，它们都接受两个参数，第一个是字符串，对这个测试进行描述，需要什么条件，达到什么效果。第二个是函数，函数体就是真正的测试代码，jest 要执行的代码

如果测试代码涉及到接口和数据库数据访问，可以考虑两种方案：

1.制作假数据。

2.制作单元测试数据库。


#### 测试函数

写一下代码：

```
// example.spec.js
function testAdd(x,y){

  return x+y
}


describe('test add', () => {
  it("1 + 2 equal 3",()=>{
    expect(testAdd(1,'2')).toBe(3)
  })
})

```

执行`npm run test:unit`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125174128979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
可以看到我们的加法函数，并不满足字符串和数字相加。所以得到了报错信息。

现在我们修改下代码：

```
function testAdd(x,y){
  return (x-0)+(y-0)
}
```

在运行一下代码 `npm run test:unit`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125174912316.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


#### 测试Vue组件

修改下HelloWorld组件：

```
// src/components/HelloWorld.vue

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg:'new message'
    }
  },
  mounted(){
    this.msg = 'msg mounted'
  }
}
</script>
```

```
// example.spec.js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('测试挂载成功后，msg的数值', () => {
    
    const wrapper = mount(HelloWorld, )
    
    expect(wrapper.vm.msg).toBe('msg mounted')



  })
})
```
其中shallowMount是vue官方给的单元测试库里面的。链接地址：[https://vue-test-utils.vuejs.org/zh/api/](https://vue-test-utils.vuejs.org/zh/api/)，里面有很多专门为vue单元测试写的方法。


运行一下`npm run test:unit`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125181158999.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
可以看到测试成功，msg = 'msg mounted'。


#### 测试覆盖率

jest⾃自带覆盖率，如果⽤的mocha，需要使⽤istanbul来统计覆盖率 package.json⾥修改jest配置

```
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": ["src/**/*.{js,vue}"]
  }
```

然后用上面组件的案例再运行一次

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125182809652.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
可以看到hellowolrd组件我们是全覆盖。

--- 

### E2E测试

>E2E（End To End）即端对端测试，属于黑盒测试，通过编写测试用例，自动化模拟用户操作，确保组件间通信正常，程序流数据传递如预期。

由于vue-cli是支撑安装cypress测试框架的，我们直接安装下来用。 [cypress文档](https://docs.cypress.io/api/api/table-of-contents.html)


#### 测试鼠标点击

同样我们编写一个test.js(e2e不需要特殊的命名)来作为测试代码，总体语法还是和单测一样，只是里面用了cypress的方法。：

```
// test.js
describe('E2E测试案例', () => {
  it('测试点击事件', () => {
    cy.visit('/') 
    cy.contains('h1', 'msg mounted')

    cy.get('button').click() 
    cy.contains('h1', 'click msg')

  })
})

```

然后修改下HelloWorld组件代码，新增一个点击按钮，并且点击过后msg值进行修改：

```
// src/components/HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="msg = 'click msg'">button</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg:'new message'
    }
  },
  created(){

  },
  mounted(){
    this.msg = 'msg mounted'
  }
}
</script>
```

好了，运行一下`npm run test:e2e`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125183845428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
运行成功之后会弹出，上面这个浏览器框。点击test.js或者Run all specs 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125184203248.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
这就是e2e展示的测试页面了，当你的鼠标移动到左边的代码框部分，就可以看到每行执行的结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125184317810.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


---


### TDD（测试驱动开发）

> TDD测试驱动开发，通过所有测试案例，开发就完成了。

TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程

TDD
- 先写测试代码
- 跑测试，测试飘红
- 写功能，等测试绿了，功能开发完毕
- 会写很多测试代码
- 需要人力很多

前端开发中，TDD用的很少。

---

### 写在结尾的一些话

#### 为什么需要写测试

测试范围包括web端、APP端。一轮测试下来，测试所花费的时间是极大的，随之而来问题也就来了：加班测试、版本发布时间受阻、考虑不周全而漏测功能等等。

粗略算了一下，假设半月迭代一次，每次迭代需要5轮测试，人工回归一次就需要5个小时，最终确定一年下来，自动化为你省去600个小时，也就是75个工作日，同时也省去了测试旧功能要吐的烦恼以及人疲惫下产生的错误。


1.写测试很耗时间。等于用时间换项目质量。后期节省时间

举个例子：第一次上线要测试登录注册功能，下次代码提交后，可能就改了登录注册的文案，但是对测试来说还要测试一遍登录注册功能。

2.一些vue，react,网上的一些成熟库，都有测试代码，而且测试代码 > 项目代码。

3.我们可以把自动化测试放在工程化里面，保证代码质量。

` Husky git hook` ,在git的某个阶段执行命令，例如：

```
// package.json

{
    "husky":{
        "hooks":{
            "pre-commit":"npm test",
            "pre-push":"npm test"
        }
    }
}

```

用这个配合自动化测试代码，限制代码提交。

除了放在git hook，我们还能在CI/CD云端构建里面运行测试代码，不通过就不能合并发布。保证代码和项目质量。

#### 哪些地方要写测试代码

1 开源项目必须完备，测试代码 覆盖率80%

2 日常开发，通用模块要测试开发（单测）工具函数，组件，组件库。

3 e2e日常开发写的不多，建议测试人员写。


#### 开发时间不够，不写测试代码

几条建议：

- 如果公司占满了你的工作时间，这工作不太合适。
    
- 每天都开发api项目，开发十年也就是个10几k水平
    
- 做一个有潜力的前端，知识体系要完善。
    
- 业余时间 学习+高质量开源


#### node 怎么做自动化测试

node也可以通过jest来写测试代码，jest是支持的，但是Node的话，因为都是涉及到接口的访问，所以我们需要一些别的库：

- supertest （访问接口）
- assert（断言库）

