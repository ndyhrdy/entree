import axios from "axios";

export const routes = {
  authenticatedUser: '/user',
  stores: '/stores',
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL,
});