import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Alert,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Veiculo {
  id?: number;
  modelo: string;
  placa: string;
  ano: string;
  status: string;
  quilometragem?: number;
}

const AdminVeiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [formData, setFormData] = useState({
    modelo: '',
    placa: '',
    ano: new Date().getFullYear().toString(),
    status: 'disponivel',
    quilometragem: 0
  });

  useEffect(() => {
    loadVeiculos();
  }, []);

  const loadVeiculos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8081/api/veiculos');
      
      if (response.ok) {
        const data = await response.json();
        setVeiculos(data || []);
      } else {
        setError('Erro ao carregar veículos');
      }
    } catch (error: any) {
      setError('Erro ao carregar veículos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (veiculo?: Veiculo) => {
    if (veiculo) {
      setEditingVeiculo(veiculo);
      setFormData({
        modelo: veiculo.modelo || '',
        placa: veiculo.placa || '',
        ano: veiculo.ano || new Date().getFullYear().toString(),
        status: veiculo.status || 'disponivel',
        quilometragem: veiculo.quilometragem || 0
      });
    } else {
      setEditingVeiculo(null);
      setFormData({
        modelo: '',
        placa: '',
        ano: new Date().getFullYear().toString(),
        status: 'disponivel',
        quilometragem: 0
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
      setLoadingModal(true);
      
      const veiculoData = {
        modelo: formData.modelo,
        placa: formData.placa,
        ano: formData.ano,
        status: formData.status,
        quilometragem: Number(formData.quilometragem)
      };

      if (editingVeiculo?.id) {
        const response = await fetch(`http://localhost:8081/api/veiculos/${editingVeiculo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(veiculoData)
        });
        
        if (!response.ok) setError('Erro ao atualizar veículo');
      } else {
        const response = await fetch('http://localhost:8081/api/veiculos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(veiculoData)
        });
        
        if (!response.ok) setError('Erro ao criar veículo');
      }
      
      loadVeiculos();
      handleCloseDialog();
    } catch (error: any) {
      setError('Erro ao salvar: ' + error.message);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/veiculos/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          loadVeiculos();
        } else {
          setError('Erro ao excluir veículo');
        }
      } catch (error: any) {
        setError('Erro ao excluir: ' + error.message);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'disponivel': return 'success';
      case 'alugado': return 'warning';
      case 'manutencao': return 'error';
      default: return 'default';
    }
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gerenciamento de Veículos
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Novo Veículo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quilometragem</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {veiculos.map((veiculo) => (
              <TableRow key={veiculo.id}>
                <TableCell>{veiculo.id}</TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.placa}</TableCell>
                <TableCell>{veiculo.ano}</TableCell>
                <TableCell>
                  <Chip
                    label={veiculo.status}
                    color={getStatusColor(veiculo.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {veiculo.quilometragem ? `${veiculo.quilometragem.toLocaleString()} km` : '-'}
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(veiculo)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => veiculo.id && handleDelete(veiculo.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVeiculo ? 'Editar Veículo' : 'Novo Veículo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placa"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <MenuItem value="disponivel">Disponível</MenuItem>
                <MenuItem value="alugado">Alugado</MenuItem>
                <MenuItem value="manutencao">Manutenção</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quilometragem"
                value={formData.quilometragem}
                onChange={(e) => setFormData({ ...formData, quilometragem: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={loadingModal || !formData.modelo || !formData.placa}
          >
            {loadingModal ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminVeiculos;
