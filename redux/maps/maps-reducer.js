import MAPSActionTypes from "./mapsactiontypes";

const INITIAL_STATE = {
  location: {}
};

const mapReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case MAPSActionTypes.GET_CURRENT_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
};

export default mapReducer;
