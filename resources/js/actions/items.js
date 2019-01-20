import api, { routes } from "../api";
import {
  ITEMS_FETCH,
  ITEMS_POPULATE,
  ITEMS_SET_ERROR,
  ITEMS_SEARCH
} from "./types";

export const fetchItems = () => (dispatch, getState) => {
  if (getState().items.fetching) {
    return;
  }
  dispatch({ type: ITEMS_FETCH });
  return api
    .get(routes.items)
    .then(response => {
      return dispatch(populateItems(response.data.data));
    })
    .catch(error => {
      return dispatch({ type: ITEMS_SET_ERROR, error });
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
