import Login from './components/LoginView/Login';
import { useAuthController } from './hooks/useAuthController';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './components/MainPage/MainPage';
import UserHeader from './components/Header/UserHeader';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user, loginWithUsername, loginWithGoogle, logout } = useAuthController();

  if (!user) {
    return <Login 
      onLogin={loginWithUsername}
      onGoogleLogin={loginWithGoogle}
    />;
  }

  const displayName = user.username || 'Google User';

  return (
    <QueryClientProvider client={queryClient}>
      <UserHeader username={displayName} onLogout={logout} />
      <MainPage
        username={displayName}
        posts={[]}
        onCreate={() => {}}
        onDelete={() => {}}
      />
    </QueryClientProvider>
  );
}

export default App;
