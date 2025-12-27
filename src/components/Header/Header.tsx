
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  username: string;
}


const Header: React.FC<HeaderProps> = () => (
  <AppBar position="static" sx={{ background: '#7695EC', borderRadius: '0 0 8px 8px', mb: 4, boxShadow: 3 }} elevation={0}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 64 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
        Welcome to CodeLeap Network!
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
