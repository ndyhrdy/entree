import Fuse from "fuse.js";

export const fuzzySearch = ({ list, keys = ["name"], term }) => {
  const fuse = new Fuse(list, {
    keys
  });
  return fuse.search(term);
};
