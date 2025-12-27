
import { useState } from 'react';
import { loginUser, registerUser } from '../../../services/api';

export function useLoginController(
  onLogin: (login: string, password?: string) => void,
  onGoogleLogin?: (googleToken: string, googleUserName?: string) => void
) {
  const handleGoogleLogin = async (googleToken: string, googleUserName?: string) => {
    if (onGoogleLogin) {
      await onGoogleLogin(googleToken, googleUserName);
    }
  };
  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleToggleMode = () => {
    setIsRegister((prev) => !prev);
  };
  const handleLogin = async (data: { login: string; password: string }) => {
    try {
      const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.login);
      const payload = isEmail
        ? { email: data.login, password: data.password }
        : { username: data.login, password: data.password };
      const response = await loginUser(payload);
      console.log('Resposta do login:', response.data);
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
      } else if (response?.data?.access) {
        localStorage.setItem('token', response.data.access);
      } else if (response?.data?.key) {
        localStorage.setItem('token', response.data.key);
      }
      onLogin(data.login, data.password);
    } catch (error: any) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleRegister = async (data: { username: string; email: string; password: string }) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password1: data.password,
        password2: data.password,
      });
      setRegisterSuccess(true);
      setIsRegister(false);
    } catch (error: any) {
      let message = 'Erro ao cadastrar. Verifique os dados e tente novamente.';
      if (error?.response) {
        message = `Erro: ${error.response.status} - ${error.response.data?.message || JSON.stringify(error.response.data)}`;
      } else if (error?.message) {
        message = error.message;
      }
      setRegisterError({ open: true, message });
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
  };
}
