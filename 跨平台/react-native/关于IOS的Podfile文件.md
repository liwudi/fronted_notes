# Podfile

Podfile 是 ios 开发，描述项目依赖规则的一个描述性文件。

官网地址：https://guides.cocoapods.org/syntax/podfile.html

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

一个比较完整的 Podfile 文件，可能如下所示

```Podfile
# 全局配置，
install! 'cocoapods',
         :deterministic_uuids => true, # 创建Pods项目时，是否生成确定的UUID。默认值：true
         :integrate_targets => true # 是否把已经安装好的Pods集成到用户的项目中。默认值：true
# 平台申明、版本
platform :ios, '9.0'
# 针对引入库的所有警告，都忽视掉
inhibit_all_warnings!

# 针对MyApp这个target，引入ObjectiveSugar
target 'MyApp' do
    pod 'ObjectiveSugar', '~> 0.5'

    # 针对MyAppTests这个target，继承了MyApp的ObjectiveSugar，以及自己引入了OCMock
    target 'MyAppTests' do
        # 继承模式(search_paths、complate、none)
        inherit! :search_paths
        pod 'OCMock', '~> 2.0.1'
    end
end
# 每一个target申明完成之后，都以end结束。

# Podfile中的hooks（pre_install、pre_integrate、post_install、post_integrate）
post_install do |installer|
    installer.pods_project.targets.each do |target|
        puts "#{target.name}"
    end
end
```
