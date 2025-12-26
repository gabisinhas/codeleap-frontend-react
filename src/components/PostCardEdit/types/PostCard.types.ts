export interface PostCardProps {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  currentUser: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
