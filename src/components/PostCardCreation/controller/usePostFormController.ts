
import { useState } from 'react';
import type { PostFormProps } from '../types/PostForm.types';
import { createPost } from '../../../services/api';

export const usePostFormController = (currentUser: string, onCreate: PostFormProps['onCreate']) => {
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
      onCreate(postData);
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Erro ao criar post.');
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
