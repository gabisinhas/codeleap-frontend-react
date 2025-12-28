import { useState } from 'react';
import type { PostCardProps } from '../types/PostCard.types';
import { updatePost, deletePost } from '../../../services/api';

export function usePostCardController(props: PostCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const normalizeUsername = (username: string | undefined | null): string => {
    if (!username) return '';
    return username.toString().trim();
  };
  
  const postUsername = normalizeUsername(props.username);
  const currentUsername = normalizeUsername(props.currentUser);
  
  // Debug logging to help identify the issue
  console.log('PostCard Debug:', {
    postUsername,
    currentUsername,
    propsUsername: props.username,
    propsCurrentUser: props.currentUser,
    areEqual: postUsername === currentUsername,
    areEqualIgnoreCase: postUsername.toLowerCase() === currentUsername.toLowerCase()
  });
  
  const isOwner = postUsername === currentUsername || 
                  postUsername.toLowerCase() === currentUsername.toLowerCase();

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDialog(false);
    
    try {
      await deletePost(props.id);
      if (props.onDelete) {
        await props.onDelete();
      }
      if (props.onDeleteSuccess) {
        props.onDeleteSuccess("Your post was deleted successfully!");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      if (props.onDeleteError) {
        const errorMessage = error && typeof error === 'object' && 'response' in error
          ? (error as { response: { data: { detail: string } } })?.response?.data?.detail || 'Failed to delete post.'
          : 'Failed to delete post.';
        props.onDeleteError(errorMessage);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleEdit = async (data: { title: string; content: string }) => {
    try {
      await updatePost(props.id, data);
      if (props.onEdit) {
        await props.onEdit();
      }
      if (props.onEditSuccess) {
        props.onEditSuccess("Your update was completed successfully!");
      }
    } catch (error) {
      console.error('Error editing post:', error);
      if (props.onEditError) {
        const errorMessage = error && typeof error === 'object' && 'response' in error
          ? (error as { response: { data: { detail: string } } })?.response?.data?.detail || 'Failed to update post.'
          : 'Failed to update post.';
        props.onEditError(errorMessage);
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
