import axios from "axios";

export const routes = {
  adjustments: "/adjustments",
  authenticatedUser: "/user",
  coworkers: "/coworkers",
  items: "/items",
  stores: "/stores",
  units: "/units"
};

const api = axios.create({
  baseURL: window.appConfig.apiBaseURL
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      window.alert("Your session has ended. Please log in.");
      window.location.href = window.appConfig.baseURL + "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
