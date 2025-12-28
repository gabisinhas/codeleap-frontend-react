import { useState } from 'react';
import type { PostCardProps } from '../types/PostCard.types';
import { updatePost, deletePost } from '../../../services/api';
import { handleError, withRetry } from '../../../utils/errorHandler';

export function usePostCardController(props: PostCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const normalizeUsername = (username: string | undefined | null): string => {
    if (!username) return '';
    return username.toString().trim();
  };
  
  const postUsername = normalizeUsername(props.username);
  const currentUsername = normalizeUsername(props.currentUser);
  
  const isOwner = postUsername === currentUsername || 
                  postUsername.toLowerCase() === currentUsername.toLowerCase();

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDialog(false);
    
    try {
      await withRetry(
        () => deletePost(props.id),
        2,
        1000,
        'Delete Post'
      );
      if (props.onDelete) {
        await props.onDelete();
      }
      if (props.onDeleteSuccess) {
        props.onDeleteSuccess("Your post was deleted successfully!");
      }
    } catch (error) {
      const apiError = handleError(error, 'Post Deletion', { showAlert: false });
      if (props.onDeleteError) {
        props.onDeleteError(apiError.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleEdit = async (data: { title: string; content: string }) => {
    try {
      await withRetry(
        () => updatePost(props.id, data),
        3,
        1000,
        'Update Post'
      );
      if (props.onEdit) {
        await props.onEdit();
      }
      if (props.onEditSuccess) {
        props.onEditSuccess("Your update was completed successfully!");
      }
    } catch (error) {
      const apiError = handleError(error, 'Post Update', { showAlert: false });
      if (props.onEditError) {
        props.onEditError(apiError.message);
      }
    }
  };

  return {
    isOwner,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirmDialog,
    handleEdit,
  };
}
