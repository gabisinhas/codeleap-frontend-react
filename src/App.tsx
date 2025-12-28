import Login from './components/LoginView/Login';
import { useAuthController } from './hooks/useAuthController';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './components/MainPage/MainPage';
import UserHeader from './components/Header/UserHeader';

// Import accessibility testing in development
if (import.meta.env.DEV) {
  import('./__tests__/a11yTesting');
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user, loginWithUsername, loginWithGoogle, logout } = useAuthController();

  if (!user) {
    return <Login 
      onLogin={loginWithUsername}
      onGoogleLogin={loginWithGoogle}
    />;
  }

  const getDisplayName = () => {
    if (!user) return 'User';

    // Try to get stored user data first
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Priority for display: stored username -> stored email -> Google name -> fallback
        // Use username first for consistency with post ownership comparison
        if (parsedUser.username) {
          return parsedUser.username;
        }
        if (parsedUser.email) {
          return parsedUser.email;
        }
        if (parsedUser.name) {
          return parsedUser.name;
        }
      }
    } catch {
      // If localStorage parsing fails, continue with user object
    }

    // Fallback to user object data
    // Priority: username -> email -> Google name -> default
    return user.username || user.email || user.name || 'User';
  };

  const getHeaderDisplayName = () => {
    if (!user) return 'User';

    // For header, prioritize the friendly name (Google name) for better UX
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Priority for header display: Google name -> stored username -> stored email -> fallback
        if (parsedUser.name) {
          return parsedUser.name;
        }
        if (parsedUser.username) {
          return parsedUser.username;
        }
        if (parsedUser.email) {
          return parsedUser.email;
        }
      }
    } catch {
      // If localStorage parsing fails, continue with user object
    }

    // Fallback to user object data
    // Priority: Google name -> username -> email -> default
    return user.name || user.username || user.email || 'User';
  };

  const displayName = getDisplayName();
  const headerDisplayName = getHeaderDisplayName();

  return (
    <QueryClientProvider client={queryClient}>
      <UserHeader username={headerDisplayName} onLogout={logout} />
      <MainPage
        username={displayName}
        posts={[]}
        onCreate={() => {
        }}
        onDelete={() => {
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
