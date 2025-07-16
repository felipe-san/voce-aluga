import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
  Alert
} from '@mui/material';
import {
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Cancel,
  FilterList,
  Download
} from '@mui/icons-material';

interface HistoricoItem {
  id: number;
  veiculo: {
    modelo: string;
    marca: string;
    placa: string;
    ano: number;
  };
  dataInicio: string;
  dataFim: string;
  status: 'concluida' | 'cancelada';
  valorTotal: number;
  valorDiario: number;
  diasAluguel: number;
  avaliacao?: number;
}

const ClienteHistorico: React.FC = () => {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroAno, setFiltroAno] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockHistorico: HistoricoItem[] = [
        {
          id: 1,
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
          valorTotal: 450,
          avaliacao: 5
        },
        {
          id: 2,
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
        },
        {
          id: 3,
          veiculo: {
            modelo: 'Civic',
            marca: 'Honda',
            placa: 'MNO-7890',
            ano: 2022
          },
          dataInicio: '2024-04-20',
          dataFim: '2024-04-25',
          status: 'concluida',
          valorDiario: 150,
          diasAluguel: 5,
          valorTotal: 750,
          avaliacao: 4
        },
        {
          id: 4,
          veiculo: {
            modelo: 'Onix',
            marca: 'Chevrolet',
            placa: 'PQR-1234',
            ano: 2023
          },
          dataInicio: '2024-03-15',
          dataFim: '2024-03-18',
          status: 'concluida',
          valorDiario: 100,
          diasAluguel: 3,
          valorTotal: 300,
          avaliacao: 5
        },
        {
          id: 5,
          veiculo: {
            modelo: 'Sandero',
            marca: 'Renault',
            placa: 'STU-5678',
            ano: 2021
          },
          dataInicio: '2023-12-10',
          dataFim: '2023-12-15',
          status: 'concluida',
          valorDiario: 85,
          diasAluguel: 5,
          valorTotal: 425,
          avaliacao: 3
        }
      ];
      setHistorico(mockHistorico);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'success';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle />;
      case 'cancelada': return <Cancel />;
      default: return null;
    }
  };

  const filtrarHistorico = () => {
    let filtered = historico;

    if (filtroStatus !== 'todos') {
      filtered = filtered.filter(item => item.status === filtroStatus);
    }

    if (filtroAno !== 'todos') {
      filtered = filtered.filter(item => 
        new Date(item.dataInicio).getFullYear().toString() === filtroAno
      );
    }

    return filtered;
  };

  const calcularEstatisticas = () => {
    const historicoFiltrado = filtrarHistorico();
    const concluidas = historicoFiltrado.filter(item => item.status === 'concluida');
    
    return {
      totalAlugueis: historicoFiltrado.length,
      totalConcluidos: concluidas.length,
      totalCancelados: historicoFiltrado.filter(item => item.status === 'cancelada').length,
      valorTotal: concluidas.reduce((sum, item) => sum + item.valorTotal, 0),
      diasTotal: concluidas.reduce((sum, item) => sum + item.diasAluguel, 0),
      avaliacaoMedia: concluidas.length > 0 
        ? concluidas.reduce((sum, item) => sum + (item.avaliacao || 0), 0) / concluidas.length 
        : 0
    };
  };

  const exportarDados = () => {
    const dados = filtrarHistorico();
    const csvContent = [
      ['Data Início', 'Data Fim', 'Veículo', 'Status', 'Valor Total'],
      ...dados.map(item => [
        item.dataInicio,
        item.dataFim,
        `${item.veiculo.marca} ${item.veiculo.modelo}`,
        getStatusLabel(item.status),
        `R$ ${item.valorTotal}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historico-alugueis.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  const historicoFiltrado = filtrarHistorico();
  const stats = calcularEstatisticas();
  const anosDisponiveis = [...new Set(historico.map(item => 
    new Date(item.dataInicio).getFullYear().toString()
  ))].sort().reverse();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Histórico de Aluguéis
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={exportarDados}
        >
          Exportar
        </Button>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar color="primary" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">{stats.totalAlugueis}</Typography>
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle color="success" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">{stats.totalConcluidos}</Typography>
              <Typography variant="body2" color="text.secondary">
                Concluídos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CalendarToday color="info" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">{stats.diasTotal}</Typography>
              <Typography variant="body2" color="text.secondary">
                Dias Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney color="success" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">R$ {stats.valorTotal}</Typography>
              <Typography variant="body2" color="text.secondary">
                Gasto Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="warning.main">
                {stats.avaliacaoMedia.toFixed(1)}⭐
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avaliação Média
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Cancel color="error" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">{stats.totalCancelados}</Typography>
              <Typography variant="body2" color="text.secondary">
                Cancelados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterList />
            <Typography variant="h6">Filtros</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Status"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="concluida">Concluídos</MenuItem>
                <MenuItem value="cancelada">Cancelados</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Ano"
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
              >
                <MenuItem value="todos">Todos os anos</MenuItem>
                {anosDisponiveis.map(ano => (
                  <MenuItem key={ano} value={ano}>{ano}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabela de Histórico */}
      <Card elevation={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Período</TableCell>
                <TableCell>Veículo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Duração</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Avaliação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historicoFiltrado.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhum registro encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                historicoFiltrado.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(item.dataInicio).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        até {new Date(item.dataFim).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DirectionsCar color="action" />
                        <Box>
                          <Typography variant="subtitle2">
                            {item.veiculo.marca} {item.veiculo.modelo}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.veiculo.placa} • {item.veiculo.ano}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(item.status)}
                        label={getStatusLabel(item.status)}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.diasAluguel} {item.diasAluguel === 1 ? 'dia' : 'dias'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" color={item.status === 'cancelada' ? 'text.disabled' : 'inherit'}>
                        R$ {item.valorTotal}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        R$ {item.valorDiario}/dia
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {item.status === 'concluida' && item.avaliacao ? (
                        <Typography variant="body2">
                          {'⭐'.repeat(item.avaliacao)} ({item.avaliacao}/5)
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ClienteHistorico;
