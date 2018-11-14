# node爬虫：爬取爱奇亿的电影


## 这一篇主要是讲node爬虫怎么实现

**通过nodejs脚本语言来爬取指定网站数据**

**1. 引入工具**  
首先我们依赖两个工具(**cheerio**,**request**)  

```javascript
    const request = require('request');
    const cheerio = require('cheerio');
```

**2. 通过工具用jq的调用方式去获取页面指定信息**  

cheerio使用jq的写法来获取页面元素内的信息。比如 :  

```javascript
    request(url, function (error, response, body) {
        let $ = cheerio.load(body); //先声明一个$ 、body是通过request获取的到的页面string
        $('.list_item') // 类似于这个 就是获取到class为 list_item的所有元素
    }
```

通过cheerio加上request我们可以很方便的获取到页面的指定元素信息。  

用过jq的同学可以很方便的上手，我们只需要去网页上查看该网页的class 和id元素，然后通过代码直接获取，就可以爬取指定网页的数据了。 

## 总结

这一篇只是讲爬虫的简单应用，对于我们爬取一般网站的数据已经够用了。 案例里面是一个爬取安奇艺官网的指定电影的名称、图片、链接。之后有什么更复杂的爬虫
的需要，我们可以在案例里面一点点添加。

## 相关链接

- [npm cheerio](https://www.npmjs.com/package/cheerio)
- 


