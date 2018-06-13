###XSS（跨站脚本攻击）
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

它会执行这个alert(1)，得到一个弹窗；如果这个脚本不是alert(1)呢？如果在这里，我执行的是document.cookie,是不是就得到了用户的cookie的信息了？如果这里再用脚本把这个cookie发送到攻击者的服务器呢？

###XSS攻击可以干什么？

 1. 获取页面中的任何数据。
 2. 获取cookies这样的私密信息。
 3. 劫持前端的逻辑。
 4. 向服务端发送请求。
 5. 也可以把获取的敏感信息发送给攻击者。

###一般什么样的场景下会发生XSS攻击

 - 攻击者得到你的cookie，然后就得到你的登陆状态，可以冒充你发送动态信息，然后你的朋友每个人点击查看你的动态，然后每个人的cookie我都可以劫持，然后进行大量的扩散。
 - 如果网站的表单，我们不进行严格的数据验证，假如我提交的是一个script的脚本，提交过去的代码，你们后台可以进行执行，攻击者完全可以得到你的后台管理网站的cookie以及网站地址，这样我可以做的事情就够多了，比如利用管理人员的权限，做各种各样的事情，比如免费的购物。。

###XSS攻击的分类
从本质上来说，XSS的攻击，是由不合理的数据引起的。比如用户的url参数注入，不合理的表单提交等。

XSS的攻击的分类从来源上说，分两类：

 1. 反射性攻击
 2. 存储型攻击

反射性攻击，攻击的代码主要来源于url的路径参数。

存储型攻击，攻击的代码主要来源是存储到数据库中的脏数据。

###一个网站中，那些地方是XSS的攻击点。

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

###XSS预防策略
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

