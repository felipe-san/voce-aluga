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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Contrato } from '../types';
import { contratoService } from '../services/contratoService';

const Contratos: React.FC = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);

  useEffect(() => {
    carregarContratos();
  }, []);

  const carregarContratos = async () => {
    try {
      const response = await contratoService.listarTodos();
      setContratos(response.data);
    } catch (error) {
      console.error('Erro ao carregar contratos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      try {
        await contratoService.deletar(id);
        carregarContratos();
      } catch (error) {
        console.error('Erro ao deletar contrato:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
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
            {contratos.map((contrato) => (
              <TableRow key={contrato.id}>
                <TableCell>{contrato.id}</TableCell>
                <TableCell>{contrato.clienteId}</TableCell>
                <TableCell>{contrato.veiculoId}</TableCell>
                <TableCell>
                  {new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {new Date(contrato.dataFim).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  R$ {contrato.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={contrato.status}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contratos;
