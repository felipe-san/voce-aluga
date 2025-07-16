import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function TestApp() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" color="primary" gutterBottom>
        🚗 Você Aluga - Sistema Online
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Frontend estabelecido com sucesso!
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 2 }}>
        Sistema Funcionando ✅
      </Button>
    </Box>
  );
}

export default TestApp;
