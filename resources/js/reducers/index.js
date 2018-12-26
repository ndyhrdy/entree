import { combineReducers } from "redux";

import coworkers from "./coworkers";
import stores from "./stores";
import user from "./user";

export default combineReducers({
  coworkers,
  stores,
  user
});
