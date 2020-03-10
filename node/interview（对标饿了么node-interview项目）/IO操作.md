# IO

### Buffer

1、JavaScript基础数据类型没有表示二进制的，所以在NodeJs中，为了解决这个问题，就有了 Buffer。

2、Buffer 是 NodeJs 处理二进制数据的类，其中与 IO 相关的操作均基于 Buffer。

3、Buffer 类的实力类似整数数组，但是其大小是固定不变的，并且是在 V8 堆栈外分配内存。

#### 1、Buffer.from(string[, encoding])

操作字符串

```javascript
let buf = Buffer.from('test');

console.log(buf.toString());// test
```
#### 2、Buffer.from(buffer)

复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例

#### 3、Buffer.from(array)

返回一个被 array 的值初始化的新的 Buffer 实例，传入的 array 的元素只能是数字，不然就会自动被 0 覆盖。

#### 4、Buffer.from(arrayBuffer[, byteOffset[, length]])

返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。

### TypedArray

表示一个"类型数组"，类型包括以下几种：

Int8Array

Uint8Array

Int16Array

Uint16Array

Int32Array

Uint32Array

Float32Array

Float64Array

