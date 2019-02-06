import axios from "axios";

export const routes = {
  adjustments: "/adjustments",
  authenticatedUser: "/user",
  coworkers: "/coworkers",
  items: "/items",
  stores: "/stores",
  units: "/units"
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL
});
