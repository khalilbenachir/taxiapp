import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Container, Body, Content, List, ListItem, Text } from "native-base";

import { selectedAddress } from "../redux/maps/maps-action";
class ListView extends Component {
  render() {
    const { getSelectedAddress } = this.props;
    const { predictions } = this.props;
    return (
      <Content style={this.props.style}>
        <List
          dataArray={predictions}
          renderRow={item => (
            <ListItem
              onPress={() => getSelectedAddress(item.placeID)}
              button
              avatar
            >
              <Body>
                <Text>{item.primaryText}</Text>
              </Body>
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  predictions: state.map.predictions
});

const mapDispatchToProps = dispatch => ({
  getSelectedAddress: input => dispatch(selectedAddress(input))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
