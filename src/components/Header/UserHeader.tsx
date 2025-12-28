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
    component="header"
    role="banner"
    sx={{
      width: '100%',
      minWidth: 320,
      background: '#1a357a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: { xs: 0.75, sm: 1.25 },
      borderRadius: '6px 6px 0 0',
      boxShadow: 0.5,
      minHeight: { xs: 40, sm: 44 },
      overflow: 'visible',
      gap: { xs: 0.75, sm: 1.5 },
    }}
    aria-label="User navigation header"
  >
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        flex: 1,
        minWidth: 0, // Allow text truncation
      }}
    >
      <Typography 
        variant="body2" 
        component="h1"
        sx={{ 
          fontWeight: 500, 
          color: '#fff',
          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.95rem' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        aria-label={`Welcome message for user ${username}`}
      >
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
        minWidth: { xs: 48, sm: 60 },
        px: { xs: 1, sm: 1.5 },
        py: { xs: 0.5, sm: 0.75 },
        fontWeight: 600,
        mr: 2,
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        flexShrink: 0,
        '&:hover': {
          borderColor: '#b3cfff',
          background: 'rgba(255,255,255,0.08)'
        },
        '&:focus': {
          outline: '2px solid white',
          outlineOffset: '1px',
        }
      }}
    >
      Logout
    </Button>
  </Box>
);

export default UserHeader;
