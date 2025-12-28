import React, { useState } from 'react';
import type { PostFormProps } from './types/PostForm.types';
import { usePostFormController } from './controller/usePostFormController';
import PostFormView from './view/PostFormView';
import SuccessSnackbar from '../common/SuccessSnackbar';
import ErrorSnackbar from '../common/ErrorSnackbar';

const PostForm: React.FC<PostFormProps> = ({ currentUser, onCreate }) => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const controller = usePostFormController(currentUser, (post, error) => {
    if (error) {
      setErrorMsg(error);
      setErrorOpen(true);
    } else {
      setSuccessOpen(true);
      if (onCreate) onCreate(post);
    }
  });
  return (
    <>
      <PostFormView {...controller} currentUser={currentUser} onCreate={onCreate} />
      <SuccessSnackbar open={successOpen} onClose={() => setSuccessOpen(false)} message="Your Post Has been Submitted!" />
      <ErrorSnackbar open={errorOpen} onClose={() => setErrorOpen(false)} message={errorMsg} />
    </>
  );
};

export default PostForm;
