import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  DirectionsCar,
  People,
  Description,
  AttachMoney,
  TrendingUp,
  Assessment,
} from '@mui/icons-material';

interface DashboardStats {
  totalClientes: number;
  totalVeiculos: number;
  totalContratos: number;
  receitaTotal: number;
  veiculosDisponiveis: number;
  contratosAtivos: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClientes: 0,
    totalVeiculos: 0,
    totalContratos: 0,
    receitaTotal: 0,
    veiculosDisponiveis: 0,
    contratosAtivos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarDadosDashboard();
  }, []);

  const carregarDadosDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se existe endpoint dashboard
      const dashboardResponse = await fetch('http://localhost:8081/api/dashboard');
      
      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        setStats(dashboardData);
      } else {
        // Se não existe endpoint dashboard, buscar dados separadamente
        await carregarDadosSeparados();
      }
    } catch (error: any) {
      console.error('Erro ao carregar dashboard:', error);
      await carregarDadosSeparados();
    } finally {
      setLoading(false);
    }
  };

  const carregarDadosSeparados = async () => {
    try {
      // Buscar clientes
      const clientesResponse = await fetch('http://localhost:8081/clientes');
      const clientes = clientesResponse.ok ? await clientesResponse.json() : [];

      // Buscar veículos
      const veiculosResponse = await fetch('http://localhost:8081/api/veiculos');
      const veiculos = veiculosResponse.ok ? await veiculosResponse.json() : [];

      // Buscar contratos
      const contratosResponse = await fetch('http://localhost:8081/contratos');
      const contratos = contratosResponse.ok ? await contratosResponse.json() : [];

      // Calcular estatísticas
      const veiculosDisponiveis = veiculos.filter((v: any) => v.status === 'disponivel').length;
      const contratosAtivos = contratos.filter((c: any) => c.status === 'ATIVO').length;
      const receitaTotal = contratos.reduce((total: number, contrato: any) => 
        total + (contrato.valorTotal || 0), 0
      );

      setStats({
        totalClientes: clientes.length,
        totalVeiculos: veiculos.length,
        totalContratos: contratos.length,
        receitaTotal,
        veiculosDisponiveis,
        contratosAtivos,
      });
    } catch (error: any) {
      setError(`Erro ao carregar dados: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  const cards = [
    {
      title: 'Total de Clientes',
      value: stats.totalClientes,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Total de Veículos',
      value: stats.totalVeiculos,
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      color: '#388e3c',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Veículos Disponíveis',
      value: stats.veiculosDisponiveis,
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      color: '#f57c00',
      bgColor: '#fff3e0',
    },
    {
      title: 'Total de Contratos',
      value: stats.totalContratos,
      icon: <Description sx={{ fontSize: 40 }} />,
      color: '#7b1fa2',
      bgColor: '#f3e5f5',
    },
    {
      title: 'Contratos Ativos',
      value: stats.contratosAtivos,
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
      bgColor: '#ffebee',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#689f38',
      bgColor: '#f1f8e9',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard - Você Aluga
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Visão geral do sistema de aluguel de veículos
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%',
                background: `linear-gradient(135deg, ${card.bgColor} 0%, white 100%)`,
                border: `1px solid ${card.color}20`,
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ color: card.color, mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: card.color }}>
                  {card.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sistema de Gestão de Aluguel de Veículos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Este dashboard apresenta uma visão geral do sistema Você Aluga, incluindo estatísticas 
            de clientes, veículos, contratos e receita. Use o menu lateral para navegar entre as 
            diferentes funcionalidades do sistema.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
