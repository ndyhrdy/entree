import { ACTIVE_STORE_SWITCH, ACTIVE_STORE_SET } from "../actions/types";

const defaultState = {
  data: null,
  switching: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIVE_STORE_SET:
      return { ...state, data: action.store, switching: false };
    case ACTIVE_STORE_SWITCH:
      return { ...state, switching: true };
    default:
      return { ...state };
  }
};
