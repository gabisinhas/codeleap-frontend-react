import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import PostCard from '../PostCardEdit/PostCard';
import type { Post } from '../PostCardCreation/types/PostForm.types';


interface PostCardListProps {
  posts: Post[];
  currentUser: string;
  onDelete: (id: number) => void;
  onEdit?: () => void;
}



import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updatePost } from '../../services/api';
import SuccessSnackbar from '../../utils/SuccessSnackbar';
import ErrorSnackbar from '../../utils/ErrorSnackbar';

const PostCardList: React.FC<PostCardListProps> = ({ posts, currentUser, onDelete, onEdit }) => {
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
    } catch (e: any) {
      setErrorMsg(e?.response?.data?.detail || 'Failed to edit post.');
      setErrorOpen(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {posts.map(post => {
          const displayDate = new Date(post.createdAt).toLocaleString();
          return (
            <Box key={post.id} width="100%">
              <Fade in timeout={600}>
                <div>
                  <PostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    username={post.username}
                    createdAt={displayDate}
                    currentUser={currentUser}
                    onDelete={() => onDelete(post.id)}
                    onEdit={() => handleEditClick(post)}
                  />
                </div>
              </Fade>
            </Box>
          );
        })}
      </Grid>
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
          <Button onClick={() => setEditOpen(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleEditSave} disabled={saving || !editTitle.trim() || !editContent.trim()} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
      <SuccessSnackbar open={successOpen} onClose={() => setSuccessOpen(false)} message="Post updated successfully!" />
      <ErrorSnackbar open={errorOpen} onClose={() => setErrorOpen(false)} message={errorMsg} />
    </>
  );
};

export default PostCardList;
