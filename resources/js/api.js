import axios from "axios";

export const routes = {
  authenticatedUser: '/user',
  coworkers: '/coworkers',
  stores: '/stores',
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL,
});