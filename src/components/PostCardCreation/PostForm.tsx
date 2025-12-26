import React from 'react';
import type { PostFormProps } from './types/PostForm.types';
import { usePostFormController } from './controller/usePostFormController';
import PostFormView from './view/PostFormView';

const PostForm: React.FC<PostFormProps> = ({ currentUser, onCreate }) => {
  const controller = usePostFormController(currentUser, onCreate);
  return <PostFormView {...controller} currentUser={currentUser} onCreate={onCreate} />;
};

export default PostForm;
