import {
  ADJUSTMENTS_FETCH,
  ADJUSTMENTS_POPULATE,
  ADJUSTMENTS_SEARCH,
  ADJUSTMENTS_SET_ERROR
} from "./types";
import api, { routes } from "@/api";

export const fetchAdjustments = () => (dispatch, getState) => {
  if (getState().adjustments.fetching) {
    return;
  }
  dispatch({ type: ADJUSTMENTS_FETCH });
  return api
    .get(routes.adjustments)
    .then(response => {
      dispatch(populateAdjustments(response.data.data));
      return Promise.resolve(response.data);
    })
    .catch(error => {
      dispatch({ type: ADJUSTMENTS_SET_ERROR, error });
      return Promise.reject(error);
    });
};

export const populateAdjustments = adjustments => ({
  type: ADJUSTMENTS_POPULATE,
  adjustments
});

export const searchAdjustments = term => ({
  type: ADJUSTMENTS_SEARCH,
  term
});
