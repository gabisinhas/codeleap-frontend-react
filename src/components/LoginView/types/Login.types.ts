export interface LoginProps {
  onLogin: (username: string) => void;
  onGoogleLogin: (googleToken: string, googleUserName?: string) => void;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
