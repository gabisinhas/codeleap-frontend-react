import { getCSRFToken } from './csrf';
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API Base URL not configured');
}


export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    if (!config.headers['Accept']) {
      config.headers['Accept'] = 'application/json';
    }
    
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      const isAuthEndpoint = config.url?.includes('/auth/login/') || 
                            config.url?.includes('/auth/registration/') || 
                            config.url?.includes('/auth/google/') ||
                            config.url?.includes('/csrf/');
      
      if (!isAuthEndpoint) {
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (contentType && !contentType.includes('application/json')) {
      console.warn('Backend did not return application/json. Content-Type:', contentType);
      console.warn('Response data:', response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    if (error.response?.headers && error.response.headers['content-type']) {
      const contentType = error.response.headers['content-type'];
      if (!contentType.includes('application/json')) {
      }
    }
    
    return Promise.reject(error);
  }
);

export function fetchPosts() {
  return api.get('/listposts/');
}

export function createPost(data: {
  username: string;
  title: string;
  content: string;
}) {
  return api.post('/createpost/', data);
}

export function updatePost(
  id: number,
  data: { title: string; content: string }
) {
  return api.patch(`/editpost/${id}/`, data);
}

export function deletePost(id: number) {
  return api.delete(`/deletepost/${id}/`);
}

export function loginUser(data: {
  email?: string;
  username?: string;
  password: string;
}) {
  return api.post('/auth/login/', data);
}

export function registerUser(data: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) {
  return api.post('/auth/register/', data);
}

import { withRetry } from '../utils/errorHandler';

export async function loginWithGoogle(googleToken: string) {
  const csrfToken = await getCSRFToken();

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
  };

  return withRetry(
    () => api.post(
      '/auth/google/',
      { token: googleToken },
      {
        headers,
        withCredentials: true,
        timeout: 30000,
      }
    ),
    2, // Max 2 retries for auth
    1000,
    'Google OAuth Login'
  );
}
