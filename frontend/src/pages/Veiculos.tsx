import React, { useState, useEffect } from 'react';
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
  TextField,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Veiculo } from '../types';

const Veiculos: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [veiculosFiltrados, setVeiculosFiltrados] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados dos filtros
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  useEffect(() => {
    carregarVeiculos();
  }, []);

  // Recalcular valor quando dados mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [veiculos, filtroNome, filtroCategoria, filtroStatus]);

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
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setVeiculos(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar veículos:', error);
      setError(`Erro ao carregar veículos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...veiculos];

    // Filtro por nome/modelo/placa
    if (filtroNome) {
      resultado = resultado.filter(veiculo => 
        veiculo.modelo?.toLowerCase().includes(filtroNome.toLowerCase()) ||
        veiculo.marca?.toLowerCase().includes(filtroNome.toLowerCase()) ||
        veiculo.placa?.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    // Filtro por categoria (apenas se o veículo tiver categoria)
    if (filtroCategoria) {
      resultado = resultado.filter(veiculo => 
        veiculo.categoria?.toLowerCase() === filtroCategoria.toLowerCase()
      );
    }

    // Filtro por status
    if (filtroStatus) {
      if (filtroStatus === 'disponivel') {
        resultado = resultado.filter(veiculo => 
          veiculo.status?.toLowerCase() === 'disponivel'
        );
      } else if (filtroStatus === 'indisponivel') {
        resultado = resultado.filter(veiculo => 
          veiculo.status?.toLowerCase() === 'alugado' || 
          veiculo.status?.toLowerCase() === 'manutencao' ||
          (veiculo.status && veiculo.status.toLowerCase() !== 'disponivel')
        );
      }
    }

    setVeiculosFiltrados(resultado);
  };

  const limparFiltros = () => {
    setFiltroNome('');
    setFiltroCategoria('');
    setFiltroStatus('');
  };

  // Obter categorias únicas e status únicos para os filtros
  const categoriasUnicas = [...new Set(veiculos.map(v => v.categoria).filter(Boolean))];
  const statusUnicos = [...new Set(veiculos.map(v => v.status).filter(Boolean))];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando veículos...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Veículos - Sistema de Filtros
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Veículo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Seção de Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filtros</Typography>
          <Button
            size="small"
            onClick={limparFiltros}
            sx={{ ml: 'auto' }}
          >
            Limpar Filtros
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Buscar por nome, modelo ou placa - Sistema de Filtros"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Ex: Ka, Honda, ABC-1234"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Categoria"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <MenuItem value="">Todas as categorias</MenuItem>
              {categoriasUnicas.length > 0 ? categoriasUnicas.map((categoria) => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria}
                </MenuItem>
              )) : (
                <MenuItem disabled>Nenhuma categoria disponível</MenuItem>
              )}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Status"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <MenuItem value="">Todos os status</MenuItem>
              <MenuItem value="disponivel">Disponível</MenuItem>
              <MenuItem value="indisponivel">Alugado/Manutenção</MenuItem>
              {statusUnicos.map((status) => (
                <MenuItem key={status} value={status}>
                  {status ? status.charAt(0).toUpperCase() + status.slice(1) : status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {veiculosFiltrados.length} de {veiculos.length} veículos encontrados
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {veiculosFiltrados.length === 0 && !loading ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                Nenhum veículo encontrado
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Tente ajustar os filtros ou adicionar novos veículos
              </Typography>
            </Paper>
          </Grid>
        ) : (
          veiculosFiltrados.map((veiculo) => (
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
                    {veiculo.marca || 'Marca'} {veiculo.modelo}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {veiculo.marca || 'Marca'} {veiculo.modelo}
                    </Typography>
                    <Chip
                      label={veiculo.status ? veiculo.status.charAt(0).toUpperCase() + veiculo.status.slice(1) : 'Disponível'}
                      color={veiculo.status === 'disponivel' ? 'success' : veiculo.status === 'alugado' ? 'warning' : veiculo.status === 'manutencao' ? 'error' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {veiculo.categoria || 'Categoria não informada'} • {veiculo.ano} • {veiculo.cor || 'Cor não informada'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Placa: {veiculo.placa}
                  </Typography>
                  {veiculo.quilometragem && (
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Quilometragem: {parseFloat(veiculo.quilometragem.toString()).toLocaleString('pt-BR')} km
                    </Typography>
                  )}
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    R$ {veiculo.valorDiaria ? veiculo.valorDiaria.toFixed(2) : (veiculo as any).preco_diario ? parseFloat((veiculo as any).preco_diario).toFixed(2) : '150,00'}/dia
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
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Veiculos;
