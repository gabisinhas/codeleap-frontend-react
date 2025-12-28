export interface LoginProps {
  onLogin: (login: string, password?: string) => void;
  onGoogleLogin: (googleToken: string, googleUserName?: string) => void;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
