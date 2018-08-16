# @decorator模块学习

## Decorator简介

修饰器(Decorator)是一个函数，用于修饰类的行为，这是ES7的一个提案，目前已经被babel支持。

在TypeScript中，就是修饰器的概念，比如用于组件传值的 @input @output等等。

一个简单的修饰器的使用如下：

```
function testAble(target){
    target.isTest = true;
}

@testAble
class A {}

console.log(A.isTest);// true
```
在一个修饰器中，参数target就是你要修饰的类，这个类也叫做Decorator的修饰目标对象。

上面示例实现的效果就是，给这个类添加了一个静态属性isTest。

那么，我们如何给这个类添加一个实例属性呢？

```
function testAble(target){
    target.prototype.isTest = 'test';
}

@testAble
class A {};

new A().isTest; // true
```
通过这样的方式，我们就给这个类添加了一个实例属性。

## 多参数的修饰器的实现

有这样的一种状态，你觉得你的参数不够用，仅仅一个target无法满足你的要求，这个时候，可以把这个修饰器进行变形。

```
function testAble(value) {
    return function(target){
        target.prototype.isTrue = value;
    }
}

@testAble(true)
class A {};

new A().isTrue;// true
```

## 使用Object.assign来实现class属性批量的添加

在给一个class添加实例属性的时候，修饰器可以通过Object.assign来实现一些东西。

```
function testAble(...list) {
    return function(target){
        Object.assign(target.prototype, ...list)
    }
}

let options = {
  name: 'mapbar_front',
  age: 123,
  getName: function(){
    console.log(this.name);
  }
}
@testAble(options)
class A {}

new A().getName()

```
    注意：在修饰器进行修饰一个类的时候，不能进行定义name属性，要不会发生错误。


## 修饰器不仅仅可以修饰class，也可以进行修饰对象的属性

基本的使用方式如下：
```
function test(target, name, descriptor) {
    descriptor.writable = true;
    return descriptor;
}
class A {
    @test
    name(){
        console.log('my name is mapbar_front!');
    }
}

//表示类A的name方法是可重写的。
```

修饰器在修饰一个属性的时候，它有三个参数，第一个参数target，表示这个修饰器对应的class。

第二个参数，就是你要修饰的类的属性名。第三个参数是修饰器的属性描述对象。

```
function testAA(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
class A {
  @testAA
  name(){
      console.log('my name is mapbar_front!');
  }
}
var obj111 = new A();
obj111.name();

obj111.name = 123;//报错
console.log(obj111.name)
```

## 关于属性修饰符descriptor的说明

这个和Object.defineProperty()相关。

```
let obj = {}；
Object.defineProperty(obj, 'name', {
    configurable: true,
    writable: true,
    enumberable: true,
    value: 'mapbar_front',
});
console.log(obj.name);// 'mapbar_front';

```
以上代码，定义了一个obj的对象，给它添加了一个name属性，这个name属性的value值是'mapbar-front'。

configurable: true。代表了你可以更改name属性的修饰符配置。

enumberable: true。代表了你可以使用for in把这个定义好的name属性遍历出来。

writable: true。代表了name属性是可重写的。也就是说你可以更改name属性的value值。

## @log修饰器的实现、@readonly、@enumberable等修饰器的实现。

@log修饰器的需求就是，在我执行函数的时候，打印出参数。
```
function log(target, name, descriptor){
    var oldValue = descriptor.value;
    descriptor.value = function(){
        console.log(`this prop ${name} 的参数为 ${arguments}`);
        return oldValue.appay(null, arguments);
    }
    
    return descriptor;
}

class Math {
    @log
    add(a, b){
        return a + b;
    }
}
```

其他的@readonly、@enumberable等的修饰器的实现，本质上都是对descriptor的实现。

## 需要注意的是，修饰器不能用于函数

```
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```
上面的代码，意图是执行后counter等于1，但是实际上结果是counter等于0。

修饰器不能用于函数的核心原因，就是函数存在函数提升。


## core-decorator第三方模块，提供常用的几个修饰器

### <1> @autobind

使得方法中的this对象，绑定原始对象。

### <2> @readonly

使得class中的属性或者方法不可写。

### <3> @override

检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。

### <4> @deprecate (别名@deprecated)

deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除。

```
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//
```
### <5> @suppressWarnings

suppressWarnings修饰器抑制decorated修饰器导致的console.warn()调用。但是，异步代码发出的调用除外。


## Mixin模式——混入模式

在一个对象中混入另外一个对象的属性和方法。

常用的方式，就是使用的Object.assign

```
class A{}
Object.assign(A.prototype, {
    name: 'mapbar_front',
});

let name = new A().name;
console.log(name);
```
不过，我们可以使用修饰器的方式，给任何的类进行添加额外的属性和方法


```
function testAble(...list) {
    return function(target){
        Object.assign(target.prototype, ...list)
    }
}

let options = {
  name: 'mapbar_front',
  age: 123,
  getName: function(){
    console.log(this.name);
  }
}
@testAble(options)
class A {}

new A().getName()

```

上面是通过修改prototype对象的方式实现Mixin模式，也可以通过extends的方式来实现继承

```
class A extends B{
    
}
//如果B中有foo方法，此时的A也会继承foo方法。
```
也可以通过在A和B之间添加一个混入类来实现。

```
let myMixin = function(B) {
    return class extends B {
        foo(){
            console.log('foo');
        }
    }
}
class A extends myMixin(B) {}
```
如果要添加多个Mixin属性。就可以通过多写几个Mixin方法来实现:

```
class A extends myMixin1(myMixin2(B)) {
    //coding
}
```
## traits-decorator第三方库

1、一个简单的使用示例：
```
import { traits } from 'traits-decorator';

class TFoo {
    foo(){ console.log('foo') }
}
class TBar {
    bar(){ console.log('bar') }
}
@traits(TFoo, TBar)
class MyClass{}

var obj = new MyClass();
obj.foo();
obj.bar();
```
这里达到的效果是。MyClass被混入了foo方法以及bar方法。

2、traits不允许混入同名方法
```
import { traits } from 'traits-decorator';

class TFoo {
    foo(){ console.log('foo') }
    bar(){ console.log('bar') }
}
class TBar {
    bar(){ console.log('bar') }
}
@traits(TFoo::excludes('bar'), TBar);//这里需要修改成这样,如果不改为这样的话，会报错
class MyClass{}

var obj = new MyClass();
obj.foo();
obj.bar();
```
另外一种方式是给bar方法起一个别名。

```
@traits(TFoo::alias({bar: aliasBar}), TBar);//这里需要修改成这样,如果不改为这样的话，会报错
class MyClass{}
```

