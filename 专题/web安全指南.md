# Web安全

## 第一类—XSS
### XSS（跨站脚本攻击）
XSS——Cross site scripting
这是最常见的一种web安全问题。引起这种问题的原因是什么呢？主要是由于不合理的数据引起的。

```
<div>
	{ content }
</div>
```
一般这样的页面结构，我们的页面解析出来的期望是这样的。

```
<div>
	hello world!
</div>
```
但是这个content的数据是类似这样的:< script>alert(1)< /script>
我们的页面可能就成为这样的东西

```
<div>
	<script>alert(1)</script>
</div>
```
这个会发生什么？

它会执行这个alert(1)，得到一个弹窗；如果这个脚本不是alert(1)呢？如果在这里，我执行的是document.cookie,是不是就得到了用户的cookie的信息了？如果这里再用脚本把这个cookie发送到攻击者的服务器呢？这样就会造成很严重的安全问题，你连的用户信息可能都保护不了。

### XSS攻击可以干什么？

 1. 获取页面中的任何数据。
 2. 获取cookies这样的私密信息。
 3. 劫持前端的逻辑。
 4. 向服务端发送请求。
 5. 也可以把获取的敏感信息发送给攻击者。

### 一般什么样的场景下会发生XSS攻击

 - 攻击者得到你的cookie，然后就得到你的登陆状态，可以冒充你发送动态信息，然后你的朋友每个人点击查看你的动态，然后每个人的cookie我都可以劫持，然后进行大量的扩散。
 - 如果网站的表单，我们不进行严格的数据验证，假如我提交的是一个script的脚本，提交过去的代码，你们后台可以进行执行，攻击者完全可以得到你的后台管理网站的cookie以及网站地址，这样我可以做的事情就够多了，比如利用管理人员的权限，做各种各样的事情，比如免费的购物。。

### XSS攻击的分类
从本质上来说，XSS的攻击，是由不合理的数据引起的。比如用户的url参数注入，不合理的表单提交等。

XSS的攻击的分类从来源上说，分两类：

 1. 反射性攻击
 2. 存储型攻击

反射性攻击，攻击的代码主要来源于url的路径参数。

存储型攻击，攻击的代码主要来源是存储到数据库中的脏数据。

### 一个网站中，那些地方是XSS的攻击点。

 - HTML的节点内容。——主要是节点内容不安全，这个内容成为script标签。
 - HTML的属性。——一个比较经典的是onerror事件，主要是下面的一个场景。
 

```
<img src={src} />
```
如果这个src的值是这样的` "1" onerror='javascript:alert(1);'`
这样其实就造成了img的属性变成如下情况：

```
<img src='1' onerror='javascript:alert(111);' />
```
这样造成了跨站脚本攻击。


 - JavaScript代码。——主要是从后台获取的数据，里面包含用户的输入信息，如果这个用户的输入的内容是攻击脚本，就会发生XSS攻击。
 - 富文本的xss攻击。——主要使用黑名单和白名单的方式进行防御跨站脚本攻击。

### XSS预防策略
第一、浏览器本身的防御策略。

比如会自动拦截路径中包含script脚本的链接，但是目前这样的方式完全不能满足xss攻击的防御。

这个主要与http的headers中设置的一项属性相关：

 - "X-XSS-Protection": 0
 - "X-XSS-Protection": 1


第二、使用转义的方式进行防御。

```
//我们可以对数据进行简单的处理(针对HTML属性以及HTML的content)：
function escape(str){
    if(str) return '';
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&#39;');
    str = str.replace(/'/g, '&#32;');
}
```

```
//针对JavaScript
//对数据进行JSON encode.
var data = 123;
JSON.stringify(data);
```

