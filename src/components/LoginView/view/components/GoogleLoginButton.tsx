import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onGoogleLogin: (googleToken: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleLogin }) => (
  <GoogleLogin
    onSuccess={credentialResponse => {
      if (credentialResponse.credential) {
        onGoogleLogin(credentialResponse.credential);
      }
    }}
    onError={() => {
      console.log('Google login failed');
    }}
  />
);

export default GoogleLoginButton;
