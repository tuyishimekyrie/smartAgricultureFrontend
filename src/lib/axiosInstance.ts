import axios, { AxiosInstance, AxiosError ,InternalAxiosRequestConfig} from 'axios';
import getToken from './getToken';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_api_url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error('[Request Error]:', error.message);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => {
      return response.data; // Return only the actual data
    },
    (error: AxiosError) => {
      if (error.response) {
        console.error('[Response Error]:', error.response.status, error.response.data);
      } else {
        console.error('[Network Error]:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Exported axios instance
export const api = createAxiosInstance();