```
//针对富文本
var xssFilter = function(html){
    if(!html) return '';
    var cheerio = require('cheerio');
    var $ = cheerio.load(html);

    //白名单——表示我的保留的富文本是什么？
    var whiteList = {
        'img': ['src']
    }
    $('*').each(function(index, elem){
        if(!whiteList[elem.name]){
            $(elem).remove();
            return
        }

        for(var att in elem.attribs){
            if(whiteList[elem.name].indexOf(att) === -1){
                $(elem).attr(att, null);
            }
        }

        return $.html();
    })
}
```
第三、使用CSP进行防御XSS攻击。
CSP：Content-Security-Plicy，内容安全策略。
用于指定什么内容可以执行。比如用户的输入，我不希望他被执行。

 1. 它是一个headers的头部。规定哪一些来源可以限制。
 2. 比如default-src，如果设置的值为self，那么它只认可自己域名内的文件。

资料详情如下：
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/content_security_policy

## 第二类—CSRF

### 什么是CSRF
Cross site Request Forgy（跨站请求伪造）
主要是我们打开一个钓鱼网站，进去之后，这个钓鱼网站会得到你的信息，比如你的cookie的验证信息。它会在你不知情的情况下，做一些操作。

一般在一些社交、评论等地方，一定要注意CSRF攻击。千万不要随便进去一些钓鱼网站。

一般而言，你的接口是post的话，就相对get安全一点，因为如果是post方式，CSRF只能通过构造表单的方式进行攻击。如果是get方法，那么CSRF就能够更简单的得到信息。

### CSRF的原理是什么

 1. 一个网站会有自己的前端网页和后台接口。
 2. 如果我在自己的网站上进行了登录操作，这个时候我们自己的cookie中已经存储了自己的**用户信息**。
 3. 如果这时候，有一个**第三方的钓鱼网站，只要你点击去**，它会获取你的用户信息，然后在你不知情的情况下，执行了一些操作。

### CSRF的危害有什么

 - 盗取用户信息
 - 用户不知情
 - 完成一些业务请求，盗取用户的资金（转账、消费）。
 - 冒充用户进行发帖等操作

### CSRF的防御

 1. 可以使用对cookie的限制，进行解决CSRF攻击的问题，它可以让其他的网站无法拿到自己的cookie。主要是通过设置 sameSite: 'strict' 的方式进行。缺点：目前这样的方式，有那个兼容性的问题。
 2. 可以使用图形验证码的方式，进行对我们的接口进行验证，原理就是每次提交我们的接口的时候，我们还要提交自己的图形验证码进行验证。缺点：就是用户体验不够好！
 3. 使用token的方式，也就是说，每次我们进行接口请求的时候，我们要在自己的数据请求中携带一个token，然后服务端通过读取token，然后验证这个token。最终我们能够保证接口的安全性。缺点：在前后端分离的情况下，还是无法实时的更新。
 4. 使用referer的方式，进行验证你的接口请求地址的来源，如果这个来源是自己的客户端的地址，那么就可以继续操作相应的东西，如果这个来源不是自己的客户端的请求，直接拦截住。


## 第三类—cookie安全保障

### cookie的特性
如果要认识cookie是如何对web安全很重要，首先你要了解它是什么？

 1. cookie是一种前端的数据存储。
 2. 后端可以通过http头进行设置cookie。
 3. 请求是通过http头传输给后端。
 4. 前端可读写。document.cookie。
 5. 遵守同源策略。（协议、端口、域名都要相同）。

### cookie的应用场景
cookie一般是用来做用户登录状态的验证的。
它有这么几种方式：

 - 服务端设置cookie，把一个用户ID存储在cookie中。
这种方式的缺点就是，不够安全，别人可以随意的冒充！
 - 使用用户id以及签名的方式进行cookie的存储。
这种方式是一种安全的用户签名的方式。
 - 使用sessionid进行cookie的存储。
这种方式是在服务端生成一个sessionId，然后进行cookie的存储。

### cookie与xss、csrf攻击的关联
xss可以偷取用户的cookie信息。
这样的方式，我们可以通过这样的cookie设置方式：

