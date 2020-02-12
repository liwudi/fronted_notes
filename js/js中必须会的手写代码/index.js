/**
 * Created by mapbar_front on 2020-01-24.
 */
// 模拟call
Function.prototype.myCall = function (context, ...args) {
    let myContext = context ? context : window;
    let key = Symbol();
    myContext[key] = this;
    let result = myContext[key](...args);
    delete myContext[key];
    return result;
}

// apply
Function.prototype.myApply = function (context, args) {
    let myContext = context ? context : window;
    let key = Symbol();
    myContext[key] = this;
    let result = myContext[key](...args);
    delete myContext[key];
    return result;
}

// bind
Function.prototype.bind = function (context, ...args) {
    let fn = this;
    const bindFn = function (...args1) {
        let currentContext = context;
        if (this instanceof bindFn) {
            currentContext = this;
        }
        return fn.call(
            currentContext,
            ...args, ...args1
        )
    }
    bindFn.prototype = Object.create(fn.prototype);
    return bindFn;
}

// 模拟new
function createNew(Con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, Con.prototype);
    let result = Con.call(obj, ...args);
    // obj 是正常的构造函数的写法得到的结果。
    // 如果这个构造函数返回的是一个对象，则就是result。
    return result instanceof Object ? result : obj;
}

// 模拟instanceof

function myInstanceof(obj, fn) {
    let leftValue = obj.__proto__;
    let rightValue = fn.prototype;
    while (leftValue) {
        if (leftValue === null) return false;
        if (leftValue === rightValue) return true;
        leftValue = leftValue.__proto__;
    }
}

// deepCopy
function deepClone (target, cache = new WeakMap()) {
    if (!target) return target;
    if (typeof target !== 'object') {
        return target;
    }
    if (cache.get(target)) {
        return target;
    }
    let copy = Array.isArray(target) ? [] : {};
    cache.set(target, copy);

    Object.keys(target).forEach(key => copy[key] = deepClone(target[key], cache))

    return copy;
}

// Promise


