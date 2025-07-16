import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard: React.FC = () => {
  // Aqui você pode adicionar lógica para buscar dados da API
  const stats = {
    totalClientes: 150,
    veiculosDisponiveis: 45,
    contratosAtivos: 32,
    receitaMensal: 85000,
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard - Você Aluga
      </Typography>
      
      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total de Clientes
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalClientes}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DirectionsCarIcon color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Veículos Disponíveis
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.veiculosDisponiveis}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionIcon color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Contratos Ativos
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.contratosAtivos}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUpIcon color="info" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Receita Mensal
                  </Typography>
                  <Typography variant="h5" component="div">
                    R$ {stats.receitaMensal.toLocaleString('pt-BR')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Área para gráficos ou informações adicionais */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Visão Geral do Sistema
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Bem-vindo ao sistema de gerenciamento de aluguel de carros "Você Aluga". 
              Use o menu lateral para navegar entre as diferentes seções do sistema.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                • <strong>Clientes:</strong> Gerencie informações dos clientes e histórico de aluguéis
              </Typography>
              <Typography variant="body2">
                • <strong>Contratos:</strong> Visualize e gerencie contratos de aluguel
              </Typography>
              <Typography variant="body2">
                • <strong>Veículos:</strong> Controle a frota de veículos disponíveis
              </Typography>
              <Typography variant="body2">
                • <strong>Estoque:</strong> Gerencie o estoque e localização dos veículos
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
