import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Veiculo } from '../types';

const Veiculos: React.FC = () => {
  // Mock data - substituir pela chamada da API
  const [veiculos] = useState<Veiculo[]>([
    {
      id: 1,
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2023,
      placa: 'ABC-1234',
      cor: 'Prata',
      disponivel: true,
      valorDiaria: 120.00,
      categoria: 'Sedan'
    },
    {
      id: 2,
      modelo: 'HB20',
      marca: 'Hyundai',
      ano: 2022,
      placa: 'DEF-5678',
      cor: 'Branco',
      disponivel: false,
      valorDiaria: 85.00,
      categoria: 'Hatch'
    },
    {
      id: 3,
      modelo: 'Compass',
      marca: 'Jeep',
      ano: 2023,
      placa: 'GHI-9012',
      cor: 'Preto',
      disponivel: true,
      valorDiaria: 180.00,
      categoria: 'SUV'
    }
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Veículos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Veículo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {veiculos.map((veiculo) => (
          <Grid item xs={12} sm={6} md={4} key={veiculo.id}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  {veiculo.marca} {veiculo.modelo}
                </Typography>
              </CardMedia>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {veiculo.marca} {veiculo.modelo}
                  </Typography>
                  <Chip
                    label={veiculo.disponivel ? 'Disponível' : 'Indisponível'}
                    color={veiculo.disponivel ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {veiculo.categoria} • {veiculo.ano} • {veiculo.cor}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Placa: {veiculo.placa}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  R$ {veiculo.valorDiaria.toFixed(2)}/dia
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button size="small" variant="outlined">
                    Editar
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    Excluir
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Veiculos;
