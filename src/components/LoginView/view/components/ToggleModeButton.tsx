import React from 'react';
import Button from '@mui/material/Button';

interface ToggleModeButtonProps {
  isRegister: boolean;
  handleToggleMode: () => void;
}

const ToggleModeButton: React.FC<ToggleModeButtonProps> = ({ isRegister, handleToggleMode }) => (
  <Button
    variant="text"
    onClick={handleToggleMode}
    sx={{ alignSelf: 'flex-end', mt: 0, fontWeight: 400, px: 2 }}
  >
    {isRegister ? 'ALREADY HAVE AN ACCOUNT? LOGIN' : "DON'T HAVE AN ACCOUNT? REGISTER"}
  </Button>
);

export default ToggleModeButton;
