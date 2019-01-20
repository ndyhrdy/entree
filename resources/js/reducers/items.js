import moment from "moment";
import {
  ITEMS_FETCH,
  ITEMS_POPULATE,
  ITEMS_SET_ERROR,
  ITEMS_SEARCH
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null,
  lastLoadTimestamp: null,
  term: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ITEMS_FETCH:
      return { ...state, fetching: true, error: null };
    case ITEMS_POPULATE:
      return {
        ...state,
        fetching: false,
        data: [...action.items],
        lastLoadTimestamp: moment()
      };
    case ITEMS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };
    case ITEMS_SEARCH:
      return { ...state, term: action.term };
    default:
      return state;
  }
};
