import {
  PURCHASES_FETCH,
  PURCHASES_POPULATE,
  PURCHASES_PUSH,
  PURCHASES_SEARCH,
  PURCHASES_SET_FETCH_ERROR,
  PURCHASES_SELECT,
  PURCHASES_FILL_SELECTION
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
        data: [
          ...action.purchases.map(purchase => ({
            ...purchase,
            fetching: false,
            error: null,
            isComplete: purchase.isComplete || false
          }))
        ]
      };
    case PURCHASES_PUSH:
      return { ...state, data: [...state.data, action.purchase] };
    case PURCHASES_SEARCH:
      return { ...state, term: action.term };
    case PURCHASES_SET_FETCH_ERROR:
      return { ...state, error: action.error, fetching: defaultState.fetching };
    case PURCHASES_SELECT:
      return {
        ...state,
        data: [
          ...state.data.map(purchase =>
            purchase.id === action.purchase.id
              ? { ...purchase, fetching: true, error: null }
              : purchase
          )
        ]
      };
    case PURCHASES_FILL_SELECTION:
      return {
        ...state,
        data: [
          ...state.data.map(purchase =>
            purchase.id === action.purchase.id
              ? {
                  ...purchase,
                  fetching: false,
                  ...action.purchase,
                  isComplete: true
                }
              : purchase
          )
        ]
      };
    default:
      return state;
  }
};
