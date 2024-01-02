# react-native link VS npx react-native link

npx，是 node 提供的一个工具，主要用于执行 node 的一些包。

npx react-native link，其实就相当于，先把 react-native 包下载到缓存，然后执行 react-native link 命令。

npx 不会把包下载到项目本地。

npx 等待命令执行完毕，会在缓存把包删除掉。
