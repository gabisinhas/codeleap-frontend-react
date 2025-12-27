import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface UserHeaderProps {
  username: string;
  onLogout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ username, onLogout }) => (
  <Box
    sx={{
      width: '100%',
      minWidth: 320,
      background: '#1a357a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pl: 0,
      pr: 0,
      py: 1.5,
      borderRadius: '8px 8px 0 0',
      boxShadow: 1,
      minHeight: 48,
      overflow: 'visible',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#fff', paddingLeft: 2 }}>
        Welcome, {username}
      </Typography>
    </Box>
    <Button
      variant="outlined"
      color="inherit"
      size="small"
      onClick={onLogout}
      sx={{
        color: '#fff',
        borderColor: '#fff',
        minWidth: 64,
        px: 2,
        fontWeight: 600,
        fontSize: '1rem',
        mr: 4,
        '&:hover': {
          borderColor: '#b3cfff',
          background: 'rgba(255,255,255,0.08)'
        }
      }}
    >
      Logout
    </Button>
  </Box>
);

export default UserHeader;
