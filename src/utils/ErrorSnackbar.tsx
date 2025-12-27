import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ErrorSnackbarProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ open, onClose, message }) => (
  <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <MuiAlert onClose={onClose} severity="error" sx={{ width: '100%' }} elevation={6} variant="filled">
      {message || 'Erro ao criar post.'}
    </MuiAlert>
  </Snackbar>
);

export default ErrorSnackbar;
