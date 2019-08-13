import { combineReducers } from "redux";

import mapReducer from "../redux/maps/maps-reducer";


export default combineReducers({
  map: mapReducer
});
