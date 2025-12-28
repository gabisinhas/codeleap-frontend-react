import axios from 'axios';
import { API_BASE_URL } from './api';

export async function getCSRFToken(): Promise<string | null> {
  try {
    
    await axios.get(`${API_BASE_URL}/csrf/`, {
      withCredentials: true,
      timeout: 10000,
    });
    
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    const token = match ? match[1] : null;
    
    if (!token) {
      console.warn('CSRF token not found in cookies. Available cookies:', document.cookie);
    }
    
    return token;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', {
      error,
      url: `${API_BASE_URL}/csrf/`,
      cookies: document.cookie
    });
    return null;
  }
}
