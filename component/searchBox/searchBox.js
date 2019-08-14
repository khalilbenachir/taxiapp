import React from "react";
import { View, Text } from "react-native";
import { Item, Icon, Input } from "native-base";

const SearchBox = () => (
  <View>
    <Item>
      <Icon active name="home" />
      <Input placeholder="Icon Textbox" />
    </Item>
  </View>
);

export default SearchBox;
