import { useState } from 'react';

export type AuthUser = {
  username?: string;
  googleToken?: string;
};

export function useAuthController() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginWithUsername = (username: string) => {
    setUser({ username });
  };

  const loginWithGoogle = (googleToken: string) => {
    setUser({ googleToken });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loginWithUsername,
    loginWithGoogle,
    logout,
  };
}
