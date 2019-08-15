import React from "react";
import Home from "./home";
import SearchBox from "./component/searchBox/searchBox";
import { Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import store from "./redux/store";
import { Provider } from "react-redux";
/* @flow */

import { View, StyleSheet } from "react-native";

class App extends React.Component {
  render() {
    Icon.loadFont();
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Item>
            <Input placeholder="Icon Textbox" />
            <Icon name="rocket" size={30} color="#900" />
          </Item>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});







export default App;
