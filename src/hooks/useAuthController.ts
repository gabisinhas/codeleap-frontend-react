import { useState } from 'react';
import { loginWithGoogle as apiLoginWithGoogle } from '../services/api';
import { handleError } from '../utils/errorHandler';

export type AuthUser = {
  username?: string;
  email?: string;
  name?: string;
  googleToken?: string;
};

const storage = {
  saveAuth: (data: { access: string; refresh: string; user: { username: string; [key: string]: unknown } }) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
  },
  
  getStoredUser: (): AuthUser | null => {
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');
    
    if (!storedUser || !accessToken) return null;
    
    try {
      const parsedUser = JSON.parse(storedUser);
      return { 
        username: parsedUser.username,
        email: parsedUser.email,
        name: parsedUser.name
      };
    } catch {
      storage.clearAuth();
      return null;
    }
  },
  
  clearAuth: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

export function useAuthController() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    return storage.getStoredUser();
  });

  const loginWithUsername = (login: string, _password?: string) => {
    // Check if login is an email
    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(login);
    
    setUser({ 
      username: isEmail ? undefined : login,
      email: isEmail ? login : undefined
    });
  };

  const loginWithGoogle = async (googleToken: string, googleUserName?: string) => {
    try {
      const response = await apiLoginWithGoogle(googleToken);
      
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        alert('Backend configuration error');
        return;
      }
      
      const { access, refresh, user: userData } = response.data || {};
      if (!access || !refresh || !userData) {
        alert('Invalid server response');
        return;
      }
      
      // Include Google user name in stored data
      const userWithGoogleName = {
        ...userData,
        name: googleUserName || userData.name
      };
      
      storage.saveAuth({ access, refresh, user: userWithGoogleName });
      setUser({ 
        username: userData.username, 
        email: userData.email,
        name: googleUserName || userData.name,
        googleToken 
      });
      
    } catch (error) {
      handleError(error, 'Google Authentication');
    }
  };

  const logout = () => {
    setUser(null);
    storage.clearAuth();
  };

  return {
    user,
    loginWithUsername,
    loginWithGoogle,
    logout,
  };
}
