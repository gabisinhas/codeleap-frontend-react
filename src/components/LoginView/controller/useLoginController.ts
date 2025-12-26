
import { useState } from 'react';
import { loginUser, registerUser } from '../../../services/api';

export function useLoginController(onLogin: (login: string) => void) {
  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleToggleMode = () => {
    setIsRegister((prev) => !prev);
  };

  // login: string pode ser email ou username, ajuste conforme seu form
  const handleLogin = async (login: string) => {
    try {
      // Aqui assumimos que login é o email, ajuste se necessário
      const response = await loginUser({ email: login, password: login }); // Troque para senha correta
      // Salve o token, se necessário: localStorage.setItem('token', response.data.key)
      onLogin(login);
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
    registerSuccess,
    handleCloseSuccess,
    registerError,
    handleCloseError,
  };
}
