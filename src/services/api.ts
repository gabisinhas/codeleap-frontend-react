import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchPosts() {
  return api.get('/posts');
}

export function createPost(data: {
  title: string;
  content: string;
  username: string;
}) {
  return api.post('/posts', data);
}

export function updatePost(
  id: number,
  data: { title: string; content: string }
) {
  return api.put(`/posts/${id}`, data);
}

export function deletePost(id: number) {
  return api.delete(`/posts/${id}`);
}

export function loginUser(data: {
  email: string;
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
