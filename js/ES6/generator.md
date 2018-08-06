# Generator函数解读

## generator的基本概念

generator是一种函数，这种函数是ES6提出的一种异步编程的解决方案，在它内部，使用yield关键字封装了一个个状态机。这个函数的执行结果，就是一个遍历器对象。

```
function* next() {
    yield 1+1;
    yield 2+2;
    return 5;
}
var x = next();
console.log(x.next());//{value: 2, done: false}
console.log(x.next());//{value: 4, done: false}
console.log(x.next());//{value: 5, done: true}
```
generator函数，返回的是一个遍历器对象，这个遍历器对象，拥有next方法，调用这个方法，就能得到yield关键字标识状态的结果。

## 协程的概念

协程在很久之前就出现的一种异步编程的思想，协程的意思就是多个线程相互协作，完成异步任务的一个过程，而generator函数，就是JavaScript针对异步调用而实现的一种协程。

JavaScript的执行时单线程的，而很多语言是多线程的，而多线程的本质，就是提升计算机运行效率。但是有时候，多线程是会竞争资源的，而竞争资源的时候，就是发生进程的阻塞，这就是原先的协程的最初模型。

Generator函数之所以是一种完美的异步编程解决方案，本质上是因为它的两个特点：

1.函数体内外的数据交换。
2.完美的错误处理机制。

next返回值的value属性，是generator函数向外输出数据。
```
function * gen() {
    yield 1 + 2;
    yield 2 + 3;
    return 3;
}
var g = gen();
var g1 = g.next();// {value: 3, done: false}
var g2 = g.next();// {value: 5, done: false}
var g3 = g.next();// {value: 3, done: true}
console.log(g1, g2, g3);
```
next方法接受参数，是向generator函数体内输入数据。
```
function * gen() {
    var a = yield 1 + 2;
    var b = yield 2 + 3 + a;
    return 3;
}
var g = gen();
var r1 = g.next();// { value: 3, done: false }
var r2 = g.next(456);// { value: 461, done: false}
console.log(r1, r2);// 这里的456就是外部输入的数据
```
在generator内部，是可以通过try{}catch的方式进行异常处理。一般而言，这个错误是由遍历器对象进行throw抛出的。
```
function* gen(){
    try{
        yield 1
    } catch(e) {
        console.log('异常捕获错误', e);
    }
}
var i = gen();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

## generator的顺序执行

使用遍历器的done属性，判断true或者false来判定是不是要继续执行。
```
function* gen1() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
var g = gen1();
var value = g.next();
while (!value.done) {
    console.log(value.value);
    value = g.next();
}
```
## thunk函数
以上的方式，虽然可以执行generator函数，但是问题就是这种方式只适合同步的执行，而不适合异步执行generator的方式。
thunk函数是异步执行generator函数的一个重要方式。
```
var fs = require('fs');
fs.readFile(fileName, function(err, data){
    if(err) return;
    console.log(data);
})
var thunkReadFile = function(fileName){
    return function(callback){
        return fs.readFile(fileName, callback);
    }
}
```
使用的时候，一般是 thunkReadFile(fileName)(cb);

针对thunk函数的一种封装方式如下所示：
```
var thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (cb) {
            args.push(cb);
            fn.apply(this, args)
        }
    }
}

function f(a, cb) {
    cb(a);
}
var thunkF = thunk(f);
thunkF(1)(console.log.bind(console));
```

