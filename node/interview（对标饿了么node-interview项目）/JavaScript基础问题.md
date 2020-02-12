### 类型判断

**1、typeof**

js提供的一种判断数据类型的方法，但是只能判断基本数据类型。它的优势是使用简单。

这里有几个注意的点：

第一，typeof判断一个函数的时候，返回的类型是function，而不是object。

第二，typeof判断一个正则的时候，返回的类型是object。

第三，typeof判断Object、Array、Map、Set等等都返回的是object。

第四，typeof判断 undefined，返回值类型为undefined。

第五，判断 null，返回值类型为object。虽然null是基础数据类型的值，但是在判断的时候，它的类型是object。


**2、instanceof**

instanceof是描述的一种实例关系，它和 new 操作符相对应，它能够解决typeof无法准确判断对象类型的问题。

不过使用instanceof，返回值为 true/false，无法直观的感受到变量的数据类型。

同时，由于instanceof本质上是检查原型链来确认数据类型，所以在使用的时候，需要我们准确的判断构造函数的继承关系。

**3、Object.prototype.toString.call**

这是行业内公认的一种比较好的判断数据类型的方式。

这里需要了解一个知识点：toString在IE下会存在差异问题。

```text
ie8 => Object.prototype.toString.call(undefined)  [object Object]
ie9 => Object.prototype.toString.call(undefined)  [object Window]
ie10+ => Object.prototype.toString.call(undefined)  [object Undefined]
 
ie8 => Object.prototype.toString.call(null)  [object Object]
ie9 => Object.prototype.toString.call(null)  [object Window]
ie10+ => Object.prototype.toString.call(null)  [object Null]
```

### 作用域

1、全局作用域。

浏览器环境，window就是全局作用域。node环境，golbal就是全局作用域。

2、函数作用域。

函数内部，形成一个独立的作用域。

3、块级作用域。

在 if...else...中，或者 for循环的括号中，使用let、const就是一个块级作用域。

4、闭包。

内部函数引用外部函数的变量，使得外部变量无法释放，就形成了闭包。

### 内存释放

```javascript
let arr = [];
while(true)
  arr.push(1);
```
解读：这会让cpu一直占用，类似服务卡死。并且arr数组无限扩张，直接爆掉v8引擎的内存。


```javascript
let arr = [];
while(true)
  arr.push();
```
解读：这会让cpu一直占用，类似服务卡死。但是数组不会扩张，数组的长度一直为0；

```javascript
let arr = [];
while(true)
  arr.push(new Buffer(1000));
```
解读：这会让cpu一直占用，类似服务卡死。数组会一直增大，直到v8引擎内存的上限。

### ES6新特性
