import {
  STORES_FETCH,
  STORES_POPULATE,
  STORES_SET_ERROR,
  ACTIVE_STORE_SET,
  ACTIVE_STORE_SWITCH
} from "./types";
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

export const switchActiveStore = store => (dispatch, getState) => {
  if (getState().activeStore.switching) {
    return;
  }
  dispatch({ type: ACTIVE_STORE_SWITCH });

  return api.patch(routes.stores + '/' + store.slug, { context: 'switch'})
    .then(() => { window.location.href = window.appConfig.baseURL; })
    .catch(error => console.log(error));
};

export const setActiveStore = store => ({
  type: ACTIVE_STORE_SET,
  store
});
