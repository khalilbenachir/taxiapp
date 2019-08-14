import React from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";

import MapView from "react-native-maps";

import {
  currentlocation,
  getAddressPreditions
} from "./redux/maps/maps-action";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATION = width / height;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

class Home extends React.Component {
  componentDidMount() {
    const { dispatch1, location, getPredictions } = this.props;
    dispatch1();

    console.log("-------test");
    //  getPredictions();
    console.log(location);
  }

  render() {
    const { location } = this.props;
    console.log("-------location-------", typeof location.latitude);
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.latitude ,
            longitude: location.longitude
          }}

        />
      </MapView>
    );
  }
}
//parseFloat(location.coords.latitude)
//location.coords.latitude
const mapStateToProps = state => ({
  location: state.map.location
});

const mapDispatchToProps = dispatch => ({
  dispatch1: () => dispatch(currentlocation()),
  getPredictions: () => dispatch(getAddressPreditions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
