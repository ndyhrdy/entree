import { USER_FETCH, USER_SET, USER_SET_ERROR } from "./types";
import api, { routes } from "../api";

export const fetchAuthenticatedUser = ({ callback } = {}) => (dispatch, getState) => {
  if (getState().user.fetching) {
    return;
  }

  dispatch({ type: USER_FETCH });
  return api
    .get(routes.authenticatedUser)
    .then(response => {
      dispatch(setAuthenticatedUser(response.data.data));
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
