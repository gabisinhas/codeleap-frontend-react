import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import type { PostFormProps } from '../types/PostForm.types';

interface PostFormViewProps extends PostFormProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const PostFormView: React.FC<PostFormViewProps> = ({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
}) => (
  <Paper
    sx={{
      p: { xs: 0.5, sm: 1 },
      mb: 1,
      maxWidth: 600,
      width: '100%',
      mx: 'auto',
      my: { xs: 0.5, md: 1 },
      boxShadow: 1,
      borderRadius: 3,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    elevation={2}
    role="form"
    aria-label="Create a new post"
  >
    <Typography
      variant="h6"
      fontWeight={700}
      mb={1.5}
      textAlign="center"
      color="#333"
      sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
    >
      What's on your mind?
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={1.5}
      alignItems="stretch"
      width="100%"
      maxWidth={520}
    >
      <Typography fontWeight={700} mb={0.5} fontSize={16} color="#333">
        Title
      </Typography>
      <TextField
        placeholder="Hello world"
        value={title}
        onChange={e => setTitle(e.target.value)}
        size="small"
        fullWidth
        inputProps={{ maxLength: 100, 'aria-label': 'Post title' }}
        helperText={`${title.length}/100 characters`}
        FormHelperTextProps={{ sx: { textAlign: 'right', color: '#888' } }}
        required
        sx={{ mb: 1 }}
      />
      <Typography fontWeight={700} mb={0.5} fontSize={16} color="#333">
        Content
      </Typography>
      <TextField
        placeholder="Content here"
        value={content}
        onChange={e => setContent(e.target.value)}
        size="small"
        multiline
        minRows={1}
        fullWidth
        inputProps={{ maxLength: 500, 'aria-label': 'Post content' }}
        helperText={`${content.length}/500 characters`}
        FormHelperTextProps={{ sx: { textAlign: 'right', color: '#888' } }}
        required
      />
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          type="submit"
          variant="contained"
          disabled={!title.trim() || !content.trim()}
          sx={{
            fontWeight: 700,
            px: 4,
            py: 1,
            fontSize: '0.95rem',
            borderRadius: 2,
            mt: 1,
            boxShadow: 1,
            transition: 'box-shadow 0.2s',
            ':hover': {
              boxShadow: 2,
            },
          }}
          aria-label="Create post"
        >
          Create
        </Button>
      </Box>
    </Box>
  </Paper>
);

export default PostFormView;
