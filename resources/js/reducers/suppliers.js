import moment from "moment";
import {
  SUPPLIERS_FETCH,
  SUPPLIERS_POPULATE,
  SUPPLIERS_PUSH,
  SUPPLIERS_REMOVE,
  SUPPLIERS_SET_FETCH_ERROR,
  SUPPLIERS_SEARCH,
  SUPPLIERS_REPLACE
} from "../actions/types";

const defaultState = {
  data: [],
  fetching: false,
  fetchingError: null,
  lastLoadTimestamp: null,
  searchTerm: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SUPPLIERS_FETCH:
      return {
        ...state,
        fetching: true,
        fetchingError: defaultState.fetchingError
      };
    case SUPPLIERS_POPULATE:
      return {
        ...state,
        data: action.suppliers,
        fetching: defaultState.fetching,
        lastLoadTimestamp: moment().toDate()
      };
    case SUPPLIERS_PUSH:
      return { ...state, data: [...state.data, action.supplier] };
    case SUPPLIERS_REMOVE:
      return {
        ...state,
        data: [
          ...state.data.filter(supplier => supplier.id !== action.supplier.id)
        ]
      };
    case SUPPLIERS_REPLACE:
      return {
        ...state,
        data: [
          ...state.data.map(supplier =>
            supplier.id === action.supplier.id ? action.supplier : supplier
          )
        ]
      };
    case SUPPLIERS_SEARCH:
      return {
        ...state,
        searchTerm: action.term
      };
    case SUPPLIERS_SET_FETCH_ERROR:
      return {
        ...state,
        fetching: defaultState.fetching,
        fetchingError: action.error
      };
    default:
      return state;
  }
};
