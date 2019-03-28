/**
 * Created by mapbar_front on 2019-03-28.
 */
import React, { Component } from 'react';
import { connect, Provider } from './react-redux';

class Test extends Component{
    addEvent () {
        this.props.dispatch({
            type: 'ADD'
        });
    }
    delEvent () {
        this.props.dispatch({
            type: 'DEL'
        });
    }
    render() {
        return (
            <div>
                <p>test, {this.props.state}</p>
                <div>
                    <button onClick={this.addEvent.bind(this)}>add</button>
                    <button onClick={this.delEvent.bind(this)}>del</button>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        state
    }
})(Test);
