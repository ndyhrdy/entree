import moment from "moment";
import {
  ITEMS_FETCH,
  ITEMS_FILL_SELECTION,
  ITEMS_POPULATE,
  ITEMS_SEARCH,
  ITEMS_SELECT,
  ITEMS_SET_ERROR,
  ITEMS_SET_SELECTION_ERROR
} from "../actions/types";

const defaultState = {
  data: [],
  error: null,
  fetching: false,
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
        data: [
          ...action.items.map(item => ({
            ...item,
            fetching: false,
            error: null
          }))
        ],
        fetching: false,
        lastLoadTimestamp: moment()
      };
    case ITEMS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };

    case ITEMS_SEARCH:
      return { ...state, term: action.term };

    case ITEMS_SELECT:
      return {
        ...state,
        data: [...state.data].map(item =>
          item.slug === action.selection.slug
            ? { ...item, fetching: true, error: false }
            : item
        )
      };
    case ITEMS_FILL_SELECTION:
      return {
        ...state,
        data: [...state.data].map(item =>
          item.slug === action.item.slug
            ? { ...item, ...action.item, fetching: false }
            : item
        )
      };
    case ITEMS_SET_SELECTION_ERROR:
      return {
        ...state,
        data: [...state.data].map(item =>
          item.slug === action.item.slug
            ? { ...item, fetching: false, error: action.error }
            : item
        )
      };
    default:
      return state;
  }
};
