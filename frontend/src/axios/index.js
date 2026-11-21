import axios from 'axios';

// Accept either the backend origin or an API URL ending in /api.
// This avoids both /api/sanctum/csrf-cookie and accidental /api/api routes.
const configuredApiUrl = String(
  import.meta.env.VITE_API_URL || 'http://localhost:8000'
).trim().replace(/\/+$/, '');

const backendOrigin = configuredApiUrl.replace(/\/api$/i, '');
const apiBaseUrl = `${backendOrigin}/api`;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers.Accept = 'application/json';

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const config = error.config || {};
    const path = config.url || '';

    if (
      status === 401 &&
      localStorage.getItem('user') &&
      !/\/(login|register|logout|me)$/.test(path)
    ) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('lexigam:auth-expired'));
      error.isAuthError = true;
    }

    return Promise.reject(error);
  }
);

export default api;
