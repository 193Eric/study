### 数据埋点分析

埋点是网站和APP等产品进行日常改进及数据分析的数据采集基础，我们主要用来采集用户行为数据（例如：页面访问路径，点击了哪一个按钮）进行数据分析，从而让运营同学更加合理的安排运营计划让产品经理更好的优化产品路径。每个公司的情况不同，大的公司有自己的数据分析系统，很多公司都会采用第三方的数据分析平台来进行数据收集和分析。  

这里我们比较省事，直接用google Analytics来做的数据埋点,建议大家如果不是特别大的公司，或者特殊的需求，还是用第三方的。

这里我们主要介绍Google Analytics

简单的说它是谷歌推出的服务于广大站长的一款统计工具，它可以详细的让你知道很多数据，例如：

- 那些国家和地区的人访问了你网站
- 那些网站页面是最受欢迎的
- 网站的流量来源有哪些
- 每个访客的停留时间是多少
- 网站访客的年龄段分布
- 访客是通过什么设备（pc或者移动端）的

安装Google Analytics

首先访问 [https://analytics.google.com](https://analytics.google.com) 注册一个账号

然后点击`跟踪代码`目录，GA会让你把一段代码插入到前端代码`<head>`里面。插入过这段代码的页面会跟GA建立联系。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201021184723485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)
在前端代码`<head>`植入好之后，点开实时就可以看到数据了。

这里面有一个事件，事件是我们主动设置的事件，然后再代码中去触发它，GA这边能接收到。日常统计中，最常用的就是这个功能了，可以统计用户的点击行为，或者领取什么行为，甚至是统计接口请求。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020102118494017.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)


接下来是流量获取。这里可以细分数据来源，如果你投放了广告，可以精确到是那个关键字或者那条广告为你带来的客户，以及她/他在站内的一些行动情况。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201021190013138.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

再接下来就是行为数据。会提供用户在站内的行为数据，所有浏览路径及与网站互动数据，并提供网站速度情况。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201021190049969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

转化数据。那些被判定为转化行为需要我们自己定义，GA会根据我们的定义进行数据跟踪，转化的数据及路径情况会在这里呈现。
这个功能主要是为了运营设置的，一般投放广告之后，我们想知道转化率是多少，可以从这里设置，并且直观的看到数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020102119031635.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)