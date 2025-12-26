import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, onClose, message }) => (
  <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <MuiAlert onClose={onClose} severity="success" sx={{ width: '100%' }} elevation={6} variant="filled">
      {message || 'Cadastro realizado com sucesso!'}
    </MuiAlert>
  </Snackbar>
);

export default SuccessSnackbar;
