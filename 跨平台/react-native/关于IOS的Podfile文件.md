# Podfile

Podfile 是 ios 开发，描述项目依赖规则的一个描述性文件。

## 1、主要命令

- pod init，生成该文件。
- pod install，根据 podfile 文件规则，下载相关依赖包。

## 2、文件结构说明

一个最简单的 Podfile 文件描述如下

```Podfile
# 针对MyApp这个target，引入AFNetworking以及OCMock两个库。
target 'MyApp' do
    pod 'AFNetworking', '~> 3.0'
    pod 'OCMock'
end
```
