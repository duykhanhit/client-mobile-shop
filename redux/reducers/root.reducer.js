import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;
