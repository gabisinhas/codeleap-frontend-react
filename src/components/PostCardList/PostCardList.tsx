import React, { useState } from 'react';
import GridLegacy from '@mui/material/GridLegacy';

import PostCard from '../PostCardEdit/PostCard';
import type { Post } from '../PostCardCreation/types/PostForm.types';


interface PostCardListProps {
  posts: Post[];
  currentUser: string;
  onDelete: (id: number) => void;
  onEdit?: () => void;
  onDeleteSuccess?: (message: string) => void;
  onDeleteError?: (message: string) => void;
}



import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updatePost } from '../../services/api';
import SuccessSnackbar from '../common/SuccessSnackbar';
import ErrorSnackbar from '../common/ErrorSnackbar';

const PostCardList: React.FC<PostCardListProps> = ({ posts, currentUser, onDelete, onEdit, onDeleteSuccess, onDeleteError }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEditClick = (post: Post) => {
    setEditPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editPost) return;
    setSaving(true);
    try {
      await updatePost(editPost.id, { title: editTitle, content: editContent });
      setEditOpen(false);
      setEditPost(null);
      setSuccessOpen(true);
      if (onEdit) onEdit();
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error
        ? (error as { response: { data: { detail: string } } })?.response?.data?.detail || 'Failed to update post.'
        : 'Failed to update post.';
      setErrorMsg(errorMessage);
      setErrorOpen(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <GridLegacy container spacing={2}>
        {posts.map((post) => {
          const displayDate = new Date(post.createdAt).toLocaleString();
          
          
          return (
              <GridLegacy item xs={12} key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  username={post.username}
                  createdAt={displayDate}
                  currentUser={currentUser}
                  onDelete={() => onDelete(post.id)}
                  onEdit={() => handleEditClick(post)}
                  onDeleteSuccess={onDeleteSuccess}
                  onDeleteError={onDeleteError}
                />
              </GridLegacy>
          );
        })}
      </GridLegacy>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Post</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            fullWidth
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            disabled={saving}
          />
          <TextField
            margin="dense"
            label="Conteúdo"
            fullWidth
            multiline
            minRows={3}
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            disabled={saving}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} disabled={saving}>Cancell</Button>
          <Button onClick={handleEditSave} disabled={saving || !editTitle.trim() || !editContent.trim()} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
      <SuccessSnackbar open={successOpen} onClose={() => setSuccessOpen(false)} message="Your update was completed successfully!" />
      <ErrorSnackbar open={errorOpen} onClose={() => setErrorOpen(false)} message={errorMsg} />
    </>
  );
};

export default PostCardList;
