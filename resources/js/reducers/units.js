import { UNITS_FETCH, UNITS_POPULATE, UNITS_SET_ERROR } from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null,
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case UNITS_FETCH:
      return { ...state, fetching: true, error: false };
    case UNITS_POPULATE:
      return { ...state, fetching: false, data: action.units };
    case UNITS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
  
}