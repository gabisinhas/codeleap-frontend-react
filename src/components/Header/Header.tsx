
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  username: string;
}


const Header: React.FC<HeaderProps> = () => (
  <AppBar position="static" sx={{ background: '#7695EC', borderRadius: '0 0 4px 4px', mb: 1.5, boxShadow: 1 }} elevation={0}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: { xs: 36, sm: 40 }, py: 0.25 }}>
      <Typography variant="body1" sx={{ fontWeight: 700, letterSpacing: 0.25, fontSize: { xs: '0.875rem', sm: '0.95rem' } }}>
        Welcome to CodeLeap Network!
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
