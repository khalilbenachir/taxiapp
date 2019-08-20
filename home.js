import React from "react";
import store from "./redux/store";
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

import ListView from "./component/listview";
import FooterComponent from "./component/footercomponent.js";

import {
  currentlocation,
  getAddressPreditions,
  getInputData,
  gettogglesearchresult,
  selectedAddress
} from "./redux/maps/maps-action";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATION = width / height;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

class Home extends React.Component {
  componentDidMount() {
    const { getcurrentlocation, location, inputData } = this.props;
    getcurrentlocation();
    Icon.loadFont();
    console.log("-------test");
    console.log(location);
    console.log(inputData);
  }

  render() {
    const {
      getPredictions,
      pickUp,
      dropOff,
      selectedPickUp,
      selectedDropOff,
      location
    } = this.props;
    getPredictions();
    console.log("-------location-------", typeof location.latitude);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
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
        <View style={styles.wrapper}>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center"
            }}
          >
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
                  onChangeText={text =>
                    this.props.getInputData({ pickUp: text })
                  }
                  value={selectedPickUp && selectedPickUp.name}
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
                  onChangeText={text =>
                    this.props.getInputData({ dropOff: text })
                  }
                  value={selectedDropOff && selectedDropOff.name}
                />
              </Item>
            </MapView.Callout>
            {(pickUp || dropOff) && <ListView style={styles.listview} />}
          </View>
        </View>
        <FooterComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    width: "80%",
    position: 'absolute',
    top: 110
  },
  wrapper:{
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    top: 50,
    width: "100%"
  },
  searchCallout: {
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    width: "80%",
    position: 'relative',
    alignItems: 'center'
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
    borderColor: "rgba(128,128,128,0.2)"
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
  inputData: state.map.inputData,
  pickUp: state.map.pickUp,
  dropOff: state.map.dropOff,
  selectedPickUp: state.map.selectedAddress.selectedPickUp,
  selectedDropOff: state.map.selectedAddress.selectedDropOff
});

const mapDispatchToProps = dispatch => ({
  getcurrentlocation: () => dispatch(currentlocation()),
  getPredictions: () => dispatch(getAddressPreditions()),
  getInputData: input => dispatch(getInputData(input)),
  getToggleSearchResult: input => dispatch(gettogglesearchresult(input)),
  getSelectedAddress: input => dispatch(selectedAddress(input))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
