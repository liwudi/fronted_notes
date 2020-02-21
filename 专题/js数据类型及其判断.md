**1、js数据类型有哪些？**

答案：a，基本数据类型：Number、String、Boolean、Null、Undefined、（Symbol）

b，引用数据类型：Array、Object、（Function、Date、RegExp、Map、Set）


问题一：null、undefined区别？

undefined表示未定义，当我们定义了一个变量，不给它赋值的时候，这个变量的值就是undefined。

null表示空值。表示空值，它也是一个值，一般用于释放内存。

问题二：1、Number(1)、new Number(1)，这三个东西分别是干什么的？

1 === Number(1)

new Number(1):这个时候，它代表1的包装类对象。包装类对象，它的类型是对象。

问题三：以下代码发生了什么？
```javascript
(1).toString()
```
对于基本数据类型，调用方法的时候，先把自身转化为包装器对象，然后使用这个对象，调用相应方法！

对于数字，js解析的时候，会按照浮点型的数据来处理。

**2、如何判断**

1、typeof

第一、判断基础数据类型的，无法判断引用数据类型。

第二、typeof判断null，返回的是'object'

2、instanceof

第一、用来判断引用数据类型，返回值是true/false。

第二、instanceof描述的是一种实例关系和继承关系，它和new相对应。无法准确判断，一个数据属于什么类型。


3、Object.prototype.toString.call

第一、是前端最常用的判断方式。

第二、但是它有一些问题，IE的兼容问题。

```javascript
ie8 => Object.prototype.toString.call(undefined)  [object Object]
ie9 => Object.prototype.toString.call(undefined)  [object Window]
ie10+ => Object.prototype.toString.call(undefined)  [object Undefined]

ie8 => Object.prototype.toString.call(null)  [object Object]
ie9 => Object.prototype.toString.call(null)  [object Window]
ie10+ => Object.prototype.toString.call(null)  [object Null]
```


