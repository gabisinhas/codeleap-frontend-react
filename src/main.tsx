import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';

import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  if (import.meta.env.DEV) {
    console.error('VITE_GOOGLE_CLIENT_ID environment variable is not set');
  }
  throw new Error('Google Client ID is required for OAuth functionality');
}

if (import.meta.env.DEV) {
  console.log('Google Client ID loaded:', googleClientId ? 'Yes' : 'No');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
