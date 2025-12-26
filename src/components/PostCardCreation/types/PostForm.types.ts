export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

export interface PostFormProps {
  currentUser: string;
  onCreate: (post: Omit<Post, 'id' | 'createdAt'>) => void;
}
