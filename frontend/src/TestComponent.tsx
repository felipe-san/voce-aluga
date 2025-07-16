import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';

const TestComponent: React.FC = () => {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <DirectionsCar sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            VOCÊ ALUGA
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sistema de Aluguel de Carros
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Frontend funcionando corretamente! ✅
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Se você está vendo esta mensagem, o React e Material-UI estão funcionando.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestComponent;
