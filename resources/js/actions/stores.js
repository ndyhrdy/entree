import { STORES_FETCH, STORES_POPULATE, STORES_SET_ERROR } from "./types";
import api, { routes } from "../api";

export const fetchStores = () => (dispatch, getState) => {
  if (getState().stores.fetching) {
    return;
  }

  dispatch({ type: STORES_FETCH });

  return api
    .get(routes.stores, { params: { with: "owner" } })
    .then(response => {
      return dispatch(populateStores(response.data.data));
    })
    .catch(error => {
      return dispatch({ type: STORES_SET_ERROR, error });
    });
};

export const populateStores = stores => ({
  type: STORES_POPULATE,
  stores
});
