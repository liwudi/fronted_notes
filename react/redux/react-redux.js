/**
 * Created by mapbar_front on 2019-03-27.
 */
import React, { Component } from 'react';
let MyContext = React.createContext('context');
export class Provider extends Component{
    render() {
        return (
            <MyContext.Provider value={this.props.store}>
                {
                    this.props.children
                }
            </MyContext.Provider>
        )
    }
}

export function connect(fun1) {
    return function (Com) {
        return class AAA extends Component{
            static contextType = MyContext;
            componentDidMount() {
                this.context.subscribe(() => {
                    this.forceUpdate();
                })
            }
            render() {
                let obj = fun1(this.context.getState());
                let myState = this.context.getState();
                let dispatch = this.context.dispatch
                return <Com {...obj} dispatch={dispatch}></Com>
            }
        }
    }
}
