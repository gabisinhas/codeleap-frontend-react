
import React from 'react';
import { useLoginController } from './controller/useLoginController';
import LoginView from './view/LoginView';
import type { LoginProps } from './types/Login.types';
import SuccessSnackbar from '../common/SuccessSnackbar';
import ErrorSnackbar from '../common/ErrorSnackbar';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';


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
    handleCloseError,
    isLoading
  } = useLoginController(onLogin, onGoogleLogin);
  
  return (
    <>
      <LoginView
        isRegister={isRegister}
        handleToggleMode={handleToggleMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={handleGoogleLogin}
        isLoading={isLoading}
      />
      <SuccessSnackbar open={registerSuccess} onClose={handleCloseSuccess} message="Registered created successfully!" />
      <ErrorSnackbar open={registerError.open} onClose={handleCloseError} message={registerError.message} />
      
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(0, 0, 0, 0.7)',
        }}
        open={isLoading}
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          gap={2}
        >
          <CircularProgress 
            size={50} 
            thickness={4}
            sx={{ 
              color: '#7695EC',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }} 
          />
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              color: 'white'
            }}
          >
            Fazendo login...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default Login;
