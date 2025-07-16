import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import {
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  Visibility,
  Cancel,
} from '@mui/icons-material';

interface MinhaReserva {
  id: number;
  clienteId: number;
  veiculoId: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  status: string;
  formaPagamento?: string;
  observacoes?: string;
}

const MinhasReservas: React.FC = () => {
  const [reservas, setReservas] = useState<MinhaReserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Por enquanto, vou buscar todos os contratos - em um sistema real, 
      // você filtraria pelo ID do cliente logado
      const response = await fetch('http://localhost:8081/contratos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReservas(data);
      } else {
        setError('Erro ao carregar reservas');
      }
    } catch (error: any) {
      console.error('Erro ao carregar reservas:', error);
      setError(`Erro ao carregar reservas: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'warning';
      case 'ativo':
        return 'success';
      case 'concluido':
        return 'primary';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'Aguardando Aprovação';
      case 'ativo':
        return 'Confirmado';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status || 'Desconhecido';
    }
  };

  const calcularDias = (dataInicio: string, dataFim: string) => {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    return Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 3600 * 24));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Minhas Reservas
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Acompanhe o status de todas as suas reservas e contratos de locação.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {reservas.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CalendarToday sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Você ainda não possui reservas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça sua primeira reserva na aba "Solicitar Reserva"
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {reservas.map((reserva) => (
            <Grid item xs={12} md={6} lg={4} key={reserva.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      Reserva #{reserva.id}
                    </Typography>
                    <Chip 
                      label={getStatusLabel(reserva.status)} 
                      color={getStatusColor(reserva.status)}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DirectionsCar sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Veículo ID: {reserva.veiculoId}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {new Date(reserva.dataInicio).toLocaleDateString('pt-BR')} até {' '}
                      {new Date(reserva.dataFim).toLocaleDateString('pt-BR')}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      R$ {reserva.valorTotal?.toFixed(2)} ({calcularDias(reserva.dataInicio, reserva.dataFim)} dias)
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      fullWidth
                    >
                      Detalhes
                    </Button>
                    {reserva.status?.toLowerCase() === 'pendente' && (
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Cancel />}
                        fullWidth
                      >
                        Cancelar
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {reservas.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resumo das Reservas
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Veículo</TableCell>
                  <TableCell>Data Início</TableCell>
                  <TableCell>Data Fim</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservas.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell>{reserva.id}</TableCell>
                    <TableCell>Veículo {reserva.veiculoId}</TableCell>
                    <TableCell>{new Date(reserva.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(reserva.dataFim).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>R$ {reserva.valorTotal?.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(reserva.status)} 
                        color={getStatusColor(reserva.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default MinhasReservas;
