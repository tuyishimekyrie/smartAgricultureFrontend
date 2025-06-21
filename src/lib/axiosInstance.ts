import axios from 'axios';
import getToken from './getToken';

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_api_url,
        headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken('token')}`,
        },
    });
    
    instance.interceptors.request.use(
        (config) => {
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );
    
    instance.interceptors.response.use(
        (response) => {
        return response.data;
        },
        (error) => {
        return Promise.reject(error);
        }
    );
    
    return instance;
}

export const api = axiosInstance();