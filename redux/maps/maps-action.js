import MAPSActionTypes from "./mapsactiontypes";
import Geolocation from "@react-native-community/geolocation";
import RNGooglePlaces from "react-native-google-places";
import * as axios from "axios";

export const currentlocation = () => {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: MAPSActionTypes.GET_CURRENT_LOCATION,
          payload: position
        });
      },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };
};

export const selectedAddress = placeId => {
  return (dispatch, getState) => {
    RNGooglePlaces.lookUpPlaceByID(placeId)
      .then(results => {
        console.log(results);
        dispatch({
          type: MAPSActionTypes.GET_SELECTED_ADDRESS,
          payload: results.data
        });
      })
      .then(() => {
        const { location } = getState().map.selectedAddress.selectedPickUp;
        console.log("-------getstate-----", location);
        if (
          getState().map.selectedAddress.selectedPickUp ||
          getState().map.selectedAddress.selectedDropOff
        )
        axios
          .get("https://maps.googleapis.com/maps/api/place/details/json", {
            params: {
              key: "AIzaSyCFY34jgMctlQaidqs1i4pngrPm4XSk7hg",
              origins: location.latitude + "," + location.longitude,
              destinations: location.latitude + "," + location.longitude,
              mode: "driving"
            }
          })
          .then(response => {
            // handle success
            console.log("=========response", response);
            dispatch({
              type: MAPSActionTypes.GET_DISTANCE_MATRIX,
              payload: response
            });
          });
      })
      .catch(err => console.log(err.message));
  };
};

export const getInputData = input => {
  return {
    type: MAPSActionTypes.GET_INPUT_DATA,
    payload: input
  };
};

export const gettogglesearchresult = input => {
  return {
    type: MAPSActionTypes.GET_TOGGLE_SEARCH_RESULT,
    payload: input
  };
};

export const getbookcar = () => {
  return (dispatch, getState) => {
    console.log('---------//////-------',getState().map.selectedAddress.selectedPickUp);
    const {
      location,
      address,
      name
    } = getState().map.selectedAddress.selectedPickUp;
    const payload = {
      data: {
        pickUp: {
          address: address,
          name: name,
          latitude: location.latitude,
          longitude: location.longitude
        },
        dropOff: {
          address: address,
          name: name,
          latitude: location.latitude,
          longitude: location.longitude
        },
        status: "pending"
      }
    };
    axios
      .post("http://localhost:3000/api/booking", payload.data)
      .then(result => {
        console.log("------------result----------", result);
        dispatch({
          type: MAPSActionTypes.GET_BOOK_CAR,
          payload: result.body
        });
      })
      .catch(e => console.log(e.message));
  };
};

export const getAddressPreditions = () => {
  return (dispatch, getState) => {
    let userInput = getState().map.pickUp
      ? getState().map.inputData.pickUp
      : getState().map.inputData.dropOff;
    RNGooglePlaces.getAutocompletePredictions(userInput)
      .then(results => {
        console.log(results);
        dispatch({
          type: MAPSActionTypes.GET_ADDRESS_PREDICTION,
          payload: results
        });
      })
      .catch(err => console.log(err.message));
  };
};
