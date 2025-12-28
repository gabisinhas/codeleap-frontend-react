
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import GoogleLoginButton from './components/GoogleLoginButton';
import ToggleModeButton from './components/ToggleModeButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginViewProps {
  isRegister: boolean;
  handleToggleMode: () => void;
  onLogin: (data: { login: string; password: string }) => void;
  onRegister: (data: { username: string; email: string; password: string }) => void;
  onGoogleLogin: (googleToken: string, googleUserName?: string) => void;
  isLoading?: boolean;
}

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const LoginView: React.FC<LoginViewProps> = ({ isRegister, handleToggleMode, onLogin, onRegister, onGoogleLogin, isLoading }) => {
  const formik = useFormik({
    initialValues: isRegister
      ? { email: '', username: '', password: '', confirmPassword: '' }
      : { login: '', password: '' },
    enableReinitialize: true,
    validationSchema: isRegister
      ? Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          username: Yup.string().min(2, 'At least 2 characters').required('Required'),
          password: Yup.string()
            .matches(passwordRegex, 'Min 8 chars, letter, number, special')
            .required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Required'),
        })
      : Yup.object({
          login: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        }),
    onSubmit: (values) => {
      if (isRegister) {
        const { confirmPassword, ...registerData } = values as any;
        onRegister(registerData as { username: string; email: string; password: string });
      } else {
        onLogin(values as { login: string; password: string });
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#dedede',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: 1,
          p: { xs: 1.5, sm: 2 },
          minWidth: { xs: 280, sm: 320 },
          maxWidth: 350,
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          {isRegister ? 'Register to CodeLeap network!' : 'Welcome to CodeLeap network!'}
        </Typography>
        {isRegister ? (
          <RegisterForm formik={formik} />
        ) : (
          <LoginForm formik={formik} />
        )}
        <Button
          variant="contained"
          type="submit"
          disabled={!formik.isValid || !formik.dirty || isLoading}
          sx={{ 
            alignSelf: 'flex-end', 
            mt: 1, 
            fontWeight: 700, 
            px: 4,
            position: 'relative'
          }}
        >
          {isLoading && (
            <CircularProgress
              size={20}
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-10px',
                marginTop: '-10px',
                color: 'white'
              }}
            />
          )}
          <span style={{ opacity: isLoading ? 0 : 1 }}>
            {isRegister ? 'REGISTER' : 'ENTER'}
          </span>
        </Button>
        <ToggleModeButton isRegister={isRegister} handleToggleMode={handleToggleMode} />
        <Box sx={{ mt: 2, alignSelf: 'center' }}>
          <GoogleLoginButton onGoogleLogin={onGoogleLogin} isLoading={isLoading} />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginView;
