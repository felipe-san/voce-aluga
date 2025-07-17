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
  Download,
  PlayArrow,
  Refresh
} from '@mui/icons-material';
import statusService from '../../services/statusService';

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
  status: 'ativo' | 'concluida' | 'cancelada';
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
  const [inicializandoStatus, setInicializandoStatus] = useState(false);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    try {
      // Tentar buscar contratos do cliente logado
      const response = await fetch('http://localhost:8081/contratos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const contratos = await response.json();
        
        // Buscar detalhes dos veículos
        const veiculosResponse = await fetch('http://localhost:8081/api/veiculos');
        const veiculos = veiculosResponse.ok ? await veiculosResponse.json() : [];

        // Converter contratos para formato do histórico
        const historicoConvertido: HistoricoItem[] = contratos.map((contrato: any) => {
          const veiculo = veiculos.find((v: any) => v.id === contrato.veiculoId);
          const dataInicio = new Date(contrato.dataInicio);
          const dataFim = new Date(contrato.dataFim);
          const diasAluguel = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
          
          // Usar status do banco ou determinar baseado nas datas se não houver
          let statusContrato = 'concluida'; // default
          if (contrato.status) {
            // Mapear status do backend para o frontend
            switch (contrato.status.toLowerCase()) {
              case 'ativo':
              case 'em_andamento':
                statusContrato = 'ativo';
                break;
              case 'concluido':
              case 'encerrado':
              case 'finalizado':
                statusContrato = 'concluida';
                break;
              case 'cancelado':
                statusContrato = 'cancelada';
                break;
              default:
                // Se não reconhecer o status, usar lógica de data
                const hoje = new Date();
                const isPassado = dataFim < hoje;
                statusContrato = isPassado ? 'concluida' : 'ativo';
            }
          } else {
            // Se não houver status no banco, usar lógica de data
            const hoje = new Date();
            const isPassado = dataFim < hoje;
            statusContrato = isPassado ? 'concluida' : 'ativo';
          }
          
          return {
            id: contrato.id,
            veiculo: {
              modelo: veiculo?.modelo || 'Modelo não encontrado',
              marca: veiculo?.marca || 'Marca não encontrada',
              placa: veiculo?.placa || 'Placa não encontrada',
              ano: veiculo?.ano || new Date().getFullYear()
            },
            dataInicio: contrato.dataInicio,
            dataFim: contrato.dataFim,
            status: statusContrato as 'ativo' | 'concluida' | 'cancelada',
            valorDiario: contrato.valor || (contrato.valorTotal / diasAluguel) || 0,
            diasAluguel,
            valorTotal: contrato.valorTotal || 0,
            avaliacao: Math.floor(Math.random() * 5) + 1 // Avaliação simulada
          };
        });

        setHistorico(historicoConvertido);
      } else {
        // Se a API falhar, usar dados simulados
        throw new Error('API não disponível');
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      // Dados simulados - em produção viriam da API
      const mockHistorico: HistoricoItem[] = [
        {
          id: 0,
          veiculo: {
            modelo: 'Corolla',
            marca: 'Toyota',
            placa: 'ABC-1234',
            ano: 2023
          },
          dataInicio: '2024-07-10',
          dataFim: '2024-07-20',
          status: 'ativo',
          valorDiario: 120,
          diasAluguel: 10,
          valorTotal: 1200
        },
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
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'primary';
      case 'concluida': return 'success';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <PlayArrow />;
      case 'concluida': return <CheckCircle />;
      case 'cancelada': return <Cancel />;
      default: return <CheckCircle />; // ícone padrão em vez de null
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
    const ativos = historicoFiltrado.filter(item => item.status === 'ativo');
    
    return {
      totalAlugueis: historicoFiltrado.length,
      totalAtivos: ativos.length,
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

  const inicializarStatusContratos = async () => {
    try {
      setInicializandoStatus(true);
      await statusService.inicializarStatusContratos();
      await loadHistorico(); // Recarregar dados após atualização
      alert('Status dos contratos inicializados com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar status:', error);
      alert('Erro ao inicializar status dos contratos.');
    } finally {
      setInicializandoStatus(false);
    }
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={inicializarStatusContratos}
            disabled={inicializandoStatus}
            color="primary"
          >
            {inicializandoStatus ? 'Inicializando...' : 'Inicializar Status'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={exportarDados}
          >
            Exportar
          </Button>
        </Box>
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
              <PlayArrow color="primary" sx={{ fontSize: 30, mb: 1 }} />
              <Typography variant="h6">{stats.totalAtivos}</Typography>
              <Typography variant="body2" color="text.secondary">
                Em Andamento
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
                <MenuItem value="ativo">Em Andamento</MenuItem>
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
