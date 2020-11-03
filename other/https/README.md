## HTTPS
> 随着 HTTPS 建站的成本下降，现在大部分的网站都已经开始用上 HTTPS 协议。大家都知道 HTTPS 比 HTTP 安全，也听说过与 HTTPS 协议相关的概念有 SSL 、非对称加密、 CA证书等。很多应用平台和接口明确都表明了需要https才能上架或者访问，比如苹果。

配置https:

- 公钥 公开加密方式
- 私钥 存在服务器的唯一解密公钥的方式
- 签名 保证数据的一致性
- 证书 确保当前发送数据单位可信

**https采用非对称加密算法+对称加密算法来保证数据的安全。**
  
**HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201028163226789.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

要学习https我们首先得知道什么是对称加密和非对称加密

对称加密和非对称加密的区别：

- 对称加密：加密解密用同一个密钥，被黑客拦截不安全
- 非对称加密：公钥加密，私钥解密；公钥可以公开给别人进行加密，私钥永远在自己手里，非常安全，黑客拦截也没用，因为私钥未公开。著名的RSA加密算法用的就是非对称加密。


---

### HTTPS的流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201028180519425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

- 证书验证阶段
	-  1）浏览器发起 HTTPS 请求；
    -  2）服务端返回 HTTPS 证书；
    -  3）客户端验证证书是否合法，如果不合法则提示告警。
- 数据传输阶段
	- 1）当证书验证合法后，在本地生成随机数；

	- 2）通过公钥加密随机数，并把加密后的随机数传输到服务端；

	- 3）服务端通过私钥对随机数进行解密；

	- 4）服务端通过客户端传入的随机数构造对称加密算法，对返回结果内容进行加密后传输。

---

### 为什么HTTPS要用两种方式？
一、为什么数据传输要用对称加密？  

非对称加密的加解密效率是非常低的，而 http 的应用场景中通常端与端之间存在大量的交互，非对称加密的效率是无法接受的 ，所以数据传输用对称加密

### 为什么需要从CA（认证机构）获取证书

首先我们假设不存在认证机构，任何人都可以制作证书，这带来的安全风险便是经典的“中间人攻击”问题。


中间人攻击的流程图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201028192202822.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MDczODg1,size_16,color_FFFFFF,t_70#pic_center)

加入CA的证书验证，就可以在第2步杜绝被中间人劫持的操作。

浏览器发起 HTTPS 请求时，服务器会返回网站的 SSL 证书，浏览器需要对证书做以下验证

### 如何验证证书的合法性

服务器会返回网站的 SSL 证书，浏览器会对证书做以下验证：

- 验证域名、有效期等信息是否正确
- 判断证书来源是否合法
- 判断证书是否被篡改
- 判断证书是否已吊销

只有全部通过才能合法。