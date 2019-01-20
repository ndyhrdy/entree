import axios from "axios";

export const routes = {
  authenticatedUser: '/user',
  coworkers: '/coworkers',
  items: '/items',
  stores: '/stores',
  units: '/units',
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL,
});