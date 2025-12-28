
import { render, screen } from '@testing-library/react';
import LoginView from '../components/LoginView/view/LoginView';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('LoginView', () => {
  it('renders login form fields', () => {
    render(
      <GoogleOAuthProvider clientId="dummy-client-id">
        <LoginView
          isRegister={false}
          handleToggleMode={() => {}}
          onLogin={() => {}}
          onRegister={() => {}}
          onGoogleLogin={() => {}}
        />
      </GoogleOAuthProvider>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });
});
