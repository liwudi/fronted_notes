# Reflect相关

## 1、设计目的

1、把Object对象的语言内部方法，放到Reflect对象上面。以后Reflect可以拿到对象的语言内部方法。

例如：Object.defineProperty(obj, name, desc)

2、修正Object方法的返回结果，让其变的更加合理。

Object.defineProperty(obj, name, desc);

如果无法定义属性的时候，会抛出一个错误。

但是对于Reflect.defineProperty(obj, name, desc),它在无法定义一个属性的时候，会返回一个
false。
```bash
//
try{
    Object.defineProperty(obj, name, desc);
} catch(e) {
    console.log(e);
}

if(Reflect.defineProperty(obj, name, desc)){
    //success
} else {
    //fail
}
```
3、把Object的某些行为变成函数行为。

name in obj ======> Reflect.has(obj, name);
delete obj[name] ======> Reflect.deleteProperty(obj, name);

4、Proxy对象和Reflect对象一一对应。而且Reflect对象在任何情况下，都能保持原有的特性和行为。这和Proxy是不一样的点。

```
var loggedObj = new Proxy(obj, {
    get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
    },
    set(target, name) {
        console.log('set', target, name);
        return Reflect.set(target, name);
    },
    deleteProperty(target, name) {
        console.log('delete', target, name);
        return Reflect.deleteProperty(target, name);
    }
});
```
## 2、Reflect的静态方法

1、Reflect.get(target, name, receiver);

```
var myObj = {
    foo: 1,
    bar: 2,
    get getdata(){
        return this.foo + this.bar;
    }
}

Reflect.get(myObj, foo);//1
Reflect.get(myObj, bar);//2
Reflect.get(myObj, getdata);//3
```
如果Reflect写上它的第三个参数——receiver，那么this会自动绑定到这个receiver上。

```
var myObj = {
    foo: 1,
    bar: 2,
    get getdata(){
        return this.foo + this.bar;
    }
}
var receiverObj = {
    foo: 4,
    bar: 4,
}
Reflect.get(myObj, getdata, receiverObj);//8
```
2、Reflect.set(target, name, value, receiver);

这个方法，和get正好相反，但是用法是一致的，其中receiver也是一个对象，关于this的操作的函数，this会指向这个对象。

```
var myObj = {
    foo: 4,
    set bar(value) {
        return this.foo = value;
    }
}
var receiverObj = {
    foo: 0
}
Reflect.set(myObj, 'bar', 1, receiverObj);

receiverObj.foo; // 1
```
第一个参数，必须是对象，如果不是对象，就会报错。

3、Reflect.has(target, name);

4、Reflect.deleteProperty(target, name);

5、Reflect.constructor(target, args);

这个方法，类似于new target(...args),它提供了一种不使用new，而调用构造函数的方式;
```
function Greeting(name){
    this.name = name
}
const instance = Reflect.constructor(Greeting, ['mapbar_front']);
//旧的写法如下：
const obj = new Greeting('mapbar_front');
```
6、Reflect.getPrototypeOf(obj);

这个方法，用于获取__proto__上面的属性。

```
const p = new Person();
Reflect.getPrototypeOf(p) === Person.prototype;
```
Object.getPrototypeOf以及Reflect.getPrototypeOf的区别是？
Object.getPrototypeOf，如果它的参数不是对象，那它会先把这个转成对象。再进行获取__prototype__

7、Reflect.setPrototypeOf(obj, name);

这个方法用于设置一个对象的__prototype__

这个方法和getPrototypeOf正好相反，但是使用起来差不多，当第一个参数不是对象的时候，Object.setPrototypeOf会自动转为对象，而Reflect.setPrototype不会，当第一个参数是null、undefined，这个时候会报错。

8、