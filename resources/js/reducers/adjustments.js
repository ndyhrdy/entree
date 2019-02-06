import {
  ADJUSTMENTS_FETCH,
  ADJUSTMENTS_POPULATE,
  ADJUSTMENTS_SEARCH,
  ADJUSTMENTS_SET_ERROR
} from "@/actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null,
  term: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADJUSTMENTS_FETCH:
      return { ...state, fetching: true, error: null };
    case ADJUSTMENTS_POPULATE:
      return { ...state, data: [...action.adjustments], fetching: false };
    case ADJUSTMENTS_SEARCH:
      return { ...state, term: action.term };
    case ADJUSTMENTS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
};
