/**
 * Centralized Axios API Client
 *
 * Creates a configured Axios instance that all service files use.
 * Base URL is driven by the VITE_API_BASE_URL env variable so it
 * can be pointed at local dev, staging, or production without code changes.
 */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// -- Request interceptor --------------------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if present (e.g. from localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// -- Response interceptor ------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.detail ??
      error.message ??
      'An unexpected error occurred';

    console.error('[API Error]', message, error.response?.status);
    return Promise.reject(new Error(message));
  },
);

export default apiClient;

/** Unwrap the standard { message, data, success } envelope from the backend */
export function unwrap<T>(response: { data: { data: T } }): T {
  return response.data.data;
}
