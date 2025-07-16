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
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ContratoSimples {
  id?: number;
  clienteId: number;
  veiculoId: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  status?: string | null;
  desconto?: number;
}

const ContratosSimples: React.FC = () => {
  const [contratos, setContratos] = useState<ContratoSimples[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarContratos();
  }, []);

  const carregarContratos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fazer requisição direta para o backend
      const response = await fetch('http://localhost:8081/contratos');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setContratos(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar contratos:', error);
      setError(`Erro ao carregar contratos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'default';
    
    switch (status.toLowerCase()) {
      case 'ativo':
        return 'success';
      case 'encerrado':
        return 'default';
      case 'pendente':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      try {
        const response = await fetch(`http://localhost:8081/contratos/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          carregarContratos();
        } else {
          setError('Erro ao deletar contrato');
        }
      } catch (error: any) {
        console.error('Erro ao deletar contrato:', error);
        setError(`Erro ao deletar contrato: ${error.message}`);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Contratos
        </Typography>
        <Button variant="contained">
          Novo Contrato
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Carregando contratos...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente ID</TableCell>
                <TableCell>Veículo ID</TableCell>
                <TableCell>Data Início</TableCell>
                <TableCell>Data Fim</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contratos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="text.secondary">
                      Nenhum contrato encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                contratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell>{contrato.id}</TableCell>
                    <TableCell>{contrato.clienteId}</TableCell>
                    <TableCell>{contrato.veiculoId}</TableCell>
                    <TableCell>
                      {contrato.dataInicio ? new Date(contrato.dataInicio).toLocaleDateString('pt-BR') : '-'}
                    </TableCell>
                    <TableCell>
                      {contrato.dataFim ? new Date(contrato.dataFim).toLocaleDateString('pt-BR') : '-'}
                    </TableCell>
                    <TableCell>
                      R$ {contrato.valorTotal ? contrato.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={contrato.status || 'Ativo'}
                        color={getStatusColor(contrato.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(contrato.id!)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ContratosSimples;
