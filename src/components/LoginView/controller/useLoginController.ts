
import { useState } from 'react';
import { loginUser, registerUser } from '../../../services/api';

export function useLoginController(
  onLogin: (login: string, password?: string) => void,
  onGoogleLogin?: (googleToken: string, googleUserName?: string) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleLogin = async (googleToken: string, googleUserName?: string) => {
    if (onGoogleLogin) {
      setIsLoading(true);
      try {
        await onGoogleLogin(googleToken, googleUserName);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleToggleMode = () => {
    setIsRegister((prev) => !prev);
  };
  const handleLogin = async (data: { login: string; password: string }) => {
    setIsLoading(true);
    try {
      const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.login);
      const payload = isEmail
        ? { email: data.login, password: data.password }
        : { username: data.login, password: data.password };
      
      const response = await loginUser(payload);
     
      if (response?.data?.access && response?.data?.refresh && response?.data?.user) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin(data.login, data.password);
      } else {
        console.error('Invalid response format:', response?.data);
        alert('Unexpected response format from backend.');
      }
    } catch (error: any) {
      console.error('Login error details:', error);
      
      let errorMessage = 'Login error. Please check your credentials.';
      
      if (error?.response) {
        const status = error.response.status;
        const responseData = error.response.data;
        
        if (status === 400) {
          if (responseData?.non_field_errors) {
            errorMessage = responseData.non_field_errors[0] || 'Invalid credentials.';
          } else if (responseData?.detail) {
            errorMessage = responseData.detail;
          } else if (responseData?.message) {
            errorMessage = responseData.message;
          } else {
            errorMessage = 'Invalid login data. Please check your username/email and password.';
          }
        } else if (status === 401) {
          errorMessage = 'Invalid credentials. Please check your username/email and password.';
        } else if (status === 403) {
          errorMessage = 'Access forbidden. Your account may be inactive.';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Error ${status}: ${responseData?.detail || responseData?.message || 'Unknown error'}`;
        }
      } else if (error?.message) {
        if (error.message.includes('Network Error') || error.message.includes('ERR_NETWORK')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        } else {
          errorMessage = `Connection error: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      
      // Após registro bem-sucedido, fazer login automaticamente para obter tokens
      try {
        const loginResponse = await loginUser({
          username: data.username,
          password: data.password
        });
        
        if (loginResponse?.data?.access && loginResponse?.data?.refresh && loginResponse?.data?.user) {
          localStorage.setItem('access_token', loginResponse.data.access);
          localStorage.setItem('refresh_token', loginResponse.data.refresh);
          localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
          
          // Fazer login na aplicação com o usuário recém-criado
          onLogin(data.username, data.password);
        } else {
          // Se o login automático falhar, apenas mostrar sucesso do registro
          setRegisterSuccess(true);
          setIsRegister(false);
        }
      } catch (loginError) {
        console.warn('Auto-login after registration failed:', loginError);
        // Mostrar sucesso do registro mesmo se o login automático falhar
        setRegisterSuccess(true);
        setIsRegister(false);
      }
      
    } catch (error: any) {
      let message = 'Registration error. Please check the data and try again.';
      if (error?.response) {
        message = `Error: ${error.response.status} - ${error.response.data?.message || JSON.stringify(error.response.data)}`;
      } else if (error?.message) {
        message = error.message;
      }
      setRegisterError({ open: true, message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => setRegisterSuccess(false);
  const handleCloseError = () => setRegisterError({ open: false, message: '' });

  return {
    isRegister,
    handleToggleMode,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    registerSuccess,
    handleCloseSuccess,
    registerError,
    handleCloseError,
    isLoading,
  };
}
