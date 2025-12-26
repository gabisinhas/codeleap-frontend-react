

import type { PostCardProps } from '../types/PostCard.types';
import { updatePost, deletePost } from '../../../services/api';

export function usePostCardController(props: PostCardProps) {
  const isOwner = props.username === props.currentUser;

  const handleDelete = async () => {
    if (props.onDelete) {
      await props.onDelete();
      return;
    }
    try {
      await deletePost(props.id);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  const handleEdit = async (data: { title: string; content: string }) => {
    if (props.onEdit) {
      await props.onEdit();
      return;
    }
    try {
      await updatePost(props.id, data);
    } catch (error) {
      console.error('Erro ao editar post:', error);
    }
  };

  return {
    isOwner,
    handleDelete,
    handleEdit,
  };
}
