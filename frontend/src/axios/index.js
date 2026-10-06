import axios from 'axios';

const apiRoot = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
  async (error) => {
    const status = error.response?.status;
    const config = error.config || {};
    const path = config.url || '';

    if (status === 419 && !config._csrfRetry) {
      config._csrfRetry = true;
      await ensureCsrf();
      return api(config);
    }

    if ((status === 401 || status === 419)
      && localStorage.getItem('user')
      && !/\/(login|register|logout|me)$/.test(path)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('lexigam:auth-expired'));
      error.isAuthError = true;
    }

    return Promise.reject(error);
  }
);

export default api;
