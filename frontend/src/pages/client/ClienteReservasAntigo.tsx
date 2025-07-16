import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Schedule,
  Cancel,
  Visibility
} from '@mui/icons-material';

interface Reserva {
  id: number;
  veiculo: {
    modelo: string;
    marca: string;
    placa: string;
    ano: number;
  };
  dataInicio: string;
  dataFim: string;
  status: 'ativa' | 'concluida' | 'cancelada' | 'agendada';
  valorTotal: number;
  valorDiario: number;
  diasAluguel: number;
}

const ClienteReservas: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockReservas: Reserva[] = [
        {
          id: 1,
          veiculo: {
            modelo: 'Civic',
            marca: 'Honda',
            placa: 'ABC-1234',
            ano: 2022
          },
          dataInicio: '2024-07-20',
          dataFim: '2024-07-23',
          status: 'agendada',
          valorDiario: 150,
          diasAluguel: 3,
          valorTotal: 450
        },
        {
          id: 2,
          veiculo: {
            modelo: 'Corolla',
            marca: 'Toyota',
            placa: 'DEF-5678',
            ano: 2023
          },
          dataInicio: '2024-07-10',
          dataFim: '2024-07-15',
          status: 'ativa',
          valorDiario: 140,
          diasAluguel: 5,
          valorTotal: 700
        },
        {
          id: 3,
          veiculo: {
            modelo: 'HB20',
            marca: 'Hyundai',
            placa: 'GHI-9012',
            ano: 2021
          },
          dataInicio: '2024-06-15',
          dataFim: '2024-06-20',
          status: 'concluida',
          valorDiario: 90,
          diasAluguel: 5,
          valorTotal: 450
        },
        {
          id: 4,
          veiculo: {
            modelo: 'Ka',
            marca: 'Ford',
            placa: 'JKL-3456',
            ano: 2020
          },
          dataInicio: '2024-05-10',
          dataFim: '2024-05-12',
          status: 'cancelada',
          valorDiario: 80,
          diasAluguel: 2,
          valorTotal: 160
        }
      ];
      setReservas(mockReservas);
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'success';
      case 'agendada': return 'info';
      case 'concluida': return 'default';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa': return 'Em Andamento';
      case 'agendada': return 'Agendada';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativa': return <DirectionsCar />;
      case 'agendada': return <Schedule />;
      case 'concluida': return <CheckCircle />;
      case 'cancelada': return <Cancel />;
      default: return null;
    }
  };

  const filterReservas = (status?: string[]) => {
    if (!status) return reservas;
    return reservas.filter(r => status.includes(r.status));
  };

  const getCurrentReservas = () => {
    switch (tabValue) {
      case 0: // Todas
        return reservas;
      case 1: // Ativas/Agendadas
        return filterReservas(['ativa', 'agendada']);
      case 2: // Histórico
        return filterReservas(['concluida', 'cancelada']);
      default:
        return reservas;
    }
  };

  const handleViewDetails = (reserva: Reserva) => {
    setSelectedReserva(reserva);
    setOpenDialog(true);
  };

  const handleCancelReserva = async (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      try {
        setReservas(reservas.map(r => 
          r.id === id ? { ...r, status: 'cancelada' as const } : r
        ));
      } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
      }
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  const currentReservas = getCurrentReservas();
  const reservasAtivas = filterReservas(['ativa', 'agendada']);
  const reservasConcluidas = filterReservas(['concluida']);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Minhas Reservas
      </Typography>

      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{reservasAtivas.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Reservas Ativas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{reservasConcluidas.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Concluídas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">
                R$ {reservasConcluidas.reduce((sum, r) => sum + r.valorTotal, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Gasto
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerta para reservas ativas */}
      {reservasAtivas.length > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Você tem {reservasAtivas.length} reserva(s) ativa(s) ou agendada(s).
        </Alert>
      )}

      {/* Tabs */}
      <Card elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Todas" />
            <Tab label="Ativas/Agendadas" />
            <Tab label="Histórico" />
          </Tabs>
        </Box>

        {/* Tabela de Reservas */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Veículo</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReservas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhuma reserva encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentReservas.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DirectionsCar color="action" />
                        <Box>
                          <Typography variant="subtitle2">
                            {reserva.veiculo.marca} {reserva.veiculo.modelo}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {reserva.veiculo.placa} • {reserva.veiculo.ano}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {new Date(reserva.dataInicio).toLocaleDateString()} até{' '}
                          {new Date(reserva.dataFim).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reserva.diasAluguel} dias
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(reserva.status)}
                        label={getStatusLabel(reserva.status)}
                        color={getStatusColor(reserva.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        R$ {reserva.valorTotal}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        R$ {reserva.valorDiario}/dia
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleViewDetails(reserva)}
                        >
                          Detalhes
                        </Button>
                        {(reserva.status === 'agendada' || reserva.status === 'ativa') && (
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => handleCancelReserva(reserva.id)}
                          >
                            Cancelar
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Dialog de Detalhes */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Detalhes da Reserva #{selectedReserva?.id}
        </DialogTitle>
        <DialogContent>
          {selectedReserva && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Veículo
                </Typography>
                <Typography>
                  {selectedReserva.veiculo.marca} {selectedReserva.veiculo.modelo} ({selectedReserva.veiculo.ano})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placa: {selectedReserva.veiculo.placa}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Período
                </Typography>
                <Typography>
                  De {new Date(selectedReserva.dataInicio).toLocaleDateString()} às 10:00
                </Typography>
                <Typography>
                  Até {new Date(selectedReserva.dataFim).toLocaleDateString()} às 18:00
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: {selectedReserva.diasAluguel} dias
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Valores
                </Typography>
                <Typography>
                  Valor diário: R$ {selectedReserva.valorDiario}
                </Typography>
                <Typography>
                  {selectedReserva.diasAluguel} dias × R$ {selectedReserva.valorDiario} = R$ {selectedReserva.valorTotal}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Status
                </Typography>
                <Chip
                  icon={getStatusIcon(selectedReserva.status)}
                  label={getStatusLabel(selectedReserva.status)}
                  color={getStatusColor(selectedReserva.status) as any}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClienteReservas;
