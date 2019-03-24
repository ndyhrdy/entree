import Fuse from "fuse.js";
import { startsWith } from "lodash";
import { parse } from "querystring";

export const fuzzySearch = ({ list, keys = ["name"], term }) => {
  const fuse = new Fuse(list, {
    keys
  });
  return fuse.search(term);
};

export const getFlowFromQueryString = queryString => {
  if (!queryString) {
    return null;
  }
  const query = parse(
    startsWith(queryString, "?") ? queryString.substr(1) : queryString
  );
  return query._flow || null;
};
