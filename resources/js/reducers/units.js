import moment from "moment";
import {
  UNITS_FETCH,
  UNITS_POPULATE,
  UNITS_SET_ERROR,
  UNITS_REMOVE
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  error: null,
  lastLoadTimestamp: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UNITS_FETCH:
      return { ...state, fetching: true, error: false };
    case UNITS_POPULATE:
      return {
        ...state,
        fetching: false,
        data: action.units,
        lastLoadTimestamp: moment().toDate()
      };
    case UNITS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };
    case UNITS_REMOVE:
      return {
        ...state,
        data: [...state.data.filter(unit => unit.id !== action.unitId)]
      };
    default:
      return state;
  }
};
