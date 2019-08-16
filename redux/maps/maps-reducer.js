import MAPSActionTypes from "./mapsactiontypes";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATION = width / height;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;


const INITIAL_STATE = {
  location: {},
  predictions: [],
  inputData: {},
  pickUp: {},
  dropOff: {}
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAPSActionTypes.GET_CURRENT_LOCATION:
      return {
        ...state,
        location: action.payload.coords
      };
    case MAPSActionTypes.GET_ADDRESS_PREDICTION:
      return {
        ...state,
        predictions: action.payload
      };
    case MAPSActionTypes.GET_INPUT_DATA:
      return {
        ...state,
        inputData: action.payload
      };
    case MAPSActionTypes.GET_TOGGLE_SEARCH_RESULT:
      if (action.payload == "pickUp") {
        return {
          ...state,
          pickUp: true,
          dropOff: false,
          predictions: {}
        };
      }
      if (action.payload == "dropOff") {
        return {
          ...state,
          dropOff: true,
          pickUp: false,
          predictions: {}
        };
      }

    default:
      return state;
  }
};

export default mapReducer;
