import React from 'react';
import { useAuthController } from './hooks/useAuthController';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

// Import components directly instead of lazy loading to prevent delays
import Login from './components/LoginView/Login';
import MainPage from './components/MainPage/MainPage';
import UserHeader from './components/Header/UserHeader';

// Lazy import accessibility testing in development to avoid blocking main thread
if (import.meta.env.DEV) {
  setTimeout(() => import('./__tests__/a11yTesting'), 1000);
}

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

// Loading component for Suspense fallback
const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Carregando..." }) => (
  <Backdrop
    sx={{
      color: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      background: 'linear-gradient(135deg, #7695EC 0%, #87CEEB 100%)',
    }}
    open={true}
  >
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={3}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{ 
          color: 'white',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }} 
      />
      <Typography 
        variant="h6" 
        component="p" 
        sx={{ 
          fontWeight: 600,
          letterSpacing: 0.5,
          textAlign: 'center'
        }}
      >
        {message}
      </Typography>
    </Box>
  </Backdrop>
);

const App: React.FC = () => {
  const { user, loginWithUsername, loginWithGoogle, logout, isLoading, isInitializing } = useAuthController();

  // Only show loading during actual initialization (very brief)
  if (isInitializing) {
    return <LoadingScreen message="Carregando..." />;
  }

  // If no authenticated user, show login immediately
  if (!user) {
    return (
      <Login 
        onLogin={loginWithUsername}
        onGoogleLogin={loginWithGoogle}
      />
    );
  }

  // Show loading only during login process, not initialization
  if (isLoading) {
    return <LoadingScreen message="Entrando..." />;
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
