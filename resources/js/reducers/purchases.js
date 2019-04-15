import {
  PURCHASES_FETCH,
  PURCHASES_POPULATE,
  PURCHASES_PUSH,
  PURCHASES_SEARCH,
  PURCHASES_SET_FETCH_ERROR
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  fetchingError: null,
  lastLoadTimestamp: null,
  term: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case PURCHASES_FETCH:
      return {
        ...state,
        fetching: true,
        fetchingError: defaultState.fetchingError
      };
    case PURCHASES_POPULATE:
      return {
        ...state,
        fetching: defaultState.fetching,
        data: action.purchases
      };
    case PURCHASES_PUSH:
      return { ...state, data: [...state.data, action.purchase] };
    case PURCHASES_SEARCH:
      return { ...state, term: action.term };
    case PURCHASES_SET_FETCH_ERROR:
      return { ...state, error: action.error, fetching: defaultState.fetching };
    default:
      return state;
  }
};
