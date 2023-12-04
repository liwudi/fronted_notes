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

