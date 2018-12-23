import {
  STORES_FETCH,
  STORES_POPULATE,
  STORES_SET_ERROR
} from "../actions/types";

const defaultState = {
  stores: [],
  fetching: false,
  error: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case STORES_FETCH:
      return { ...state, fetching: true, error: false };
    case STORES_POPULATE:
      return { ...state, stores: action.stores.slice(0), fetching: false };
    case STORES_SET_ERROR:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
};
