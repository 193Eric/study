### 代码规范

> 这里写一个简化版，具体的完整版可以去我的github [前端代码规范]("https://github.com/193Eric/web-guide")

#### 一、规范目的

为提高团队协作效率，便于前端后期优化维护，提高代码可读性、可维护性、代码质量。

#### 二、基本准则

1. 符合web标准，结构表现行为分离，兼容性优良。
2. 页面性能方面，代码要求简洁明了有序， 尽可能的减小服务器负载，保证最快的解析速度。
3. 项目的维护和二次开发可能是直接或间接的团队合作，所以创建易维护的代码是一个项目成功与否的关键，易维护的代码意味着具有如下特性：
  * 阅读性好：如良好的注释和命名规范，有文档
  * 具有一致性：看起来如同一个人编写
  * 代码的松耦合，高度模块化：将页面内的元素视为一个个模块，相互独立，尽量避免耦合过高的代码，从html,css,js三个层面都要考虑模块化
  * 严格按照规范编写代码

#### 三、JS规范

##### 1.命名规范


##### 目的

提高代码可预测性和可维护性的方法是使用命名约定，这就意味着采用一致的方法来对变量和函数进行命名

##### 构造函数（类）命名

首字母大写，驼峰式命名。

```js
  let man = new Person();
```

##### 变量命名

变量名包括全局变量，局部变量，类变量，函数参数
首字母小写，驼峰式(Camel)命名，匈牙利命名
如：`checkCount` 表示整形的数值

##### 常量

使用全部字母大写，单词间下划线分隔的命名方式。

```js
  let HTML_ENTITY = {};
```

##### 函数, 函数的参数

使用 Camel 命名法。

```js
  function stringFormat(source) {}
  function hear(theBells) {}
```

##### 类相关

类：使用 Pascal 命名法(首字母大写的Camel命名法)
类的 方法 / 属性, 使用 Camel 命名法

```js
  function TextNode(value, engine) {
    this.value = value;
    this.engine = engine;
  }

  TextNode.prototype.clone = function () {
    return this;
  };
```

##### 由多个单词组成的 缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。

```js
  function XMLParser() {}

  function insertHTML(element, html) {}

  let httpRequest = new HTTPRequest();
```

#### 命名语法

1. 类名，使用名词

```js
  function Engine(options) {}
```

2. 函数名，使用动宾短语

```js
  function getStyle(element) {}
```

3. boolean 类型的变量使用 is 或 has 开头

```js
  let isReady = false;
  let hasMoreCommands = false;
```

4. Promise 对象用动宾短语的进行时表达。

```js
  let loadingData = ajax.get('url');
  loadingData.then(callback);
```

##### 例外情况

以根据项目及团队需要，设计出针对项目需要的前缀规范，从而达到团队开发协作便利的目的。
作用域不大临时变量可以简写，比如：`str，num，bol，obj，fun，arr`。
循环变量可以简写，比如：`i，j，k`等。
某些作为不允许修改值的变量认为是常量，全部字母都大写。例如：`COPYRIGHT，PI`。常量可以存在于函数中，也可以存在于全局。必须采用全大写的命名，且单词以_分割，常量通常用于ajax请求url，和一些不会改变的数据。

##### 函数命名

1. 普通函数：首字母小写，驼峰式命名，统一使用动词或者动词+名词形式

```js
  getVersion() // 获得版本号
  submitForm() // 提交表单
  init()  // 初始化
```

2. 涉及返回逻辑值的函数可以使用is，has，contains等表示逻辑的词语代替动词

```js
  isObject() // 是否对象
  hasClass('xx') // 有xx对象吗
  containsElment('xx') // 包含xx元素吗
```

3. 事件句柄函数，可以在上面的函数名添加*handler*前缀

```js
  handlerGetVersion()
  handlerSubmitForm()
```

#### 三、HTML代码规范

[谷歌html代码规范]("https://google.github.io/styleguide/htmlcssguide.html")


#### 四、CSS代码规范

