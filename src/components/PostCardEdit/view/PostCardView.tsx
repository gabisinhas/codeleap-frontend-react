import React from 'react';
import type { PostCardProps } from '../types/PostCard.types';
import { usePostCardController } from '../controller/usePostCardController';
import ConfirmDialog from '../../common/ConfirmDialog';
import { a11y } from '../../../utils/accessibility';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const PostCardView: React.FC<PostCardProps> = (props) => {
  const { 
    isOwner, 
    handleDeleteClick, 
    handleConfirmDelete, 
    handleCancelDelete, 
    showConfirmDialog 
  } = usePostCardController(props);

  return (
    <>
      <Paper
        className="postcard-animated"
        component="article"
        aria-labelledby={`post-title-${props.id}`}
        sx={{
          mb: 1.5,
          borderRadius: 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 1,
            transform: 'translateY(-1px)',
          },
          '&:focus-within': {
            outline: '2px solid #1976d2',
            outlineOffset: '1px',
          },
        }}
      >
        <Box
          sx={{
            background: '#7695EC',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: { xs: 0.75, sm: 1 },
            minHeight: { xs: 32, sm: 36 },
          }}
        >
          <Typography
            id={`post-title-${props.id}`}
            variant="body2"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              flex: 1,
              mr: 1.5,
              wordBreak: 'break-word',
            }}
          >
            {props.title}
          </Typography>
          {isOwner && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexShrink: 0,
              }}
              role="group"
              aria-label="Post actions"
            >
              <IconButton
                size={"small"}
                onClick={handleDeleteClick}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:focus': {
                    outline: '2px solid white',
                    outlineOffset: '2px',
                  },
                }}
                aria-label={`Delete post: ${props.title}`}
                aria-describedby="delete-help"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size={"small"}
                onClick={props.onEdit}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:focus': {
                    outline: '2px solid white',
                    outlineOffset: '2px',
                  },
                }}
                aria-label={`Edit post: ${props.title}`}
                aria-describedby="edit-help"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <Typography
                id="delete-help"
                sx={{ ...a11y.srOnly }}
              >
                Press Enter or Space to delete this post
              </Typography>
              <Typography
                id="edit-help"
                sx={{ ...a11y.srOnly }}
              >
                Press Enter or Space to edit this post
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            p: { xs: 0.75, sm: 1 },
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 0.25, sm: 0 },
              mb: 0.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#777',
                fontWeight: 700,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
              aria-label={`Author: ${props.username}`}
            >
              @{props.username}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#999',
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
              }}
              aria-label={`Posted on ${props.createdAt}`}
            >
              {props.createdAt}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#333',
              lineHeight: 1.4,
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              wordBreak: 'break-word',
            }}
            aria-label="Post content"
          >
            {props.content}
          </Typography>
        </Box>
      </Paper>

      <ConfirmDialog
        open={showConfirmDialog}
        title="localhost:5173 diz"
        message="Are you sure you want to delete this item?"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        severity="warning"
      />
    </>
  );
};

export default PostCardView;
