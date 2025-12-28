export interface PostCardProps {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  currentUser: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onEditSuccess?: (message: string) => void;
  onEditError?: (message: string) => void;
  onDeleteSuccess?: (message: string) => void;
  onDeleteError?: (message: string) => void;
}
