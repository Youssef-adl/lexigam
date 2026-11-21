import axios from 'axios';

// Set VITE_API_URL in Vercel to the public Laravel API URL ending in /api.
// Keep the local fallback so the existing local development workflow still works.
const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
});

// Laravel Sanctum personal access tokens are sent as Bearer tokens.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
