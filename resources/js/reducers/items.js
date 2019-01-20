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
  fetchingSelection: false,
  lastLoadTimestamp: null,
  selection: null,
  selectionError: null,
  term: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ITEMS_FETCH:
      return { ...state, fetching: true, error: null };
    case ITEMS_POPULATE:
      return {
        ...state,
        data: [...action.items],
        fetching: false,
        lastLoadTimestamp: moment(),
        selection: null
      };
    case ITEMS_SET_ERROR:
      return { ...state, fetching: false, error: action.error };
    case ITEMS_SEARCH:
      return { ...state, term: action.term };
    case ITEMS_SELECT:
      return {
        ...state,
        selection: { ...action.selection },
        fetchingSelection: true
      };
    case ITEMS_FILL_SELECTION:
      return {
        ...state,
        selection: { ...action.item },
        fetchingSelection: false
      };
    case ITEMS_SET_SELECTION_ERROR:
      return {
        ...state,
        fetchingSelection: false,
        selectionError: action.error
      };
    default:
      return state;
  }
};
