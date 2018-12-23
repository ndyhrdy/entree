import { combineReducers } from "redux";
import stores from "./stores";
import user from "./user";

export default combineReducers({
  stores, user,
});