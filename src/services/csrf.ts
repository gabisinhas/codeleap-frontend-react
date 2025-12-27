import axios from 'axios';
import { API_BASE_URL } from './api';

export async function getCSRFToken(): Promise<string | null> {
  try {
    await axios.get(`${API_BASE_URL}/csrf/`, {
      withCredentials: true,
    });
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    return null;
  }
}