```
http-only: true
```
csrf也是通过对cookie信息的读取，达到攻击网站的目的的。

我们可以通过设置另外一个属性：

```
sameSite: true
```
### cookie的安全策略
第一、签名防篡改

第二、使用加密的方式进行cookie设置

第三、设置http-only属性，防止攻击你的网站。

第四、secure——这个是针对https的一种安全方式。

第五、sameSite。同站点的时候才能读取cookie。

## 第四类—http安全

### http的弊端
Web前端，进行数据请求的方式，一般是使用http的方式进行的，一般而言，http协议的传输是一种明文的方式进行传输。

前端向后端进行http请求，中间会经过各种各样的网关、服务器节点等，最终到达我们的目标服务器。但是在这个中间的每个节点上，只要对象想获取你的http的信息，它是可以随意的进行数据的劫持和篡改的！（这就是http进行明文传输的弊端），最后，服务端向你返回数据的时候，也是通过明文的方式是进行的。

所以，如果传输层的安全不能保证，那么我们的xss、csrf的攻击，我们的防御就是一句空话。

### http窃听危害

 - 可以窃听你的任意敏感信息，只要你的任何敏感信息在网上传输，它都可以把你的信息得到，比如你的支付宝的账号、密码等。

### http篡改危害

 - 可以更改你的网站信息，比如它可以插入广告。
 - 可以重定向你的网站。
 - 你永远不可能防御你的XSS攻击以及CSRF攻击。
 - 广告进行运营商劫持。
 - 公共wifi获取密码，一定要注意，你的信息很可能不安全的。

### https是对http协议的一种解决方案

分析：http被窃听和篡改的唯一原因，就是http是明文传输的。所以我们应该对数据进行加密。

HTTP + TLS（SSL）=> HTTPS

我们对HTTP进行加密，加密的方式就是TLS协议（传输层加密），TLS在之前的叫法就是SSL。

但是也会有这样的一个问题：

浏览器---------中间人------------服务器。

中间人可以解密浏览器的信息，然后加密后发送给服务器。这样也会受到http的窃听和篡改风险。所以这个需要一个非常重要的信任机制——CA证书机制。

解决方案，就是我们非常重要的信任机制。（CA证书机制）。

浏览器会有一个CA证书列表，表示我们的网站是安全的。服务器需要向CA证书发布的机构进行证书申请。得到这个CA证书。那么浏览器访问你的网站的时候，它就会向你的服务对比CA证书的信任情况，如果信任的网站，它就会正常访问。

CA证书必须保证安全的重要原则：

 1. 证书是无法伪造的。
 2. 证书私钥不能被泄漏。
 3. 域名管理权不能泄漏。
 4. CA坚守原则。

通过这样的一些机制，我们就能保证我们的http传输是安全的。


## 第五类—密码安全

### 密码的作用是什么？
就是为了证明“你就是你的问题”。计算机为了识别人的时候，需要密码。

### 密码的泄漏渠道。
数据库被偷

服务器被入侵

通讯被窃听（http协议被窃听）

内部人员泄密

通过撞库的方式

### 密码存储
严禁明文存储（防泄漏）

单向变换

变换复杂度分析

密码复杂度的要求

### 哈希算法
明文-密文————是一一对应的。

雪崩效应————只要明文一点点不一样，密文是完全不一样的。

密文、明文无法反推。

常见的哈希算法：MD5、sha1、sha256。

单向变换彩虹表：可以得到一个MD5的明文和密文之间的对应表。

对抗方式：使用MD5（sha1（明文））这样的方式得到一个密文。

### 密码传输的安全性

 - https进行传输
 - 频率的限制
 - 前端可以做加密，但是意义是有限的

### 生物特征密码

 - 指纹（唇纹）
 - 声纹
 - 虹膜
 - 人脸识别

生物特诊的密码问题：

第一、私密性——容易泄漏

第二、安全性——碰撞

第三、唯一性——终生无法改变



