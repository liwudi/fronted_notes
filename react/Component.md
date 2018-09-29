# 组件高级知识

## 受控组件（controlled components）

在原生的表单中，input的值是这么设定的。
```HTML
<input value="mapbar_front" />
```
并且在这种情况下，我们能够给input中输入任何的值。
但是在react中，我们对于input如果给定一个初始值，它是不会随便进行输入进行改变的，它必须同时绑定一个onChange事件。

```HTML
<input type="text" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}>
```
在原生的表单中，textarea标签的值是由其子元素决定的。例如：
```HTML
<textarea value="mapbar_front" ></textarea>这个值是空的


<textarea>mapbar_front</textarea>这个值是有的mapbar_front
```
但是在react中，是由value属性决定的。
同样的，这个value属性的改变，也需要使用onChange时间来进行更改value的状态。
```HTML
<textarea value="mapbar_front" ></textarea>
```
在react中，上面的value值是存在的，不过你不能改变文本框的值，你必须加上一个onChange事件来进行更改。

受控组件的意义，就是在react中，把input,textarea这一类的表单元素，使用onChange事件以及value属性，动态跟踪他们的值的改变。
## 无状态组件
无状态组件的意义，在于其良好的性能，它是用一个函数的方式进行表示一个组件的。
```jsx harmony
import React, { Component } from 'react';
export default function Hello(props) {
  return (
      <div>hello, {props.name}</div>
  );
}
```
无状态组件，之所以由比较高的性能，是因为它自身少了一个组件的实例化的一个过程，它本身就是一个函数。

它自身的一切只与props相关，一切需要定义state的地方，你都应该抽离到容器组件上面，或者使用redux之类的东西，进行抽离。

它自身没有this的概念，因为本身就是一个函数，而class类型的组件是要进行实例化的，所以会有this的概念。

在无状态组件中，不能使用周期函数，这就要让我们思考我们的数据结构，怎么样才算是显得更加的高级。

无状态组件，专注于UI层，它自身不会对业务逻辑进行处理，这就让我们更好的理解component和page的关系问题。有助于我们进行组件分离。

## 高阶组件
高阶组件的本质，是一个函数，只不过这个函数的返回值，是一个class类型的组件。一个高阶组件的基本示例如下：
```jsx harmony
function highComponent(MyComponent) {
  return class A extends Component {
      constructor(props) {
          super(props);
          this.state = {
              isShow: true
          }
      }
      componentDidMount() {
          this.setState({
            isShow: false,
          })
      }
      render() {
          return (
              <MyComponent isShow={this.state.isShow}></MyComponent>
          )
      }
  }
}
```
从上面的示例中可以看到，高阶组件聚焦于业务层，不关心组件的UI层，所以在上面的示例中，我们可以把MyComponent这个传递进来的组件，写成无状态组件。

## pureComponent 和 Component区别
首先，pureComponent是和shouldComponentUpdate这个周期函数相关，正常情况下，这个周期函数默认返回的是true，也就是任何props的改变，或者是任何的setState，都会导致界面的重新render。

pureComponent会改变shouldComponentUpdate的行为，它不再是返回一个true，它会对props和state进行一次浅比较，只有在不相等的情况下，再进行return 一个true，进行触发render操作。

这个时候，如果是数组类型，或者Object类型的数据发生变化，对于pureComponent而言，其实都是一样的，不会触发render。例如：
```jsx harmony
import React, { pureComponent } from 'react'
export default class A extends pureComponent{
   constructor(props) {
       super(props);
       this.state = {
           name: {
               value: 'mapbar'
           }
       }
       this.click = this.click.bind(this);
   }
   click() {
       this.state.name.value = 'mapbar_front';
      this.setState({
          name: this.state.name
      })
   }
   
  render() {
      return (
          <div onClick={this.click}>{this.state.name}</div>
      )
  }
}
```
以上的例子，不会触发render，导致name的值一直是mapbar。