人们问我最多的问题之一是在CSS类名中“__”和“--”是什么意思？它们的出现是源于[BEM](https://en.bem.info/)和[Nicolas Gallagher...](http://twitter.com/necolas)

BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

重要的是要注意，我使用的基于BEM的命名方式是经过Nicolas Gallagher修改过的。这篇文章中介绍的这种命名技术并不是原始的BEM，但却是一个我更喜欢的改进版。无论实际使用了什么样的符号，它们其实都是基于同样的BEM原则。

命名约定的模式如下：

```css
  .block{}  
  .block__element{}  
  .block--modifier{}  
```

.block 代表了更高级别的抽象或组件。
.block__element 代表.block的后代，用于形成一个完整的.block的整体。
.block--modifier代表.block的不同状态或不同版本。
之所以使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定，如：
在CODE上查看代码片派生到我的代码片

```css
  .site-search{} /* 块 */  
  .site-search__field{} /* 元素 */  
  .site-search--full{} /* 修饰符 */
```

BEM的关键是光凭名字就可以告诉其他开发者某个标记是用来干什么的。通过浏览HTML代码中的class属性，你就能够明白模块之间是如何关联的：有一些仅仅是组件，有一些则是这些组件的子孙或者是元素,还有一些是组件的其他形态或者是修饰符。我们用一个类比/模型来思考一下下面的这些元素是怎么关联的：

在CODE上查看代码片派生到我的代码片

```css
  .person{}  
  .person__hand{}  
  .person--female{}  
  .person--female__hand{}  
  .person__hand--left{}
```

顶级块是‘person’，它拥有一些元素，如‘hand’。一个人也会有其他形态，比如女性，这种形态进而也会拥有它自己的元素。下面我们把他们写成‘常规’CSS:

在CODE上查看代码片派生到我的代码片

```css
  .person{}
  .hand{}
  .female{}
  .female-hand{}
  .left-hand{}
```

这些‘常规’CSS都是有意义的，但是它们之间却有些脱节。就拿.female来说，是指女性人类还是某种雌性的动物？还有.hand，是在说一只钟表的指针（译注：英文中hand有指针的意思）？还是一只正在玩纸牌的手？使用BEM我们可以获得更多的描述和更加清晰的结构，单单通过我们代码中的命名就能知道元素之间的关联。BEM真是强大。

再来看一个之前用‘常规’方式命名的.site-search的例子：

```html
  <form class="site-search  full">  
    <input type="text" class="field">  
    <input type="Submit" value ="Search" class="button">  
  </form>
```

这些CSS类名真是太不精确了，并不能告诉我们足够的信息。尽管我们可以用它们来完成工作，但它们确实非常含糊不清。用BEM记号法就会是下面这个样子：

```html
  <form class="site-search  site-search--full">  
    <input type="text" class="site-search__field">  
    <input type="Submit" value ="Search" class="site-search__button">  
  </form>
```

我们能清晰地看到有个叫.site-search的块，他内部是一个叫.site-search__field的元素。并且.site-search还有另外一种形态叫.site-search--full。

我们再来举个例子……

如果你熟悉OOCSS（面向对象CSS），那么你对media对象一定也不陌生。用B__E--M的方式，media对象就会是下面这个样子：

```css
  .media{}  
  .media__img{}  
  .media__img--rev{}  
  .media__body{}
```

从这种CSS的写法上我们就已经知道`.media__img` 和 `.media__body`一定是位于.media内部的，而且`.media__img--rev`是`.media__img`的另一种形态。仅仅通过CSS选择器的名字我们就能获取到以上全部信息。

BEM的另外一个好处是针对下面这种情况：

```html
  <div class="media">  
    <img src="logo.png" alt="Foo Corp logo" class="img-rev">  
    <div class="body">  
      <h3 class="alpha">Welcome to Foo Corp</h3>  
      <p class="lede">Foo Corp is the best, seriously!</p>  
    </div>  
  </div>
```

光从上面的代码来看，我们根本不明白.media和.alpha两个class彼此之间是如何相互关联的？同样我们也无从知晓.body和.lede之间，或者.img-rev 和.media之间各是什么关系？从这段HTML（除非你对那个media对象非常了解）中我们也不知道这个组件是由什么组成的和它还有什么其他的形态。如果我们用BEM方式重写这段代码：

```html
  <div class="media">  
    <img src="logo.png" alt="Foo Corp logo" class="media__img--rev">  
    <div class="media__body">  
      <h3 class="alpha">Welcome to Foo Corp</h3>  
      <p class="lede">Foo Corp is the best, seriously!</p>  
    </div>  
  </div>
```

我们立马就能明白`.media`是一个块，`.media__img--rev`是一个加了修饰符的`.media__img`的变体，它是属于`.media`的元素。而`.media__body`是一个尚未被改变过的也是属于.media的元素。所有以上这些信息都通过它们的class名称就能明白，由此看来BEM确实非常实用。


#### 五、GIT规范


> `master`是主分支，开发分支直接从`master`切出来，这样可以尽可能的简单，避免和第三个分支有关联
> 通过`mr`将开发分支合并到`master`，同时发起`Code Review`

##### 目录

  1. [分支命名](#分支命名)
  1. [注释编写](#注释编写)
  1. [提交次数管理](#提交次数管理)

##### 分支命名

  1. 新特性： `feature/xxx-saidzhu`
  1. 线上紧急bug修复： `hotfix/xxx-saidzhu`
  1. 测试公用分支： `test`

##### 注释编写

  1. 如果是新增特性的： `Feat:`开头
  1. 若果是清理无用代码，文件：`Clear:`开头
  1. bug修复：`Fix:`开头
  1. 初始化项目：`Init:`开头
  1. 重构代码：`Refactor:`开头

##### 提交次数管理

  1. 一次特性开发竟可能按照开发模块来提交,中间如果一个模块有多次提交，可以通过`git rebase` 来合并相关的几次提交