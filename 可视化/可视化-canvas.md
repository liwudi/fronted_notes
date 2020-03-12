# Canvas

## 基本使用

```html
<canvas id="tutorial" width="300" height="300"></canvas>
```

#### 1、canvas元素替换内容。

* 使用文本的方式

```html
<canvas>你的浏览器不支持 canvas，请升级你的浏览器。</canvas>
```

* 使用图片的方式

```html
<canvas><img src="./icon.png" alt=""></canvas>
```

#### 2、渲染上下文(Thre Rending Context)

```javascript
var canvas = document.getElementById('tutorial');
//获得 2d 上下文对象
var ctx = canvas.getContext('2d');
```

#### 3、检测支持情况

```javascript
function draw(){
    let canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    //开始代码
}
```

## 绘制形状

Canvas 绘制图形的基础，就是它自身的栅格 (grid) 对应着坐标空间。

Canvas 左上角的位置，坐标为 (0, 0);

#### 1、绘制矩形

* fillRect：绘制一个填充的矩形。

* strokeRect：绘制一个矩形的边框。

* clearRect：清除指定的矩形区域。

```javascript
ctx.fillRect(10, 10, 100, 50); // 绘制矩形，填充的默认颜色为黑色。
ctx.strokeRect(10, 70, 100, 50);   // 绘制矩形边框
ctx.clearRect(15, 15, 50, 25); // 清除指定矩形区域
```

问题：ctx.clearRect 和 清空整个画布的区别？


## 绘制路径

图形的基本元素是路径。

绘制一个路径的步骤：

 1. 创建一个路径的起始点。
 2. 调用绘制方法去绘制出路径。
 3. 把路径封闭。
 4. 一旦路径生成，通过描边或者填充路径区域来渲染图形。

* beginPath()

新建一条路径，路径一旦创建成功，图形绘制命令会被指向到路径上生成路径。

* moveTo(x, y)

把画笔指向固定的坐标(x, y)，相当于设置路径的起始点。

* closePath()

闭合路径后，图形绘制命令又会重新指向到上下文中。

* stroke()

通过线条来绘制图形轮廓。

* fill()

通过填充路径的内容区域生成实心的图形。

* lineTo(x, y)

绘制线段，从某个点绘制到当前的点(x, y)。

* arc(x, y, r, startAngle, endAngle, anticlockwise)。

以(x, y) 为圆心，以r 为半径，从 startAngle 弧度开始到endAngle弧度结束。anticlosewise 是布尔值，true 表示逆时针，false 表示顺时针(默认是顺时针)。

* arcTo(x1, y1, x2, y2, radius)

根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

#### 1、绘制一条线

```javascript
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 300);
ctx.stroke();
```

注意，stroke方法，是给边框着色。而fill方法，是给图形填充颜色。


#### 2、绘制一个三角形

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.lineTo(125, 120);
ctx.closePath();
ctx.stroke();// stroke就是绘制边框，fill就是绘制实心图形。
```
tips：Canvas绘制图形的时候，需要一定的数学功底。

#### 3、绘制圆弧arc

```javascript
ctx.beginPath();
ctx.arc(100, 100, 100, 0, Math.PI/2, false);
ctx.stroke();
```
ctx.closePath 的本质就是，就是把画笔的起点和终点连接起来。

#### 4、绘制圆弧arcTo

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.arcTo(200, 50, 200, 200, 100);
ctx.stroke();
```

#### 5、绘制贝塞尔曲线

* 绘制二次贝塞尔曲线:quadraticCurveTo(cp1x, cp1y, x, y)

```javascript
ctx.beginPath();
ctx.moveTo(10, 200);

let cp1x = 40,cp1y = 100;// 控制点
let x = 200, y = 200;// 结束点。

ctx.quadraticCurveTo(cp1x, cp1y, x, y);
ctx.stroke();
```
* 绘制三次贝塞尔曲线:bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

cp1x, cp1y：控制点1的坐标。

cp2x, cp2y：控制点2的坐标。

x，y：结束点坐标。

## 添加样式和颜色

1. fillStyle = color,设置图形的填充颜色。

2. strokeStyle = color,设置图形轮廓的颜色。

```javascript
ctx.strokeStyle = 'red';
ctx.quadraticCurveTo(cp1x, cp1y, x, y);
ctx.stroke();
```
3. globalAlpha = transparencyValue: 这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。

#### 1、线宽

ctx.lineWidth

```javascript
ctx.beginPath();
ctx.moveTo(10, 200);
ctx.lineTo(200, 200);
ctx.lineWidth = 10;
ctx.stroke();
```

#### 2、线条末端样式

ctx.lineCap

有三个值：butt（方形）、round（圆形）、square（方形、但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域）

```javascript
ctx.beginPath();
ctx.moveTo(10, 200);
ctx.lineTo(200, 200);
ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.stroke();
```
#### 3、线条之间的连接方式

ctx.lineJoin

共有 3 个值 round, bevel 和 miter：

1. round 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。

2. bevel 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。

3. miter(默认) 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

#### 4、虚线

