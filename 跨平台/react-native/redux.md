# redux

redux VS @reduxjs/toolkit

两者虽然都是关于状态管理的库，但是随着 react、react-native 的演进，redux 的 api 也需要与时俱进，所以有了 @reduxjs/toolkit。

他们所做的事情，并没有什么分别，但是他们在 api 上，有了很大的不同。

## App.js

```js
// Redux config
import { Provider } from "react-redux";
import { store } from "./src/store/index";
<Provider store={store}>
  <App />
</Provider>;
```

## store/index.js

通过 configureStore 来创建一个 store。

```js
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

## store/userSlice.js

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: UserInfo = {
  username: "mapbar",
  age: 22,
  userAvatar: "XXX",
};
export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      Object.assign(state, action.payload);
    },
  },
});
export default userSlice.reducer;
```
