import { PROMPT_HIDE, PROMPT_SHOW } from "./types";

export const showPrompt = content => ({
  type: PROMPT_SHOW,
  content
});

export const hidePrompt = () => ({ type: PROMPT_HIDE });
