
import { useState } from 'react';
import { createPost } from '../../../services/api';
import { handleError, withRetry } from '../../../utils/errorHandler';


export const usePostFormController = (
  currentUser: string,
  onCreate: (post: any, error?: string) => void
) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const postData = { title: title.trim(), content: content.trim(), username: currentUser };
      await withRetry(
        () => createPost(postData),
        3,
        1000,
        'Post Creation'
      );
      if (onCreate) {
        onCreate(postData);
      }
      setTitle('');
      setContent('');
    } catch (err: any) {
      const apiError = handleError(err, 'Post Creation', { showAlert: false });
      setError(apiError.message);
      if (onCreate) {
        onCreate(null, apiError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
    loading,
    error,
  };
};
