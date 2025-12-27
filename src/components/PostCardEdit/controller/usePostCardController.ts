

import type { PostCardProps } from '../types/PostCard.types';
import { updatePost, deletePost } from '../../../services/api';

export function usePostCardController(props: PostCardProps) {
  const isOwner = props.username === props.currentUser;

  const handleDelete = async () => {
    try {
      await deletePost(props.id);
      if (props.onDelete) {
        await props.onDelete();
      }
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  const handleEdit = async (data: { title: string; content: string }) => {
    try {
      await updatePost(props.id, data);
      if (props.onEdit) {
        await props.onEdit();
      }
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
