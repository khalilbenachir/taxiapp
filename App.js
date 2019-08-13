import React from "react";
import Home from "./home";


import store from "./redux/store";
import { Provider } from "react-redux";
/* @flow */

import { View, StyleSheet } from "react-native";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Home />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});







export default App;
