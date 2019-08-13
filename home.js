import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView from "react-native-maps";
import { currentlocation } from "./redux/maps/maps-action";
import { connect } from "react-redux";

class Home extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  componentDidMount() {
    const { dispatch1, location } = this.props;
    dispatch1();
    console.log("-------test");
    console.log(location);
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
        />
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  location: state.map.location
});

const mapDispatchToProps = dispatch => ({
  dispatch1: () => dispatch(currentlocation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
