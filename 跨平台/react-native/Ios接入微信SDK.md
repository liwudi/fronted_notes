# IOS

# universal links

介绍：https://zhuanlan.zhihu.com/p/555453337

苹果推出的一种基于打开 app 功能的方案。

其配置需要 App、服务端、共同支持。

配置文件：apple-app-site-association

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "9JA89QQLNQ.com.apple.wwdc",
        "paths": ["/wwdc/news/", "/videos/wwdc/2015/*"]
      },
      {
        "appID": "ABCD1234.com.apple.wwdc",
        "paths": ["*"]
      }
    ]
  }
}
```

# 微信 SDK 集成方式

集成方式：.a 静态库文件的形式 && XCFramework 的形式

一般使用：XCFramework 的形式

参考：https://blog.csdn.net/linzhiji/article/details/6847917

## .a 静态库的集成方式 + CocoaPods

1、Podfile 中，添加以下代码

```
pod 'WechatOpenSDK'
```

2、头文件引入方式不同

```c++
#import "WXApi.h"
```

## .a 静态库的集成方式 + 手动集成

1. 应将 SDK 文件中包含的 libWeChatSDK.a，WXApi.h，WXApiObject.h 三个文件添加到你所建的工程中

2. 需要在 Search Paths 中添加 libWeChatSDK.a ，WXApi.h，WXApiObject.h 文件所在位置

3. 头文件引入方式不同。需要使用双引号的引入方式。

## XCFramework 的形式 + CocoaPods

```
pod 'WechatOpenSDK-XCFramework'
```

保存并执行 pod install,然后用后缀为.xcworkspace 的文件打开工程。

## XCFramework + 手动集成

1、将 WechatOpenSDK-XCFramework.xcframework 文件添加到你所建的工程中

2、添加相关 framework

WebKit.framework、CoreGraphics.framework、Security.framework

3、更改相关文件

```c++
// AppDelegate.h
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <WXApi.h> // 主要引入WXApi

@interface AppDelegate : RCTAppDelegate<WXApiDelegate> // 注意这里的更改

@end
```

第二个文件：AppDelegate.mm

```c++
// AppDelegate.mm
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>


@implementation AppDelegate

// 1、修改默认的两个方法：openURL、handleOpenURL
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
    return  [WXApi handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [WXApi handleOpenURL:url delegate:self];
}
// 2、实现onReq、onResp两个方法
- (void) onReq:(BaseReq*)req
{
  // TODO Something
}

- (void)onResp:(BaseResp *)resp
{
  //判断是否是微信支付回调 (注意是PayResp 而不是PayReq)
  if ([resp isKindOfClass:[PayResp class]])
  {
    //发出通知 从微信回调回来之后,发一个通知,让请求支付的页面接收消息,并且展示出来,或者进行一些自定义的展示或者跳转
    NSNotification * notification = [NSNotification notificationWithName:@"WXPay" object:nil userInfo:@{@"errCode":@(resp.errCode)}];
    [[NSNotificationCenter defaultCenter] postNotification:notification];
  }
}
@end
```
