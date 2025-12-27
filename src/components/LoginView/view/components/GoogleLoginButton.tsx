import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onGoogleLogin: (googleToken: string, googleUserName?: string) => void;
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

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleLogin }) => (
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
  />
);

export default GoogleLoginButton;
