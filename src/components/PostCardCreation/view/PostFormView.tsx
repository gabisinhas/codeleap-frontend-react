import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import type { PostFormProps } from '../types/PostForm.types';
import { a11y } from '../../../utils/accessibility';

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
      p: { xs: 0.75, sm: 1.25, md: 1.5 },
      mb: { xs: 1, sm: 1.5 },
      maxWidth: { xs: '100%', sm: 420, md: 480 },
      width: '100%',
      mx: 'auto',
      boxShadow: { xs: 0.5, sm: 1 },
      borderRadius: { xs: 1, sm: 1.5 },
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    elevation={2}
    component="section"
    role="form"
    aria-labelledby="create-post-title"
    aria-describedby="create-post-description"
  >
    <Typography
      id="create-post-title"
      variant="body1"
      component="h2"
      fontWeight={700}
      mb={{ xs: 0.75, sm: 1 }}
      textAlign="center"
      color="#333"
      sx={{ 
        fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
        lineHeight: 1.2,
      }}
    >
      What's on your mind?
    </Typography>
    <Typography
      id="create-post-description"
      sx={{ ...a11y.srOnly }}
    >
      Fill out the form below to create a new post with a title and content
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={0.75}
      alignItems="stretch"
      width="100%"
      maxWidth={380}
    >
      <Typography 
        component="label"
        htmlFor="post-title-input"
        fontWeight={700} 
        mb={0.5} 
        fontSize={{ xs: 12, sm: 13 }} 
        color="#333"
        sx={{ alignSelf: 'flex-start' }}
      >
        Title *
      </Typography>
      <TextField
        id="post-title-input"
        placeholder="Hello world"
        value={title}
        onChange={e => setTitle(e.target.value)}
        size="small"
        fullWidth
        inputProps={{ 
          maxLength: 100, 
          'aria-describedby': 'title-help',
          'aria-required': 'true'
        }}
        helperText={`${title.length}/100 characters`}
        FormHelperTextProps={{ 
          id: 'title-help',
          sx: { textAlign: 'right', color: '#888', fontSize: { xs: '0.75rem', sm: '0.875rem' } } 
        }}
        required
        error={title.trim() === '' && title.length > 0}
        sx={{ mb: { xs: 1, sm: 1.25 } }}
      />
      <Typography fontWeight={700} mb={0.25} fontSize={13} color="#333">
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
