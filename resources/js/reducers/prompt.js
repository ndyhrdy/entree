import { PROMPT_SHOW, PROMPT_HIDE } from "../actions/types";

const defaultState = {
  content: null,
  shown: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case PROMPT_SHOW:
      return { ...state, content: action.content, shown: true };
    case PROMPT_HIDE:
      return { ...state, shown: false };
    default:
      return { ...state };
  }
};
