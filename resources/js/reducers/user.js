import { USER_FETCH, USER_SET, USER_SET_ERROR } from "../actions/types";

const defaultState = {
  user: null,
  fetching: false,
  error: null,
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case USER_FETCH:
      return { ...state, fetching: true, error: null };
    case USER_SET: 
      return { ...state, user: { ...action.user }, fetching: false };
    case USER_SET_ERROR: 
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
  
}