# React Navigation

# 包安装

```
yarn add @react-navigation/native

yarn add react-native-screens

yarn add react-native-safe-area-context
```

针对 ios / android , 导航器需要有不同的一些改造。（0.72）

```
// ios
npx pod-install ios

// android
import android.os.Bundle;

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}
```

# native stack navigator

```
yarn add @react-navigation/native-stack
```

native-stack 依赖于以上安装的三个包（native、react-native-screens、react-native-safe-area-context）

# 一、跳转 navigation 对象。

## 1、相关方法

1、navigate，跳转到另一个 screen。但是不可跳转相同的 screen。如果跳转的 screen，已经在栈中，则它的作用是 goback。

2、push，跳转到另一个 screen。哪怕是相同的 screen，依然跳转。

3、goBack，返回前一个路由栈。

4、popToTop，返回到顶部的路由栈。

## 2、路由参数

eg：navigation.navigate('RouteName', { /\*_ params _/})

## 3、header 设置

```ts
setOptions({
  title: "xxx",
  headerTitle: xxx,
  headerStyle: xxx,
  headerTintStyle: xxx,
  headerTitleStyle: xxx,
});
```

# 配置公用 header 样式 — screenOptions

```ts
const options = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}
<Stack.Navigator initialRouteName="Home" screenOptions={options}>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{title: '首页'}}
  />
</Stack.Navigator>
```

#
