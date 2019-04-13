import moment from "moment";

export default (items, sorting) => {
  switch (sorting.key) {
    case "tx":
      return [...items.sort(latestTransaction())];
    case "created":
      return [...items.sort(lastCreated())];
    case "alpha-desc":
      return [...items.sort(alphabetically(false))];
    case "alpha-asc":
    default:
      return [...items.sort(alphabetically())];
  }
};

export const types = [
  { key: "created", label: "Last Created" },
  // { key: "tx", label: "Latest Transaction" },
  { key: "alpha-asc", label: "Alphabetically (A-Z)" },
  { key: "alpha-desc", label: "Alphabetically (Z-A)" }
];

const alphabetically = (ascending = true) => {
  return (a, b) => (a.name > b.name ? 1 : -1) * (ascending ? 1 : -1);
};

const latestTransaction = () => {
  return (a, b) => {
    if (!a.lastMutation && b.lastMutation) return 1;
    if (a.lastMutation && !b.lastMutation) return -1;
    if (a.lastMutation && b.lastMutation)
      return moment(a.lastMutation).isBefore(b.lastMutation) ? -1 : 1;
    return 0;
  };
};

const lastCreated = () => (a, b) => {
  return moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1;
};
