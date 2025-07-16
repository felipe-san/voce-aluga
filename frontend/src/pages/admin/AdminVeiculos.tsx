import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  DirectionsCar
} from '@mui/icons-material';
import { clienteService } from '../../services/clienteService';

interface Veiculo {
  id: number;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
  categoria: string;
  status: 'disponivel' | 'alugado' | 'manutencao';
  preco_diario: number;
  km_atual: number;
}

const AdminVeiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
  const [formData, setFormData] = useState({
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    placa: '',
    cor: '',
    categoria: '',
    status: 'disponivel' as 'disponivel' | 'alugado' | 'manutencao',
    preco_diario: 0,
    km_atual: 0
  });

  useEffect(() => {
    loadVeiculos();
  }, []);

  const loadVeiculos = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockVeiculos: Veiculo[] = [
        {
          id: 1,
          modelo: 'Civic',
          marca: 'Honda',
          ano: 2022,
          placa: 'ABC-1234',
          cor: 'Prata',
          categoria: 'Sedan',
          status: 'disponivel',
          preco_diario: 150,
          km_atual: 15000
        },
        {
          id: 2,
          modelo: 'Corolla',
          marca: 'Toyota',
          ano: 2023,
          placa: 'DEF-5678',
          cor: 'Branco',
          categoria: 'Sedan',
          status: 'alugado',
          preco_diario: 140,
          km_atual: 8000
        },
        {
          id: 3,
          modelo: 'Ka',
          marca: 'Ford',
          ano: 2021,
          placa: 'GHI-9012',
          cor: 'Azul',
          categoria: 'Hatch',
          status: 'manutencao',
          preco_diario: 80,
          km_atual: 25000
        },
        {
          id: 4,
          modelo: 'HB20',
          marca: 'Hyundai',
          ano: 2022,
          placa: 'JKL-3456',
          cor: 'Vermelho',
          categoria: 'Hatch',
          status: 'disponivel',
          preco_diario: 90,
          km_atual: 12000
        }
      ];
      setVeiculos(mockVeiculos);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (veiculo?: Veiculo) => {
    if (veiculo) {
      setEditingVeiculo(veiculo);
      setFormData({
        modelo: veiculo.modelo,
        marca: veiculo.marca,
        ano: veiculo.ano,
        placa: veiculo.placa,
        cor: veiculo.cor,
        categoria: veiculo.categoria,
        status: veiculo.status,
        preco_diario: veiculo.preco_diario,
        km_atual: veiculo.km_atual
      });
    } else {
      setEditingVeiculo(null);
      setFormData({
        modelo: '',
        marca: '',
        ano: new Date().getFullYear(),
        placa: '',
        cor: '',
        categoria: '',
        status: 'disponivel',
        preco_diario: 0,
        km_atual: 0
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVeiculo(null);
  };

  const handleSave = async () => {
    try {
      if (editingVeiculo) {
        // Atualizar veículo existente
        const updatedVeiculos = veiculos.map(v => 
          v.id === editingVeiculo.id 
            ? { ...v, ...formData }
            : v
        );
        setVeiculos(updatedVeiculos);
      } else {
        // Criar novo veículo
        const newVeiculo: Veiculo = {
          id: Math.max(...veiculos.map(v => v.id)) + 1,
          ...formData
        };
        setVeiculos([...veiculos, newVeiculo]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        setVeiculos(veiculos.filter(v => v.id !== id));
      } catch (error) {
        console.error('Erro ao excluir veículo:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'success';
      case 'alugado': return 'warning';
      case 'manutencao': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'alugado': return 'Alugado';
      case 'manutencao': return 'Manutenção';
      default: return status;
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gerenciamento de Veículos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Novo Veículo
        </Button>
      </Box>

      {/* Estatísticas rápidas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{veiculos.length}</Typography>
              <Typography variant="body2" color="text.secondary">Total</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                {veiculos.filter(v => v.status === 'disponivel').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Disponíveis</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="warning.main">
                {veiculos.filter(v => v.status === 'alugado').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Alugados</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="error.main">
                {veiculos.filter(v => v.status === 'manutencao').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Manutenção</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabela de veículos */}
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Marca/Modelo</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Preço/Dia</TableCell>
                <TableCell>KM Atual</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {veiculos.map((veiculo) => (
                <TableRow key={veiculo.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">
                        {veiculo.marca} {veiculo.modelo}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {veiculo.cor}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{veiculo.ano}</TableCell>
                  <TableCell>{veiculo.placa}</TableCell>
                  <TableCell>{veiculo.categoria}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(veiculo.status)}
                      color={getStatusColor(veiculo.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>R$ {veiculo.preco_diario}</TableCell>
                  <TableCell>{veiculo.km_atual.toLocaleString()} km</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(veiculo)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(veiculo.id)} size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Dialog para criar/editar veículo */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVeiculo ? 'Editar Veículo' : 'Novo Veículo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano"
                type="number"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placa"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cor"
                value={formData.cor}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <MenuItem value="disponivel">Disponível</MenuItem>
                <MenuItem value="alugado">Alugado</MenuItem>
                <MenuItem value="manutencao">Manutenção</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preço por Dia (R$)"
                type="number"
                value={formData.preco_diario}
                onChange={(e) => setFormData({ ...formData, preco_diario: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="KM Atual"
                type="number"
                value={formData.km_atual}
                onChange={(e) => setFormData({ ...formData, km_atual: parseInt(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            {editingVeiculo ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminVeiculos;
