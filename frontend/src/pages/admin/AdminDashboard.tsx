import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  DirectionsCar,
  People,
  Assignment,
  TrendingUp,
  AttachMoney,
  Warning
} from '@mui/icons-material';
import { dashboardService, DashboardStats, RecentActivity, Alert as DashboardAlert } from '../../services/dashboardService';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Carregar todos os dados em paralelo
        const [statsData, activityData, alertsData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentActivity(),
          dashboardService.getAlerts()
        ]);

        setStats(statsData);
        setRecentActivity(activityData);
        setAlerts(alertsData);
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
        setError('Erro ao carregar dados. Verifique se o backend está funcionando.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando dados do dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Nenhum dado disponível</Alert>
      </Box>
    );
  }

  const StatCard = ({ title, value, icon, color = 'primary' }: any) => (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: `${color}.main`, opacity: 0.8 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard Administrativo
      </Typography>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Veículos"
            value={stats.totalVeiculos}
            icon={<DirectionsCar sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Clientes"
            value={stats.totalClientes}
            icon={<People sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Contratos Ativos"
            value={stats.contratosAtivos}
            icon={<Assignment sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Receita Mensal"
            value={`R$ ${stats.receitaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Status da Frota */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Status da Frota
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Veículos Disponíveis</Typography>
                  <Typography variant="body2" color="success.main">
                    {stats.veiculosDisponiveis} ({((stats.veiculosDisponiveis / stats.totalVeiculos) * 100).toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.veiculosDisponiveis / stats.totalVeiculos) * 100}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Veículos Alugados</Typography>
                  <Typography variant="body2" color="warning.main">
                    {stats.veiculosAlugados} ({((stats.veiculosAlugados / stats.totalVeiculos) * 100).toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.veiculosAlugados / stats.totalVeiculos) * 100}
                  color="warning"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Atividade Recente */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Atividade Recente
              </Typography>
              <List dense>
                {recentActivity.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={activity.action}
                              size="small"                      color={activity.action === 'Novo contrato' || activity.action === 'Contrato' ? 'success' : 
                             activity.action === 'Devolução' ? 'primary' : 
                             activity.action === 'Manutenção' ? 'warning' : 'default'}
                            />
                            <Typography variant="body2">
                              {activity.cliente}
                            </Typography>
                          </Box>
                        }
                        secondary={`${activity.veiculo !== '-' ? activity.veiculo + ' • ' : ''}${activity.time}`}
                      />
                    </ListItem>
                    {activity.id < recentActivity.length && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Alertas e Notificações */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Warning color="warning" />
                <Typography variant="h6">
                  Alertas e Notificações
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {alerts.map((alert) => (
                  <Grid item xs={12} md={4} key={alert.id}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: alert.type === 'warning' ? 'warning.main' : 
                                    alert.type === 'success' ? 'success.main' : 'info.main',
                        borderRadius: 1,
                        backgroundColor: alert.type === 'warning' ? 'warning.light' : 
                                        alert.type === 'success' ? 'success.light' : 'info.light',
                        opacity: 0.8
                      }}
                    >
                      <Typography variant="body2">
                        {alert.message}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
