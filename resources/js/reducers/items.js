import moment from "moment";
import {
  ITEMS_FETCH,
  ITEMS_FILL_SELECTION,
  ITEMS_POPULATE,
  ITEMS_REMOVE,
  ITEMS_SEARCH,
  ITEMS_SELECT,
  ITEMS_SET_ERROR,
  ITEMS_SET_SELECTION_ERROR,
  ITEMS_PUSH,
  ITEMS_LIST_SET_VIEW_MODE
} from "../actions/types";

const defaultState = {
  data: [],
  error: null,
  fetching: false,
  lastLoadTimestamp: null,
  listViewMode: "list",
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
        lastLoadTimestamp: moment().toDate()
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
    case ITEMS_PUSH:
      return {
        ...state,
        data: [...state.data, action.item]
      };
    case ITEMS_REMOVE:
      return {
        ...state,
        data: [...state.data.filter(item => item.slug !== action.item.slug)]
      };
    case ITEMS_LIST_SET_VIEW_MODE:
      return {
        ...state,
        listViewMode: action.mode
      };
    default:
      return state;
  }
};
