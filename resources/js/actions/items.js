import api, { routes } from "../api";
import {
  ITEMS_FETCH,
  ITEMS_POPULATE,
  ITEMS_REMOVE,
  ITEMS_SET_ERROR,
  ITEMS_SEARCH,
  ITEMS_SELECT,
  ITEMS_FILL_SELECTION,
  ITEMS_SET_SELECTION_ERROR,
  ITEMS_PUSH,
  ITEMS_LIST_SET_VIEW_MODE
} from "./types";

export const fetchItems = () => (dispatch, getState) => {
  if (getState().items.fetching) {
    return;
  }
  dispatch({ type: ITEMS_FETCH });
  return api
    .get(routes.items)
    .then(response => {
      dispatch(populateItems(response.data.data));
      return Promise.resolve(response.data.data);
    })
    .catch(error => {
      dispatch({ type: ITEMS_SET_ERROR, error });
      return Promise.reject(error);
    });
};

export const searchItems = term => ({
  type: ITEMS_SEARCH,
  term
});

export const populateItems = items => ({
  type: ITEMS_POPULATE,
  items
});

export const selectItem = item => (dispatch, getState) => {
  dispatch({ type: ITEMS_SELECT, selection: item });

  return api
    .get(routes.items + "/" + item.slug)
    .then(response => dispatch(fillItemSelection(response.data.data)))
    .catch(error => dispatch({ type: ITEMS_SET_SELECTION_ERROR, item, error }));
};

export const fillItemSelection = item => ({
  type: ITEMS_FILL_SELECTION,
  item
});

export const pushItem = item => ({
  type: ITEMS_PUSH,
  item
});

export const removeItem = item => ({
  type: ITEMS_REMOVE,
  item
});

export const setItemsListViewMode = mode => ({
  type: ITEMS_LIST_SET_VIEW_MODE,
  mode
});
