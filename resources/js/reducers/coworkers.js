import {
  COWORKERS_FETCH,
  COWORKERS_POPULATE,
  COWORKERS_SET_ERROR,
  COWORKERS_SEARCH,
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null,
  term: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case COWORKERS_FETCH:
      return { ...state, fetching: true, error: null };
    case COWORKERS_POPULATE:
      return { ...state, fetching: false, data: [...action.coworkers] };
    case COWORKERS_SET_ERROR:
      return { ...state, fetching: false, error: { ...action.error } };
    case COWORKERS_SEARCH:
      return { ...state, term: action.term };
    default:
      return { ...state };
  }
};
