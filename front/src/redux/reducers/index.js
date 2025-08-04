import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import transReducer from "./transReducers";

const reducers = combineReducers({
  user: userReducer,
  trans: transReducer,
});

export default reducers;
