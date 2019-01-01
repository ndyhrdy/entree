import { combineReducers } from "redux";

import activeStore from "./activeStore";
import coworkers from "./coworkers";
import prompt from "./prompt";
import stores from "./stores";
import user from "./user";

export default combineReducers({
  activeStore,
  coworkers,
  prompt,
  stores,
  user
});
