# SVG

1、SVG 是一种绘图技术，SVG 的全名叫可缩放矢量图形（Scalable Vector Graphics）。

2、SVG 使用 XML 格式定义图像。

3、可伸缩，不失真。

简单示例：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="50" r="40" stroke="black"
            stroke-width="2" fill="red" />
</svg>
```

### 1、SVG的结构

他是标准的 XML 文档结构。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="50" r="40" stroke="blue"
            stroke-width="2" fill="red" />
</svg>

```

包括：

1、xml申明。

2、DOCTYPE申明。dtd是一种约束 xml 文件的标准格式。

3、以及一个svg标签包裹的图形描述。

### 2、嵌入html

第一种：\<embed />标签

```html
<embed src="circle1.svg" type="image/svg+xml" />
```

第二种：\<object />标签

```html
<object data="circle1.svg" type="image/svg+xml"></object>
```

第三种：\<iframe />标签

```html
<iframe src="circle1.svg"></iframe>
```

最后，也可以使用a标签，链接到svg文件。

```html
<a href="circle1.svg">View SVG file</a>
```

tips：浏览器是能够直接展示svg的图形的。

区别和优势：

从兼容性考虑，使用object的方式展示svg更好。object不支持js脚本。

从脚本使用的角度考虑，使用 embed 和 iframe 更好一些。


### 3、svg矩形——rect

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="300" height="100"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```

矩形，它的标签是rect。

相关属性：width、height、style、class、x、y、rx、ry。

x、y，分别是svg的矩形，相对svg的偏移距离。

rx、ry 表示给矩形添加圆角。

style 和 class 都是给当前 svg 写样式的。

常见样式属性如下：

```css
.svg {
    width: 100px;
    height: 100px;
    fill: rgb(0,0,255);
    stroke-width: 1;
    stroke: black;
    fill-opacity: 1;
    stroke-opacity: 1;
}
```
fill 表示填充颜色。
stroke-width 表示图形边框宽度。
stroke 表示边框颜色。

opacity 表示整个图形的不透明度
fill-opacity 填充颜色的不透明度
stroke-opacity 边框的不透明度

### 4、svg圆形——circle

他有这么几个属性：

cx、cy 表示圆形的坐标点。

r 表示圆形的半径距离

### 5、svg椭圆——ellipse

```html
<ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple" />
```
cx、cy 表示坐标中心，
rx、ry 表示横坐标轴 和 纵坐标轴。


### 6、svg直线——line

```html
<line x1="0" y1="0" x2="200" y2="200"
  style="stroke:rgb(255,0,0);stroke-width:2"/>
```
x1、y1 表示起点。

x2、y2 表示终点。

### 7、svg多边形——ploygon

```html
<polygon points="200,10 250,190 160,210"
  style="fill:lime;stroke:purple;stroke-width:1"/>
```
fill-rule: nonzero

fill-rule: evenodd

表示对于重合部分的渲染规则！

### 8、svg曲线——ployline

<polyline> 元素是用于创建任何只有直线的形状

```html
<polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
  style="fill:none;stroke:black;stroke-width:3" />
```

### 9、svg路径——path

路径规则

M = moveto
L = lineto
H = horizontal lineto
V = vertical lineto
C = curveto
S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc
Z = closepath

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

### 10、svg文本——text

基本使用：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red">I love SVG</text>
</svg>
```

旋转的文本:transform="rotate(30 20,40)"

```html
<text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
```


### 11、svg的stroke属性

stroke，定义颜色。

stroke-width，定义宽度。

stroke-linecap，有 butt、round、square 三种值。

stroke-dasharray，定义虚线。使用特殊的规则。

### 12、svg滤镜

1、SVG滤镜用来增加对SVG图形的特殊效果。

2、两个标签：\<defs> 和 \<filter>

3、滤镜，表示一个规则，让你的图形按照你想要的规则展示出来！

4、filter 标签，用来定义一个svg滤镜！

5、所有的svg滤镜，都应该放到defs标签中！

基本示例：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="f1" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
    </defs>
    <rect filter="url(#f1)" class="svg"/>
</svg>
```

说明：

* feGaussianBlur，表示定义图形的模糊效果。

* in="SourceGraphic"，表示这个部分由整个图像创建效果。

* stdDeviation，定义了模糊量，表示在原本图形上的伸缩效果。

* fitler属性，把当前图形，链接到定义的规则上面。

* filter标签的 x 属性：表示横向的压缩。y 属性：表示纵向的压缩。

### 13、svg阴影——feOffset

feOffset标签，表示形成一个偏移的图形。

feBlend标签，表示与图像相结合的滤镜。或者可以理解为，生成一个原本的图像。

feColorMatrix标签，给元素渲染颜色。

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="f1" x="0" y="0">
            <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feColorMatrix result="matrixOut" in="blurOut" type="matrix"
                           values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
        </filter>
    </defs>
    <rect filter="url(#f1)" class="svg"/>
</svg>
```
### 14、svg线性渐变——linearGradient

linearGradient，表示线性渐变。需要设置四个值：x1、y1、x2、y2。

x表示横向渐变的过程，y表示纵向渐变的过程。

内部，需要两个stop标签，需要设置颜色（style）和位置（offset）。

```html
<defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
</defs>

<rect fill="url(#grad1)" class="svg"/>
```

### 15、svg放射性渐变——radialGradient

radialGradient，定义的是由中心到四周的渐变。

CX，CY和r属性定义的最外层圆和Fx和Fy定义的最内层圆。

```html
<defs>
<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
  <stop offset="0%" style="stop-color:rgb(255,255,255);
  stop-opacity:0" />
  <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
</radialGradient>
</defs>
<ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
```

### 16、svg参考手册

https://www.runoob.com/svg/svg-reference.html

### 17、思考和总结（现实应用场景）

* SVG绘图，能够绘制一些简单的、有一定规则的图形、并且给这些图形、文本一些滤镜特效。

* 关于SVG 和 Canvas 的区别。

1、SVG 不能绘制图片，而 canvas 可以。SVG是通过 XML 绘制，而Canvas通过 js 绘制

2、Canvas绘制的方式，是通过 js 逐像素渲染的。也就是说，它绘制一个复杂的图形和一个简单的图形的性能是差不多的。

SVG 是通过 XML 的方式渲染。它的本质是DOM，而复杂的图形，就会降低其渲染性能。

3、Canvas 是依赖分辨率，是一种标量图。所以在放缩的时候，存在失真的问题。

SVG 绘制的时候，不依赖分辨率，是一种矢量图。所以当SVG放缩的时候，不会使得图像失真。

4、SVG 适合带有大型渲染区域的应用程序：比如谷歌地图、百度地图。

Canvas 适合对象密集型的游戏应用场景。


