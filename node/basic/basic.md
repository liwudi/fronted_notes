### node.js基础

1、http模块：nodeJs的进行服务开发的基础。

基本使用示例如下：

```javascript
var http = require("http");

let app = http.createServer(function(request, response) {
    response.writeHeaders(200, {"Content-Type": "text/html"})
    response.write();
    response.end();
});
app.listen(3000);
```
2、关于request对象，如何获取路径参数: querystring模块、url模块。

```javascript
let url = require("url");
let result = url.parse(request.url, true);
let data = result.query;
```

3、关于request对象，如何获取文件流数据。
```javascript
let postData = '';
request.setEncoding("utf8");
request.addEventListener('data', function(rawData) {
  postData += rawData;
});
request.addEventListener('end', function() {
  // 数据接受完毕的业务数据
})
```

4、nodeJs，除了代码，其他都是并行执行的。

- 需要注意代码的执行效率，否则会造成阻塞。
- nodeJs是基于事件机制的，所以在执行效率上会更高。
- nodeJs本身的性能在于V8引擎上。

关于分布式，事务这些东西，是我们当前的瓶颈。

5、module

- module中的主模块：就是node直接运行的那个js文件。（require.main）。

- require.main.filename，可以获取当前运行程序的入口文件。

- require加载一个模块的优先级：1、缓存中加载。2、内置模块、核心模块。3、node_modules中的模块。4、最后加载制定路径的模块（相对路径，或者绝对路径）

- __dirname，表示当前文件目录。__filename，表示当前文件名路径。

- exports = module.exports = {};
