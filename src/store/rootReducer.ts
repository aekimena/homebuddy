import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../storeServices/user/userReducer";
import authReducer from "../storeServices/auth/authReducer";
import locationReducer from "../storeServices/location/locationReducer";

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  location: locationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
