
import { useState } from 'react';
import { createPost } from '../../../services/api';


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
      await createPost(postData);
      if (onCreate) {
        onCreate(postData);
      }
      setTitle('');
      setContent('');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Error creating post.';
      setError(msg);
      if (onCreate) {
        onCreate(null, msg);
      }
      console.error(err);
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
