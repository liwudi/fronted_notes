# Electron

学习文档：https://www.electronjs.org/docs/tutorial/first-app

## 概述

1、Electron 可以使用 JavaScript 来调用原生（操作系统）APIs 来创建桌面应用。

2、可以把 Electron 看作一个 NodeJs 的变体，它专注于桌面应用，而不是web服务器。

3、Electron 不是某个图形界面库的 JavaScript 版本。它的本质还是web页面！

4、可以把 Electron 看作被 JavaScript 控制的浏览器。

## 快速开始

### 开发环境保证

保证你的环境中有node，可以使用 node -v 进行检查。

### 开发前的准备

1、建立一个空的文件夹，作为你的项目目录。

2、执行 npm init 命令。

3、在生成中的 package.json 中，添加 start scripts，示例如下：

```text
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```
4、main 指定了我们项目的入口，这里我们起名为 main.js

### 安装 electron

```text
npm install --save-dev electron
```
推荐使用局部安装的方式。

### electron 安装慢的原因和解决方法

tips：这个安装，会特别的慢，个人安装的版本是 8.0.2。

网上的一部分人所说的解决方案：是修改 npm 镜像，设置 .npmrc 等配置，其实这个不是真正的慢的原因。

因为单纯的 electron 包，没有多大，哪怕不用镜像源，也能很快下载下来。

慢的罪魁祸首是，electron 包中会执行一个 install.js 文件，这个文件会下载一个github指向的地址，才会特别的慢。

解决方案是：把这个地址改为淘宝的 electron 地址。

在 node_modules/electron/install.js 中，添加 mirrorOptions：

```javascript
downloadArtifact({
  version,
  artifactName: 'electron',
  force: process.env.force_no_cache === 'true',
  cacheRoot: process.env.electron_config_cache,
  platform: process.env.npm_config_platform || process.platform,
  arch: process.env.npm_config_arch || process.arch,
  // 下面这一块是添加的代码
  mirrorOptions:{
    mirror:'https://npm.taobao.org/mirrors/electron/',
    customDir:'8.0.2', // 保证这个就是你下载的electron版本！！！！！
    // customFilename:'electron-8.0.0-win32-x64.zip'
  }
}).then((zipPath) => extractFile(zipPath)).catch((err) => onerror(err))
```
### 开始编写代码

第一步、编辑 main.js

```text
const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```
第二步、编辑 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```
### 运行代码

```text
npm start
```

## 进程

主进程（main process）：main.js 就是 electron 的主进程。

渲染进程（renderer processes）：electron 的展示部分，其实是使用 Chromium 来展示 web 页面，这就是它的渲染进程。

Chromium 的多进程架构：Chromium的默认策略是对每一个tab新开一个进程，以确保每个页面是独立且互不影响的。避免一个页面的崩溃导致全部页面无法使用。

### 主进程和渲染进程关系

主进程通过 BrowserWindow 实例化一个渲染进程。

主进程可以实例化多个渲染进程。

渲染进程值关注它自身的渲染页面的问题。

### 进程通讯

使用 ipcMain、ipcRenderer进行通信。本质上，他们是一种事件机制的方式进行通信。

1、ipcMain，用于主进程中，进行消息事件的监听。

* ipcMain.on(channel, listener)

* ipcMain.once(channel, listener)

* ipcMain.removeListener(channel, listener)

* ipcMain.removeAllListener([channel])

* ipcMain.handle(channel, listener)，接受invoke的异步请求。处理资源。

* ipcMain.handleOnce(channel, listener)

* ipcMain.removehandler(channel, listener)

2、ipcRender，用于渲染进程中，进行事件的监听和消息的发送。

* ipcRenderer.on(channel, listener)，用于接收在主进程中，event.reply(channel, ...args)触发的"回掉event"

* ipcRenderer.once(channel, listener)

* ipcRenderer.removeListener(channel, listener)

* ipcRenderer.removeAllListener(channel)

* ipcRenderer.invoke(channel, ...args)，一般用于向主进程申请资源，处理结果，然后返回结果的过程。

* ipcRenderer.send(channel, ...args)，发送一个异步消息。

* ipcRenderer.sendSync(channel, ...args)，表示发送一个同步的消息，它的返回值，是通过event.returnValue，在另一个监听端返回。

* ipcRenderer.sendTo(webContentsId, channel, ...args)，向webContentsId 的浏览器发送消息。

* ipcRenderer.sendToHost(channel, ...args)，消息会被发送到 host 页面上的 <webview> 元素，而不是主进程。

```javascript
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```


3、remote

可以在渲染进程中，调用主进程的方法，但不是所有的主进程的东西，都可以被调用。

在渲染进程中：

```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```
BrowserWindow 一般只有在主进程被调用，但是使用remote的方式，实现了在渲染进程中的调用。

反过来（如果需要从主进程访问渲染进程），可以使用 webContents.executeJavascript

4、webContents

主进程进行渲染和控制web页面的方式。

* 可以通过事件监听页面状态。（加载状态，页面变化，是否销毁，dom挂载、页面导航状况等等）

* 可以把 css 提前注入到页面中。

    注入css：contents.insertCSS(css[, options])

    删除css：contents.removeInsertedCSS(key)

* 可以注入我们定义的 JS 代码。

    注入js：contents.executeJavaScript
    
## 打包：electron-builder

查阅文档：https://github.com/electron-userland/electron-builder

1、先安装依赖

```text
npm install electron-builder --save-dev
```
2、以mac为例

新建build目录，添加图标

需要一个background.png，用于生成dmg包的安装北京。

需要一个icon.icns，或者icon.png 充当 macOs 应用的图标。

在package.json 中添加

```text
"build": {
  "appId": "your.id",
  "mac": {
    "category": "your.app.category.type"
  }
}
```
3、添加 scripts

```text
"pack": "electron-builder --dir",
"dist": "electron-builder",
"postinstall": "electron-builder install-app-deps"
```

4、构建

```text
npm run dist
```

