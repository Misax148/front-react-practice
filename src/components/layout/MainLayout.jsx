import React from 'react';
import { Container } from '@mui/material';

function MainLayout({ children }) {
  return (
    <Container 
      component="main" 
      sx={{ 
        mt: 4,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </Container>
  );
}

export default MainLayout;