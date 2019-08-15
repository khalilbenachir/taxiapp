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
import Icon from "react-native-vector-icons/FontAwesome";
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
    Icon.loadFont();

    console.log("-------test");
    //  getPredictions();
    console.log(location);
  }

  render() {
    const { location } = this.props;
    console.log("-------location-------", typeof location.latitude);
    return (
      <View style={{flex: 1}}>
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
            <Icon active name='home' />
            <Input placeholder='Icon Textbox'/>
          </Item>
          <Item style={styles.calloutSearchLatChild}>
            <Icon active name='home' />
            <Input placeholder='Icon Textbox'/>
          </Item>
        </MapView.Callout>
        <MapView.Callout style={styles.buttonCallout}>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => console.log("press")}
          >
            <Text style={styles.touchableText}>Press Me 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => console.log("press")}
          >
            <Text style={styles.touchableText}>Press Me 2</Text>
          </TouchableOpacity>
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
    marginTop: 40
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
    borderColor: "rgba(120, 230, 40, 0.8)"
  },
  calloutSearchLatChild: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0,
    textAlign: "center",
    marginBottom: 10,
  }
});

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
