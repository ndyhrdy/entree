import axios from "axios";

export const routes = {
  authenticatedUser: '/user',
};

export default axios.create({
  baseURL: window.appConfig.apiBaseURL,
});