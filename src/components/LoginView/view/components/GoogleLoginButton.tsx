import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, CircularProgress } from '@mui/material';

interface GoogleLoginButtonProps {
  onGoogleLogin: (googleToken: string, googleUserName?: string) => void;
  isLoading?: boolean;
}


function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleLogin, isLoading }) => (
  <Box sx={{ position: 'relative', display: 'inline-block' }}>
    <GoogleLogin
      onSuccess={credentialResponse => {
        if (credentialResponse.credential) {
          const payload = decodeJwt(credentialResponse.credential);
          const userName = payload?.name || payload?.given_name || undefined;
          onGoogleLogin(credentialResponse.credential, userName);
        }
      }}
      onError={() => {
        console.log('Google login failed');
      }}
      disabled={isLoading}
    />
    {isLoading && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 1,
        }}
      >
        <CircularProgress size={24} sx={{ color: '#7695EC' }} />
      </Box>
    )}
  </Box>
);

export default GoogleLoginButton;
