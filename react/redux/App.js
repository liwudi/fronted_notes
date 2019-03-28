import React, { Component } from 'react';
import { Provider } from './react-redux';
import { createStore } from './redux';
import Test from './Test';
const store = createStore((state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'DEL':
      return state - 1;
    default:
      return state;
  }
});
class MyApp extends Component {
  render() {
    return (
        <Provider store={store}>
          <App></App>
        </Provider>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Test></Test>
        </header>
      </div>
    );
  }
}

export default MyApp;
