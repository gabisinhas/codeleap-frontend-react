
import React from 'react';
import { useLoginController } from './controller/useLoginController';
import LoginView from './view/LoginView';
import type { LoginProps } from './types/Login.types';
import SuccessSnackbar from './view/components/SuccessSnackbar';
import ErrorSnackbar from './view/components/ErrorSnackbar';

const Login: React.FC<LoginProps> = ({ onLogin, onGoogleLogin }) => {
  const {
    isRegister,
    handleToggleMode,
    handleLogin,
    handleRegister,
    registerSuccess,
    handleCloseSuccess,
    registerError,
    handleCloseError
  } = useLoginController(onLogin);
  return (
    <>
      <LoginView
        isRegister={isRegister}
        handleToggleMode={handleToggleMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={onGoogleLogin}
      />
      <SuccessSnackbar open={registerSuccess} onClose={handleCloseSuccess} />
      <ErrorSnackbar open={registerError.open} onClose={handleCloseError} message={registerError.message} />
    </>
  );
};

export default Login;
