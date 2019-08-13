import MAPSActionTypes from "./mapsactiontypes";
import Geolocation from "react-native-geolocation-service";

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
