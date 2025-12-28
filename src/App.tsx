import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useAuthController } from './hooks/useAuthController';
import Login from './components/LoginView/Login';
import UserHeader from './components/Header/UserHeader';
import MainPage from './components/MainPage/MainPage';
if (import.meta.env.DEV) {
  setTimeout(() => import('./__tests__/a11yTesting'), 1000);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

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

  if (isInitializing) {
    return <LoadingScreen message="Carregando..." />;
  }

  if (!user) {
    return (
      <Login 
        onLogin={loginWithUsername}
        onGoogleLogin={loginWithGoogle}
      />
    );
  }

  if (isLoading) {
    return <LoadingScreen message="Entrando..." />;
  }

  const getDisplayName = () => {
    if (!user) return 'User';

    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
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
    }
    return user.username || user.email || user.name || 'User';
  };

  const getHeaderDisplayName = () => {
    if (!user) return 'User';

    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
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
    }
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
