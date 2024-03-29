import React from "react";
import Home from "./home";

import store from "./redux/store";
import { Provider } from "react-redux";
/* @flow */

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}


export default App;
