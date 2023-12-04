# ReactNative

https://www.reactnative.cn/

## 环境搭建

## API记录

1、useColorScheme

作用：获取系统的模式设置：dark 、 lighter。但是必须在一个react 组件中使用。

基本用法：

```ts
import { useColorScheme } from 'react-native';

function Com(props): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View></View>
    )
}
```

2、types - PropsWithChildren

作用：定义一个组件的props类型，如果该组件有children属性，则使用该方式定义。

基本用法：

```ts
import type { PropsWithChildren } from 'react';

type PropsDef = PropsWithChildren<{
    title: string;
}>
function Com({children, title}: PropsDef): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View></View>
    )
}
```

3、

## 组件筛选

### 长列表-FlatList

ReactNative 它的渲染引擎，并没有我们相像中那么高，它只会渲染视图内的元素，视图外的元素，则会在原生视图结构中移除。

### 