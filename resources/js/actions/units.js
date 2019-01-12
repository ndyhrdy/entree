import { UNITS_FETCH, UNITS_POPULATE, UNITS_SET_ERROR } from "./types";
import api, { routes } from "../api";

export const fetchUnits = () => (dispatch, getState) => {
  if (getState().units.fetching) {
    return;
  }

  dispatch({ type: UNITS_FETCH });
  return api
    .get(routes.units)
    .then(response => dispatch(populateUnits(response.data.data)))
    .catch(error =>
      dispatch({
        type: UNITS_SET_ERROR,
        error: error.response ? error.response.data : error
      })
    );
};

export const populateUnits = units => ({
  type: UNITS_POPULATE,
  units
});
