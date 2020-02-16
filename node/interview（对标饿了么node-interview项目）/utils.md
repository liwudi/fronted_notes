## URL

## querystring 和 qs

1、querystring是nodeJs内置模块，而 qs 是第三方的node包。

2、qs 的优势在于，能够解析深层对象。

问题：HTTP 如何通过 GET 方法 (URL) 传递 let arr = [1,2,3,4] 给服务器?

解答：通过 https://your.host/api/?arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4 即可传递把 arr 数组传递给服务器

```javascript
const qs = require('qs');

let arr = [1,2,3,4];
let str = qs.stringify({arr});

console.log(str); // arr%5B0%5D=1&arr%5B1%5D=2&arr%5B2%5D=3&arr%5B3%5D=4
console.log(decodeURI(str)); // 'arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4'
console.log(qs.parse(str)); // { arr: [ '1', '2', '3', '4' ] }
```
## util.inherits

nodeJs中，该函数是实现原型继承的方式。核心代码：Object.setPrototypeOf(ctor.prototype, superCtor.prototype);

## 常用的 npm 包

https://www.npmjs.com/browse/depended

问题：如何获取某个文件夹下所有的文件名?

## fs 模块、glob 模块

## path 模块

1、path 是 node 的内置模块
```javascript
let path = require('path');
path.join([...paths]);  // 用于文件路径拼接
```
2、path.extname()，获取文件扩展名。



