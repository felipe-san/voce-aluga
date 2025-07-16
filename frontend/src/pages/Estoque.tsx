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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Estoque } from '../types';
import { estoqueService } from '../services/estoqueService';

const EstoquePage: React.FC = () => {
  const [estoque, setEstoque] = useState<Estoque[]>([]);

  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    try {
      const response = await estoqueService.listarTodos();
      setEstoque(response.data);
    } catch (error) {
      console.error('Erro ao carregar estoque:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item do estoque?')) {
      try {
        await estoqueService.deletar(id);
        carregarEstoque();
      } catch (error) {
        console.error('Erro ao deletar item do estoque:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Estoque
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Veículo ID</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estoque.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.veiculoId}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>{item.localizacao}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id!)} color="error">
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

export default EstoquePage;
