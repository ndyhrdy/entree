import { combineReducers } from "redux";

import activeStore from "./activeStore";
import coworkers from "./coworkers";
import items from "./items";
import prompt from "./prompt";
import stores from "./stores";
import units from "./units";
import user from "./user";

export default combineReducers({
  activeStore,
  coworkers,
  items,
  prompt,
  stores,
  units,
  user
});
