import { useState } from 'react';
import { loginWithGoogle as apiLoginWithGoogle } from '../services/api';

export type AuthUser = {
  username?: string;
  googleToken?: string;
};

export function useAuthController() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginWithUsername = (username: string) => {
    setUser({ username });
  };

  const loginWithGoogle = async (googleToken: string, googleUserName?: string) => {
    try {
      const response = await apiLoginWithGoogle(googleToken);

      console.log('Resposta completa do login Google:', response.data);
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token salvo (token):', response.data.token);
      } else if (response?.data?.access) {
        localStorage.setItem('token', response.data.access);
        console.log('Token salvo (access):', response.data.access);
      } else if (response?.data?.key) {
        localStorage.setItem('token', response.data.key);
        console.log('Token salvo (key):', response.data.key);
      } else {
        console.warn('Nenhum token retornado pelo backend:', response.data);
      }
      setUser({
        username: googleUserName || response.data?.username || 'Google User',
        googleToken,
      });
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        alert('CSRF token missing or invalid. Please try again.');
      } else {
        alert('Erro ao autenticar com Google.');
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loginWithUsername,
    loginWithGoogle,
    logout,
  };
}