ctx.setLineDash

setLineDash 方法接受一个数组，来指定线段与间隙的交替；

ctx.lineDashOffset

lineDashOffset属性设置起始偏移量。

```javascript
ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
```
## 绘制文本

1. fillText(text, x, y [, maxWidth])

2. strokeText(text, x, y [, maxWidth])

```javascript
ctx.lineWidth = 1;
ctx.font = "20px sans-serif";
ctx.strokeText('我是中国人', 20, 100);
```

## 绘制图片

#### 1、ctx.drawImage(img对象)

```javascript
let img = new Image();
img.src = 'https://www.runoob.com/wp-content/uploads/2018/12/2255709523-5b74dd8eb033e_articlex.png';
img.onload = function () {
    ctx.drawImage(img, 10, 10, 200, 200);
}
```

绘制图片，可以放大，也可以缩小。

问？能不能做图片的等比压缩？

#### 2、切片

drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。

前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。

```javascript
let img = new Image();
img.src = 'https://www.runoob.com/wp-content/uploads/2018/12/2255709523-5b74dd8eb033e_articlex.png';
img.onload = function () {
    ctx.drawImage(img, 10, 10, 200, 200);

    ctx.drawImage(img, 10, 10, 200, 200, 220, 220, 200, 200);
}
```

## 状态的保存和恢复

Canvas 在绘制的过程中，如果我们想保存某个状态的绘图，使用 save() 方法。

如果想恢复到上一个状态，可以使用 restore() 方法。

save() 方法，把 Canvas 的状态，存入一个栈中。类似数组的 push() 方法。

restore() 方法，把存入到栈中的 Canvas 状态释放出来。类似数组的 pop() 方法。

一个绘画状态包括：

* 当前应用的变形（即移动，旋转和缩放）
* strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
* 当前的裁切路径（clipping path）

```javascript
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

ctx.fillRect(10, 10, 100, 100);
ctx.save();
// save 保存的是fillStyle状态的值。
ctx.fillStyle = 'red';
ctx.fillRect(120, 10, 100, 100);
ctx.save();

ctx.restore(); // fillStyle = 'red';
ctx.fillRect(330, 10, 100, 100);

ctx.restore(); // fillStyle = 默认值;
ctx.fillRect(330, 120, 100, 100);
```

## 变形

#### 1、translate，用来移动 canvas 的原点到指定的位置

#### 2、rotate(angle)

这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

​旋转的中心是坐标原点。

```javascript
ctx.translate(250, 250);
ctx.rotate(Math.PI/180 * 45);
ctx.fillStyle = 'red';
ctx.scale(2, 2);
ctx.fillRect(0, 0, 100, 100);
```

#### 3、scale(x, y)

表示缩放，x代表x轴上的缩放比例，y代表y轴上的缩放比例。

```javascript
ctx.translate(250, 250);
ctx.rotate(Math.PI/180 * 45);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);
ctx.scale(2, 2);
ctx.strokeRect(0, 0, 100, 100);
```

## 合成

globalCompositeOperation：表示合成，有以下几个值：

1. source-over，这是默认设置，新图像会覆盖在原有图像。

2. source-in，仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)

3. source-out，仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)

4. source-atop，新图像仅仅显示与老图像重叠区域。老图像仍然可以显示。

5. destination-over，新图像会在老图像的下面。

6. destination-in，仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。

7. lighter，新老图像都显示，但是重叠区域的颜色做加处理。

8. darken，保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)

9. lighten，保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)

10. xor，重叠部分会变成透明。

11. copy，只有新图像会被保留，其余的全部被清除(边透明)

```javascript
ctx.fillRect(0, 0, 200, 200);

ctx.globalCompositeOperation = "source-over"; //全局合成操作
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 200, 200);
```

## 裁剪路径

clip()

把已经创建的路径转换成裁剪路径。

裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。

## 动画

动画在Canvas中的本质，就是不断的重新绘制。

1. setInterval

2. setTimeout

3. requestAnimationFrame

## Canvas转图片

原生的实现方式：

```javascript
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = 140;
canvas.height = 140;

ctx.fillStyle = "pink";
ctx.fillRect(20, 20, 100,100);

let imageUrl = canvas.toDataURL('image/png');
img.src = imageUrl;
```

另外，Canvas2image，是一个把 Canvas 转化为 img 的库。

## Canvas绘制网页

html2canvas，是一个把HTML网页，转化为Canvas的js库。

```javascript
import html2canvas from 'html2canvas';
import canvas2image from 'canvas2image';  
 
let box = document.getElementById("box"); //生成的DOM元素  
var img = document.getElementById("img"); //需要展示的图片
//生成canvas
html2canvas(box).then(function(canvas) {
    //生成图片
    let url = canvas2image.saveAsPNG(canvas,true).getAttribute('src');
    img.src = url;
});

```


## 使用场景总结

当前业界比较流行的使用场景

* 1、可以做类似大转盘的活动。
* 2、做canvas签名。
* 3、把网页转化为Canvas。
* 4、游戏方面应用。
* 5、Canvas转为图片。




