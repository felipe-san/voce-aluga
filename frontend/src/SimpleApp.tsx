import React from 'react';
import { Box, Typography } from '@mui/material';

function SimpleApp() {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        🚗 Você Aluga
      </Typography>
      <Typography variant="h4" color="text.secondary">
        Sistema de Aluguel de Veículos
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Frontend funcionando corretamente! ✅
      </Typography>
    </Box>
  );
}

export default SimpleApp;
