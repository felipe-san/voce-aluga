import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InventoryIcon from '@mui/icons-material/Inventory';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Veiculo } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const EstoquePage: React.FC = () => {
  const [veiculosEstoque, setVeiculosEstoque] = useState<Veiculo[]>([]);
  const [veiculosLocadora, setVeiculosLocadora] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [novoVeiculo, setNovoVeiculo] = useState({
    modelo: '',
    marca: '',
    ano: '',
    placa: '',
    cor: '',
    quilometragem: '',
    capacidadeTanque: '',
    consumoMedio: '',
    valorDiaria: '',
    categoria: '',
    status: 'DISPONIVEL',
    localizacao: 'ESTOQUE'
  });

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8081/api/veiculos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const veiculos = await response.json();
        
        // Separar veículos por localização
        const estoque = veiculos.filter((v: Veiculo) => v.localizacao === 'ESTOQUE' || !v.localizacao);
        const locadora = veiculos.filter((v: Veiculo) => v.localizacao === 'LOCADORA');
        
        setVeiculosEstoque(estoque);
        setVeiculosLocadora(locadora);
      } else {
        setError('Erro ao carregar veículos');
      }
    } catch (error: any) {
      console.error('Erro ao carregar veículos:', error);
      setError(`Erro ao carregar veículos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoadingModal(true);
      
      const veiculo = {
        modelo: novoVeiculo.modelo,
        marca: novoVeiculo.marca,
        ano: novoVeiculo.ano,
        placa: novoVeiculo.placa,
        cor: novoVeiculo.cor,
        quilometragem: parseInt(novoVeiculo.quilometragem) || 0,
        capacidadeTanque: parseFloat(novoVeiculo.capacidadeTanque) || 0,
        consumoMedio: parseFloat(novoVeiculo.consumoMedio) || 0,
        valorDiaria: parseFloat(novoVeiculo.valorDiaria),
        categoria: novoVeiculo.categoria,
        status: novoVeiculo.status,
        disponivel: false, // Veículos no estoque não estão disponíveis para locação ainda
        localizacao: 'ESTOQUE'
      };

      const response = await fetch('http://localhost:8081/api/veiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculo),
      });

      if (response.ok) {
        handleCloseModal();
        carregarVeiculos();
      } else {
        setError('Erro ao adicionar veículo ao estoque');
      }
    } catch (error: any) {
      console.error('Erro ao adicionar veículo:', error);
      setError(`Erro ao adicionar veículo: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const migrarParaLocadora = async (veiculo: Veiculo) => {
    try {
      const veiculoAtualizado = {
        ...veiculo,
        localizacao: 'LOCADORA',
        disponivel: true,
        status: 'DISPONIVEL'
      };

      const response = await fetch(`http://localhost:8081/api/veiculos/${veiculo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculoAtualizado),
      });

      if (response.ok) {
        carregarVeiculos();
        alert('Veículo migrado para a locadora com sucesso!');
      } else {
        setError('Erro ao migrar veículo para locadora');
      }
    } catch (error: any) {
      console.error('Erro ao migrar veículo:', error);
      setError(`Erro ao migrar veículo: ${error.message}`);
    }
  };

  const migrarParaEstoque = async (veiculo: Veiculo) => {
    try {
      const veiculoAtualizado = {
        ...veiculo,
        localizacao: 'ESTOQUE',
        disponivel: false,
        status: 'ESTOQUE'
      };

      const response = await fetch(`http://localhost:8081/api/veiculos/${veiculo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculoAtualizado),
      });

      if (response.ok) {
        carregarVeiculos();
        alert('Veículo movido para o estoque com sucesso!');
      } else {
        setError('Erro ao mover veículo para estoque');
      }
    } catch (error: any) {
      console.error('Erro ao mover veículo:', error);
      setError(`Erro ao mover veículo: ${error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/veiculos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          carregarVeiculos();
        } else {
          setError('Erro ao deletar veículo');
        }
      } catch (error: any) {
        console.error('Erro ao deletar veículo:', error);
        setError(`Erro ao deletar veículo: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNovoVeiculo({
      modelo: '',
      marca: '',
      ano: '',
      placa: '',
      cor: '',
      quilometragem: '',
      capacidadeTanque: '',
      consumoMedio: '',
      valorDiaria: '',
      categoria: '',
      status: 'DISPONIVEL',
      localizacao: 'ESTOQUE'
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Estoque e Locadora
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Adicionar Veículo ao Estoque
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<InventoryIcon />} label={`Estoque (${veiculosEstoque.length})`} />
          <Tab icon={<DirectionsCarIcon />} label={`Locadora (${veiculosLocadora.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Veículos no Estoque (Não disponíveis para locação)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Veículo</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valor Diária</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {veiculosEstoque.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="text.secondary">
                      Nenhum veículo no estoque
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                veiculosEstoque.map((veiculo) => (
                  <TableRow key={veiculo.id}>
                    <TableCell>{veiculo.id}</TableCell>
                    <TableCell>{veiculo.marca} {veiculo.modelo}</TableCell>
                    <TableCell>{veiculo.placa}</TableCell>
                    <TableCell>{veiculo.ano}</TableCell>
                    <TableCell>{veiculo.categoria}</TableCell>
                    <TableCell>
                      <Chip 
                        label="Estoque" 
                        color="warning" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>R$ {veiculo.valorDiaria?.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Migrar para Locadora">
                          <IconButton 
                            color="success" 
                            onClick={() => migrarParaLocadora(veiculo)}
                          >
                            <SwapHorizIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton 
                            color="error" 
                            onClick={() => handleDelete(veiculo.id!)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Veículos na Locadora (Disponíveis para locação)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Veículo</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valor Diária</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {veiculosLocadora.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="text.secondary">
                      Nenhum veículo na locadora
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                veiculosLocadora.map((veiculo) => (
                  <TableRow key={veiculo.id}>
                    <TableCell>{veiculo.id}</TableCell>
                    <TableCell>{veiculo.marca} {veiculo.modelo}</TableCell>
                    <TableCell>{veiculo.placa}</TableCell>
                    <TableCell>{veiculo.ano}</TableCell>
                    <TableCell>{veiculo.categoria}</TableCell>
                    <TableCell>
                      <Chip 
                        label={veiculo.disponivel ? "Disponível" : "Alugado"} 
                        color={veiculo.disponivel ? "success" : "error"} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>R$ {veiculo.valorDiaria?.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Mover para Estoque">
                          <IconButton 
                            color="warning" 
                            onClick={() => migrarParaEstoque(veiculo)}
                          >
                            <SwapHorizIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Modal para Adicionar Veículo */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Adicionar Novo Veículo ao Estoque</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                value={novoVeiculo.marca}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={novoVeiculo.modelo}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano"
                value={novoVeiculo.ano}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, ano: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placa"
                value={novoVeiculo.placa}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, placa: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cor"
                value={novoVeiculo.cor}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, cor: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Categoria"
                value={novoVeiculo.categoria}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, categoria: e.target.value })}
                required
              >
                <MenuItem value="POPULAR">Popular</MenuItem>
                <MenuItem value="SEDAN">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="HATCH">Hatch</MenuItem>
                <MenuItem value="PICKUP">Pickup</MenuItem>
                <MenuItem value="LUXO">Luxo</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quilometragem"
                value={novoVeiculo.quilometragem}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, quilometragem: e.target.value })}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Capacidade do Tanque (L)"
                value={novoVeiculo.capacidadeTanque}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, capacidadeTanque: e.target.value })}
                inputProps={{ step: 0.1, min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Consumo Médio (km/L)"
                value={novoVeiculo.consumoMedio}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, consumoMedio: e.target.value })}
                inputProps={{ step: 0.1, min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Valor da Diária (R$)"
                value={novoVeiculo.valorDiaria}
                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, valorDiaria: e.target.value })}
                inputProps={{ step: 0.01, min: 0 }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loadingModal}>
            {loadingModal ? <CircularProgress size={20} /> : 'Adicionar ao Estoque'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EstoquePage;
