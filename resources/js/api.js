import axios from "axios";

export const routes = {
  authenticatedUser: '/user',
  coworkers: '/coworkers',
  stores: '/stores',
  units: '/units',
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL,
});