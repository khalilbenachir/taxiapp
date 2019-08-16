import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Content, List, ListItem, Text } from "native-base";
class ListView extends Component {
  render() {
    return (
      <Content style={this.props.style}>
        <List>
          <ListItem>
            <Text>item 1</Text>
          </ListItem>
          <ListItem>
            <Text>item 2</Text>
          </ListItem>
          <ListItem>
            <Text>item 3</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}


export default ListView;
