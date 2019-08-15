import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";

import { Item, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView from "react-native-maps";

import {
  currentlocation,
  getAddressPreditions,
  getInputData,
  gettogglesearchresult
} from "./redux/maps/maps-action";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATION = width / height;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

class Home extends React.Component {
  componentDidMount() {
    const {
      getcurrentlocation,
      location,
      getPredictions,
      inputData
    } = this.props;
    getcurrentlocation();
    Icon.loadFont();

    console.log("-------test");
    //  getPredictions();
    console.log(location);
    console.log(inputData);
  }

  render() {
    const { location } = this.props;
    console.log("-------location-------", typeof location.latitude);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
          />
        </MapView>
        <MapView.Callout style={styles.searchCallout}>
          <Item style={styles.calloutSearch}>
            <Icon
              style={{ color: "#ff4500" }}
              size={20}
              active
              name="location-off"
            />
            <Input
              onFocus={() => this.props.getToggleSearchResult("pickUp")}
              placeholder="Choose pick up location"
              onChangeText={text => this.props.getInputData({ pickUp: text })}
            />
          </Item>
          <Item style={styles.calloutSearchLatChild}>
            <Icon
              style={{ color: "#ff4500" }}
              size={20}
              active
              name="location-on"
            />
            <Input
              onFocus={() => this.props.getToggleSearchResult("dropOff")}
              placeholder="Choose drop off location"
              onChangeText={text => this.props.getInputData({ dropOff: text })}
            />
          </Item>
        </MapView.Callout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 20
  },
  touchable: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10
  },
  touchableText: {
    fontSize: 24
  },
  searchCallout: {
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    width: "80%",
    marginLeft: "10%",
    position: "absolute",
    top: 55
  },
  calloutSearch: {
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0,
    textAlign: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(128,128,128, 0.6)"
  },
  calloutSearchLatChild: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0,
    textAlign: "center",
    marginBottom: 10
  }
});

//parseFloat(location.coords.latitude)
//location.coords.latitude
const mapStateToProps = state => ({
  location: state.map.location,
  inputData: state.map.inputData
});

const mapDispatchToProps = dispatch => ({
  getcurrentlocation: () => dispatch(currentlocation()),
  getPredictions: () => dispatch(getAddressPreditions()),
  getInputData: input => dispatch(getInputData(input)),
  getToggleSearchResult: input => dispatch(gettogglesearchresult(input))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
