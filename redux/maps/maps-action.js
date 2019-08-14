import MAPSActionTypes from "./mapsactiontypes";
import Geolocation from "@react-native-community/geolocation";
import RNGooglePlaces from "react-native-google-places";

export const currentlocation = () => {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
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

export const getInputData = input => {
  return {
    type: MAPSActionTypes.GET_INPUT_DATA,
    payload: input
  };
};

export const getAddressPreditions = () => {
  return (dispatch, store) => {
    let userInput = "KHOURIBGA";
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
