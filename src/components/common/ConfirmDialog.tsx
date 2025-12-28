import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: 'warning' | 'error' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancell',
  onConfirm,
  onCancel,
  severity = 'warning'
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'error':
        return '#d32f2f';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#ff9800';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, pt: 3 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <WarningIcon 
            sx={{ 
              color: getSeverityColor(),
              fontSize: 28
            }} 
          />
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ pb: 2 }}>
        <DialogContentText
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 500,
            borderColor: '#ddd',
            color: '#666',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            backgroundColor: '#ec0909ff',
            '&:hover': {
              backgroundColor: '#FF5151'
            }
          }}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;