import axios from 'axios';

const apiRoot = 'http://localhost:8000';

export const ensureCsrf = () => axios.get(`${apiRoot}/sanctum/csrf-cookie`, {
  withCredentials: true,
  withXSRFToken: true,
});

const api = axios.create({
  baseURL: `${apiRoot}/api`,
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers.Accept = 'application/json';
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = error.config?.url || '';
    if ((status === 401 || status === 419) && !/\/(login|register)$/.test(path)) {
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('lexigam:auth-expired'));
      error.isAuthError = true;
    }
    return Promise.reject(error);
  }
);

export default api;
