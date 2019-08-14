import React from "react";
import Home from "./home";
import SearchBox from "./component/searchBox/searchBox";
import { Item, Input, Icon } from "native-base";

import store from "./redux/store";
import { Provider } from "react-redux";
/* @flow */

import { View, StyleSheet } from "react-native";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Item>
            <Input placeholder="Icon Textbox" />
          </Item>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});







export default App;
