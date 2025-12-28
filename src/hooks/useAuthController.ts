import { useState, useEffect } from 'react';
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
    
    // Require both user data and access token
    if (!storedUser || !accessToken) {
      return null;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      
      // Validate that we have meaningful user data
      if (!parsedUser || typeof parsedUser !== 'object') {
        return null;
      }
      
      // Check if we have at least one identifier (username, email, or name)
      if (!parsedUser.username && !parsedUser.email && !parsedUser.name) {
        return null;
      }
      
      return { 
        username: parsedUser.username,
        email: parsedUser.email,
        name: parsedUser.name
      };
    } catch (error) {
      console.error('Error parsing stored user data:', error);
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
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize user state synchronously from localStorage on first render
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const accessToken = localStorage.getItem('access_token');
      
      if (!storedUser || !accessToken) {
        return null;
      }
      
      const parsedUser = JSON.parse(storedUser);
      
      // Validate that we have meaningful user data
      if (!parsedUser || typeof parsedUser !== 'object') {
        storage.clearAuth();
        return null;
      }
      
      // Check if we have at least one identifier
      if (!parsedUser.username && !parsedUser.email && !parsedUser.name) {
        storage.clearAuth();
        return null;
      }
      
      return { 
        username: parsedUser.username,
        email: parsedUser.email,
        name: parsedUser.name
      };
    } catch (error) {
      console.error('Error initializing user from localStorage:', error);
      storage.clearAuth();
      return null;
    }
  });

  // Set initialization complete immediately after first render
  useEffect(() => {
    setIsInitializing(false);
  }, []);

  const loginWithUsername = (login: string, _password?: string) => {
    if (!login.trim()) {
      console.error('Login cannot be empty');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if login is an email
      const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(login);
      
      const userData = { 
        username: isEmail ? undefined : login.trim(),
        email: isEmail ? login.trim() : undefined
      };
      
      // Store user data for consistency
      const userToStore = {
        username: userData.username || userData.email || 'anonymous',
        email: userData.email,
        name: userData.username || userData.email
      };
      
      // Create mock auth tokens for username login (for consistency)
      const mockAuth = {
        access: 'mock_access_token',
        refresh: 'mock_refresh_token',
        user: userToStore
      };
      
      storage.saveAuth(mockAuth);
      setUser(userData);
    } catch (error) {
      console.error('Error during username login:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleToken: string, googleUserName?: string) => {
    setIsLoading(true);
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
      setIsLoading(false);
      
    } catch (error) {
      handleError(error, 'Google Authentication');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    
    try {
      setUser(null);
      storage.clearAuth();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    loginWithUsername,
    loginWithGoogle,
    logout,
    isLoading,
    isInitializing,
  };
}
