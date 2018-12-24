import {
  STORES_FETCH,
  STORES_POPULATE,
  STORES_SET_ERROR
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case STORES_FETCH:
      return { ...state, fetching: true, error: null };
    case STORES_POPULATE:
      return { ...state, data: action.stores.slice(0), fetching: false };
    case STORES_SET_ERROR:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
};
