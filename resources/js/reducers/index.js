import { combineReducers } from "redux";

import activeStore from "./activeStore";
import adjustments from "./adjustments";
import coworkers from "./coworkers";
import items from "./items";
import prompt from "./prompt";
import purchases from "./purchases";
import stores from "./stores";
import suppliers from "./suppliers";
import units from "./units";
import user from "./user";

export default combineReducers({
  activeStore,
  adjustments,
  coworkers,
  items,
  prompt,
  purchases,
  stores,
  suppliers,
  units,
  user
});
