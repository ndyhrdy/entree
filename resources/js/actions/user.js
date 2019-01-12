import { USER_FETCH, USER_SET, USER_SET_ERROR, USER_CLEAR } from "./types";
import api, { routes } from "../api";
import { setActiveStore } from "./stores";

export const fetchAuthenticatedUser = ({ callback } = {}) => (
  dispatch,
  getState
) => {
  if (getState().user.fetching) {
    return;
  }

  dispatch({ type: USER_FETCH });
  return api
    .get(routes.authenticatedUser)
    .then(response => {
      let { data } = response.data;
      dispatch(setActiveStore(data.activeStore ? data.activeStore.data : null));
      data.activeStore && delete data.activeStore;
      dispatch(setAuthenticatedUser(data));
      callback && callback(response);
      return;
    })
    .catch(error => {
      return { type: USER_SET_ERROR, error };
    });
};

export const setAuthenticatedUser = user => ({
  type: USER_SET,
  user
});

export const clearUser = () => ({
  type: USER_CLEAR
});
