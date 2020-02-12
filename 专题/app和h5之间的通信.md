### 腾讯X5内核优势

1、速度快：相比系统的webview的网页打开速度，有30+%的提升。

2、功能全：对ES6、H5上，有更好的提升。

3、兼容好：无系统内核的碎片化问题，兼容性更好。

4、更稳定：过亿用户的使用体验，已成为web端的事实上的标准。

5、安全：防劫持，安全问题快速修复。

6、视频和文件格式的支持程度，多于系统内核。

### 问题
1、http超时10秒重发问题。

### 基本配置

1、设置jsBridge
```text
addJavascriptInterface(new MyJaveScriptInterface(mContext),
                "androidJSBridge");
```
这个 androidJSBridge 会被挂在到 webview 的window下面。

这个时候，前端访问原生的方式：window.androidJSBridge的方式。

2、原生端调用web的方法，方法必须挂载到web端的window下面。

3、android端只能接受基本数据类型，如果传输对象，需要用JSON.stringify转为字符串。

IOS

1、ios不仅可以传输一个基本类型的数据，也可以传输一个对象类型的数据类型。

2、IOS没办法直接通过return一个返回值给web端，它如果想要通知到web端，一般会执行一个web端的方法。

3、IOS中，没办法自己定义注入的对象名，一般是固定的，叫webkit。
window.webkit.messageHandlers，是固定写法。
window.webkit.messageHandlers.方法名.postMessage();
```text
window.webkit.messageHandlers.iosTestFunction1
```
