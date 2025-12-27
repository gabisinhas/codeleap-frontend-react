import { getCSRFToken } from './csrf';
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Enviando Authorization:', config.headers['Authorization']);
    } else {
      console.warn('Token JWT não encontrado no localStorage. Nenhum Authorization será enviado.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');

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
  return api.patch(`/posts/${id}/`, data);
}

export function deletePost(id: number) {
  return api.delete(`/posts/${id}/`);
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
  return api.post('/auth/registration/', data);
}




export async function loginWithGoogle(googleToken: string) {
  const csrfToken = await getCSRFToken();

  return api.post(
    '/auth/google/',
    { token: googleToken },
    {
      headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {},
      withCredentials: true,
    }
  );
}
