import MAPSActionTypes from "./mapsactiontypes";
import Geolocation from "@react-native-community/geolocation";
import RNGooglePlaces from "react-native-google-places";
import axios from "axios";

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
          payload: results
        });
      })
      .then(() => {
        if (
          getState().map.selectedAddress.selectedPickUp ||
          getState().map.selectedAddress.selectedDropOff
        )
          console.log(
            "-------getstate-----",
            getState().map.selectedAddress.selectedPickUp
          );
        axios
          .get("https://maps.googleapis.com/maps/api/place/details/json", {
            params: {
              key: "AIzaSyCFY34jgMctlQaidqs1i4pngrPm4XSk7hg",
              origins:
                getState().map.selectedAddress.selectedPickUp.latitude +
                "," +
                getState().map.selectedAddress.selectedPickUp.longitude,
              destinations:
                getState().map.selectedAddress.selectedDropOff.latitude +
                "," +
                getState().map.selectedAddress.selectedDropOff.longitude,
              mode: "driving"
            }
          })
          .then(response => {
            // handle success
            console.log("=========response", response);
            dispatch({
              type: MAPSActionTypes.GET_DISTANCE_MATRIX,
              payload: response.body
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
