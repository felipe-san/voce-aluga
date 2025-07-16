import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { Veiculo, Cliente } from '../../types';

const ClienteReservas: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);
  
  const [dadosReserva, setDadosReserva] = useState({
    clienteId: '',
    dataInicio: '',
    dataFim: '',
    observacoes: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carregar veículos disponíveis (apenas da locadora)
      const veiculosResponse = await fetch('http://localhost:8081/api/veiculos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Carregar clientes
      const clientesResponse = await fetch('http://localhost:8081/clientes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (veiculosResponse.ok && clientesResponse.ok) {
        const todosVeiculos = await veiculosResponse.json();
        const clientesData = await clientesResponse.json();
        
        // Filtrar apenas veículos disponíveis (status = 'disponivel')
        const veiculosDisponiveis = todosVeiculos.filter((v: Veiculo) => 
          v.status === 'disponivel'
        );
        
        console.log('Veículos disponíveis:', veiculosDisponiveis);
        setVeiculos(veiculosDisponiveis);
        setClientes(clientesData);
      } else {
        setError('Erro ao carregar dados');
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      setError(`Erro ao carregar dados: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitarReserva = (veiculo: Veiculo) => {
    setVeiculoSelecionado(veiculo);
    setOpenModal(true);
  };

  const calcularValorTotal = () => {
    if (!dadosReserva.dataInicio || !dadosReserva.dataFim || !veiculoSelecionado) {
      return 0;
    }

    const dataInicio = new Date(dadosReserva.dataInicio);
    const dataFim = new Date(dadosReserva.dataFim);
    const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24));
    
    // Usando valor fixo de R$ 150,00 por dia enquanto não temos campo valorDiaria no backend
    const valorDiaria = 150.00;
    return dias > 0 ? dias * valorDiaria : 0;
  };

  const handleSubmitReserva = async () => {
    try {
      setLoadingModal(true);
      
      const valorTotal = calcularValorTotal();
      
      const reserva = {
        clienteId: parseInt(dadosReserva.clienteId),
        veiculoId: veiculoSelecionado?.id,
        dataInicio: dadosReserva.dataInicio,
        dataFim: dadosReserva.dataFim,
        valorTotal: valorTotal,
        status: 'PENDENTE', // Status de reserva pendente
        formaPagamento: 'A_COMBINAR',
        desconto: 0,
        observacoes: dadosReserva.observacoes,
      };

      const response = await fetch('http://localhost:8081/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      if (response.ok) {
        handleCloseModal();
        setOpenSuccessModal(true);
        carregarDados(); // Recarregar dados
      } else {
        setError('Erro ao solicitar reserva');
      }
    } catch (error: any) {
      console.error('Erro ao solicitar reserva:', error);
      setError(`Erro ao solicitar reserva: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setVeiculoSelecionado(null);
    setDadosReserva({
      clienteId: '',
      dataInicio: '',
      dataFim: '',
      observacoes: '',
    });
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          Solicitar Reserva
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Escolha um veículo disponível e solicite sua reserva. O pagamento será realizado no local.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon />
          <Typography variant="body2">
            <strong>Informação Importante:</strong> O pagamento será realizado no momento da retirada do veículo.
            Sua solicitação de reserva será analisada e você receberá uma confirmação.
          </Typography>
        </Box>
      </Paper>

      {veiculos.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <DirectionsCarIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Nenhum veículo disponível no momento
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tente novamente mais tarde ou entre em contato conosco.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {veiculos.map((veiculo) => (
            <Grid item xs={12} sm={6} md={4} key={veiculo.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DirectionsCarIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {veiculo.modelo}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={`Ano ${veiculo.ano}`} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip 
                      label={veiculo.status} 
                      size="small" 
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Placa:</strong> {veiculo.placa}
                  </Typography>
                  
                  {veiculo.quilometragem && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Quilometragem:</strong> {veiculo.quilometragem.toLocaleString()} km
                    </Typography>
                  )}

                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoneyIcon fontSize="small" />
                      R$ 150,00/dia
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CalendarTodayIcon />}
                    onClick={() => handleSolicitarReserva(veiculo)}
                    sx={{ mt: 1 }}
                  >
                    Solicitar Reserva
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal de Solicitação de Reserva */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Solicitar Reserva - {veiculoSelecionado?.marca} {veiculoSelecionado?.modelo}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Cliente"
                value={dadosReserva.clienteId}
                onChange={(e) => setDadosReserva({ ...dadosReserva, clienteId: e.target.value })}
                required
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Início"
                value={dadosReserva.dataInicio}
                onChange={(e) => setDadosReserva({ ...dadosReserva, dataInicio: e.target.value })}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Fim"
                value={dadosReserva.dataFim}
                onChange={(e) => setDadosReserva({ ...dadosReserva, dataFim: e.target.value })}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: dadosReserva.dataInicio || new Date().toISOString().split('T')[0] }}
                required
              />
            </Grid>

            {dadosReserva.dataInicio && dadosReserva.dataFim && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Typography variant="h6" gutterBottom>
                    Resumo da Reserva
                  </Typography>
                  <Typography variant="body2">
                    Período: {Math.ceil((new Date(dadosReserva.dataFim).getTime() - new Date(dadosReserva.dataInicio).getTime()) / (1000 * 3600 * 24))} dia(s)
                  </Typography>
                  <Typography variant="body2">
                    Valor por dia: R$ {veiculoSelecionado?.valorDiaria.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Valor Total: R$ {calcularValorTotal().toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações (opcional)"
                value={dadosReserva.observacoes}
                onChange={(e) => setDadosReserva({ ...dadosReserva, observacoes: e.target.value })}
                placeholder="Ex: Horário preferido para retirada, necessidades especiais, etc."
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="info">
                <strong>Pagamento no Local:</strong> O pagamento será realizado no momento da retirada do veículo.
                Sua reserva ficará pendente até a confirmação da nossa equipe.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button 
            onClick={handleSubmitReserva} 
            variant="contained" 
            disabled={loadingModal || !dadosReserva.clienteId || !dadosReserva.dataInicio || !dadosReserva.dataFim}
          >
            {loadingModal ? <CircularProgress size={20} /> : 'Solicitar Reserva'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Sucesso */}
      <Dialog open={openSuccessModal} onClose={handleCloseSuccessModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: 'success.main' }}>
          Reserva Solicitada com Sucesso!
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <CalendarTodayIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            Sua solicitação de reserva foi enviada com sucesso!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nossa equipe analisará sua solicitação e entrará em contato para confirmar a reserva.
            O pagamento será realizado no momento da retirada do veículo.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleCloseSuccessModal} variant="contained">
            Entendi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClienteReservas;
