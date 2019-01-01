import {
  COWORKERS_FETCH,
  COWORKERS_POPULATE,
  COWORKERS_SET_ERROR,
  COWORKERS_SEARCH
} from "./types";
import api, { routes } from "../api";

export const fetchCoworkers = () => (dispatch, getState) => {
  if (getState().coworkers.fetching || !getState().activeStore.data) {
    return;
  }

  dispatch({ type: COWORKERS_FETCH });

  return api
    .get(routes.coworkers, {
      params: {
        store: getState().activeStore.data.slug
      }
    })
    .then(response => {
      return dispatch(populateCoworkers(response.data.data));
    })
    .catch(error => {
      return dispatch({ type: COWORKERS_SET_ERROR, error });
    });
};

export const populateCoworkers = coworkers => ({
  type: COWORKERS_POPULATE,
  coworkers
});

export const searchCoworkers = term => ({
  type: COWORKERS_SEARCH,
  term
});
