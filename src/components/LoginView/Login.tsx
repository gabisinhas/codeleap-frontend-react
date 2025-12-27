
import React from 'react';
import { useLoginController } from './controller/useLoginController';
import LoginView from './view/LoginView';
import type { LoginProps } from './types/Login.types';
import SuccessSnackbar from '../../utils/SuccessSnackbar';
import ErrorSnackbar from '../../utils/ErrorSnackbar';


const Login: React.FC<LoginProps> = ({ onLogin, onGoogleLogin }) => {
  const {
    isRegister,
    handleToggleMode,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    registerSuccess,
    handleCloseSuccess,
    registerError,
    handleCloseError
  } = useLoginController(onLogin, onGoogleLogin);
  return (
    <>
      <LoginView
        isRegister={isRegister}
        handleToggleMode={handleToggleMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={handleGoogleLogin}
      />
      <SuccessSnackbar open={registerSuccess} onClose={handleCloseSuccess} message="Registered created successfully!" />
      <ErrorSnackbar open={registerError.open} onClose={handleCloseError} message={registerError.message} />
    </>
  );
};

export default Login;
