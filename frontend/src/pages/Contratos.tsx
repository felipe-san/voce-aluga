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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Tooltip,
} from '@mui/material';
import jsPDF from 'jspdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Contrato, Cliente, Veiculo } from '../types';

const Contratos: React.FC = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState<Contrato | null>(null);
  
  const [novoContrato, setNovoContrato] = useState({
    clienteId: '',
    veiculoNome: '', // Mudei de veiculoId para veiculoNome
    dataInicio: '',
    dataFim: '',
    valorTotal: '',
    desconto: '',
    formaPagamento: '',
  });

  const [dadosPagamento, setDadosPagamento] = useState({
    valorPago: '',
    formaPagamento: '',
    observacoes: '',
  });

  const [dadosDevolucao, setDadosDevolucao] = useState({
    dataDevolucao: '',
    quilometragemFinal: '',
    condicaoVeiculo: '',
    taxasAdicionais: '',
    observacoes: '',
  });

  useEffect(() => {
    carregarContratos();
  }, []);

  const carregarContratos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fazer requisição direta para o backend
      const response = await fetch('http://localhost:8081/contratos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
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

  const carregarClientes = async () => {
    try {
      const response = await fetch('http://localhost:8081/clientes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setClientes(data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const carregarVeiculos = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/veiculos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Filtrar apenas veículos disponíveis
        setVeiculos(data?.filter((v: Veiculo) => v.disponivel) || []);
      }
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    carregarClientes();
    carregarVeiculos();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNovoContrato({
      clienteId: '',
      veiculoNome: '',
      dataInicio: '',
      dataFim: '',
      valorTotal: '',
      desconto: '',
      formaPagamento: '',
    });
  };

  const handleOpenEditModal = (contrato: Contrato) => {
    setContratoSelecionado(contrato);
    setNovoContrato({
      clienteId: contrato.clienteId?.toString() || '',
      veiculoNome: `Veículo ID: ${contrato.veiculoId}`, // Usar um placeholder já que não temos o nome
      dataInicio: contrato.dataInicio || '',
      dataFim: contrato.dataFim || '',
      valorTotal: contrato.valorTotal?.toString() || '',
      desconto: contrato.desconto?.toString() || '',
      formaPagamento: contrato.formaPagamento || '',
    });
    setOpenEditModal(true);
    carregarClientes();
    carregarVeiculos();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setContratoSelecionado(null);
    setNovoContrato({
      clienteId: '',
      veiculoNome: '',
      dataInicio: '',
      dataFim: '',
      valorTotal: '',
      desconto: '',
      formaPagamento: '',
    });
  };

  const handleOpenPaymentModal = (contrato: Contrato) => {
    setContratoSelecionado(contrato);
    setDadosPagamento({
      valorPago: '',
      formaPagamento: '',
      observacoes: '',
    });
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setContratoSelecionado(null);
    setDadosPagamento({
      valorPago: '',
      formaPagamento: '',
      observacoes: '',
    });
  };

  const handleOpenReturnModal = (contrato: Contrato) => {
    setContratoSelecionado(contrato);
    setDadosDevolucao({
      dataDevolucao: new Date().toISOString().split('T')[0],
      quilometragemFinal: '',
      condicaoVeiculo: '',
      taxasAdicionais: '',
      observacoes: '',
    });
    setOpenReturnModal(true);
  };

  const handleCloseReturnModal = () => {
    setOpenReturnModal(false);
    setContratoSelecionado(null);
    setDadosDevolucao({
      dataDevolucao: '',
      quilometragemFinal: '',
      condicaoVeiculo: '',
      taxasAdicionais: '',
      observacoes: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setNovoContrato(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calcularValorTotal = () => {
    if (novoContrato.veiculoNome && novoContrato.dataInicio && novoContrato.dataFim) {
      const dataInicio = new Date(novoContrato.dataInicio);
      const dataFim = new Date(novoContrato.dataFim);
      const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
      const valorDiaria = 150.00; // Valor fixo por enquanto
      const valorTotal = dias * valorDiaria;
      const desconto = parseFloat(novoContrato.desconto) || 0;
      const valorFinal = valorTotal - desconto;
      
      setNovoContrato(prev => ({
        ...prev,
        valorTotal: valorFinal.toString()
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoadingModal(true);
      
      const contrato = {
        clienteId: parseInt(novoContrato.clienteId),
        veiculoId: 1, // Usar um ID fixo por enquanto, já que agora digitamos o nome
        dataInicio: novoContrato.dataInicio,
        dataFim: novoContrato.dataFim,
        valorTotal: parseFloat(novoContrato.valorTotal),
        desconto: parseFloat(novoContrato.desconto) || 0,
        formaPagamento: novoContrato.formaPagamento,
        status: 'ATIVO',
        observacoes: `Veículo: ${novoContrato.veiculoNome}` // Salvar o nome do veículo nas observações
      };

      const response = await fetch('http://localhost:8081/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contrato),
      });

      if (response.ok) {
        handleCloseModal();
        carregarContratos();
      } else {
        setError('Erro ao criar contrato');
      }
    } catch (error: any) {
      console.error('Erro ao criar contrato:', error);
      setError(`Erro ao criar contrato: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      setLoadingModal(true);
      
      const contrato = {
        clienteId: parseInt(novoContrato.clienteId),
        veiculoId: 1, // Usar ID fixo já que agora digitamos o nome
        dataInicio: novoContrato.dataInicio,
        dataFim: novoContrato.dataFim,
        valorTotal: parseFloat(novoContrato.valorTotal),
        desconto: parseFloat(novoContrato.desconto) || 0,
        formaPagamento: novoContrato.formaPagamento,
        observacoes: `Veículo: ${novoContrato.veiculoNome}` // Salvar o nome nas observações
      };

      const response = await fetch(`http://localhost:8081/contratos/${contratoSelecionado?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contrato),
      });

      if (response.ok) {
        handleCloseEditModal();
        carregarContratos();
      } else {
        setError('Erro ao editar contrato');
      }
    } catch (error: any) {
      console.error('Erro ao editar contrato:', error);
      setError(`Erro ao editar contrato: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      setLoadingModal(true);
      
      const pagamento = {
        contratoId: contratoSelecionado?.id,
        valorPago: parseFloat(dadosPagamento.valorPago),
        formaPagamento: dadosPagamento.formaPagamento,
        dataPagamento: new Date().toISOString(),
        observacoes: dadosPagamento.observacoes,
      };

      // Aqui você pode implementar o endpoint específico para pagamentos
      // Por enquanto, vou simular com um console.log
      console.log('Registrar pagamento:', pagamento);
      
      alert('Pagamento registrado com sucesso!');
      handleClosePaymentModal();
      carregarContratos();
    } catch (error: any) {
      console.error('Erro ao registrar pagamento:', error);
      setError(`Erro ao registrar pagamento: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleReturnSubmit = async () => {
    try {
      setLoadingModal(true);
      
      const devolucao = {
        contratoId: contratoSelecionado?.id,
        dataDevolucao: dadosDevolucao.dataDevolucao,
        quilometragemFinal: parseFloat(dadosDevolucao.quilometragemFinal),
        condicaoVeiculo: dadosDevolucao.condicaoVeiculo,
        taxasAdicionais: parseFloat(dadosDevolucao.taxasAdicionais) || 0,
        observacoes: dadosDevolucao.observacoes,
      };

      // Aqui você pode implementar o endpoint específico para devoluções
      console.log('Registrar devolução:', devolucao);
      
      alert('Devolução registrada com sucesso!');
      handleCloseReturnModal();
      carregarContratos();
    } catch (error: any) {
      console.error('Erro ao registrar devolução:', error);
      setError(`Erro ao registrar devolução: ${error.message}`);
    } finally {
      setLoadingModal(false);
    }
  };

  const gerarPDF = async (contrato: Contrato) => {
    try {
      // Buscar dados completos do cliente e veículo
      const clienteResponse = await fetch(`http://localhost:8081/clientes/${contrato.clienteId}`);
      const cliente = await clienteResponse.json();
      
      const veiculoResponse = await fetch(`http://localhost:8081/api/veiculos/${contrato.veiculoId}`);
      const veiculo = await veiculoResponse.json();

      // Dados da empresa (fictícios)
      const dadosEmpresa = {
        nome: 'VOCÊ ALUGA VEÍCULOS LTDA',
        cnpj: '12.345.678/0001-90',
        endereco: 'Rua das Locadoras, 123 - Centro',
        cidade: 'São Paulo - SP',
        cep: '01234-567',
        telefone: '(11) 9999-9999',
        email: 'contato@vocealuga.com.br'
      };

      // Criar o PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Configurar fonte
      doc.setFont('helvetica');
      
      // Cabeçalho da empresa
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(dadosEmpresa.nome, pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`CNPJ: ${dadosEmpresa.cnpj}`, pageWidth / 2, 28, { align: 'center' });
      doc.text(dadosEmpresa.endereco, pageWidth / 2, 34, { align: 'center' });
      doc.text(`${dadosEmpresa.cidade} - ${dadosEmpresa.cep}`, pageWidth / 2, 40, { align: 'center' });
      doc.text(`Tel: ${dadosEmpresa.telefone} | Email: ${dadosEmpresa.email}`, pageWidth / 2, 46, { align: 'center' });
      
      // Linha separadora
      doc.line(20, 52, pageWidth - 20, 52);
      
      // Título da nota fiscal
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTA FISCAL DE SERVIÇO', pageWidth / 2, 62, { align: 'center' });
      
      // Informações do contrato
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nota Fiscal Nº: ${String(contrato.id).padStart(6, '0')}`, 20, 75);
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - 80, 75);
      
      // Dados do cliente
      doc.setFont('helvetica', 'bold');
      doc.text('DADOS DO CLIENTE:', 20, 90);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nome: ${cliente.nome || 'Cliente ' + contrato.clienteId}`, 20, 98);
      doc.text(`CPF/CNPJ: ${cliente.cpf || cliente.cnpj || '000.000.000-00'}`, 20, 106);
      doc.text(`Telefone: ${cliente.telefone || '(11) 9999-9999'}`, 20, 114);
      doc.text(`Email: ${cliente.email || 'cliente@email.com'}`, 20, 122);
      
      // Dados do veículo
      doc.setFont('helvetica', 'bold');
      doc.text('DADOS DO VEÍCULO:', 20, 137);
      doc.setFont('helvetica', 'normal');
      doc.text(`Veículo: ${veiculo.marca || 'Marca'} ${veiculo.modelo || 'Modelo'}`, 20, 145);
      doc.text(`Ano: ${veiculo.ano || 'N/A'}`, 20, 153);
      doc.text(`Placa: ${veiculo.placa || 'ABC-1234'}`, 20, 161);
      doc.text(`Cor: ${veiculo.cor || 'N/A'}`, 20, 169);
      
      // Período do contrato
      doc.setFont('helvetica', 'bold');
      doc.text('PERÍODO DA LOCAÇÃO:', 20, 184);
      doc.setFont('helvetica', 'normal');
      doc.text(`Data Início: ${new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}`, 20, 192);
      doc.text(`Data Fim: ${new Date(contrato.dataFim).toLocaleDateString('pt-BR')}`, 20, 200);
      
      // Calcular dias
      const dataInicio = new Date(contrato.dataInicio);
      const dataFim = new Date(contrato.dataFim);
      const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24));
      doc.text(`Período: ${dias} dia(s)`, 20, 208);
      
      // Valores
      doc.setFont('helvetica', 'bold');
      doc.text('DISCRIMINAÇÃO DOS SERVIÇOS:', 20, 223);
      doc.setFont('helvetica', 'normal');
      
      const valorDiaria = contrato.valorTotal / dias;
      doc.text(`Locação de veículo (${dias} dia(s) x R$ ${valorDiaria.toFixed(2)})`, 20, 231);
      doc.text(`Subtotal: R$ ${contrato.valorTotal.toFixed(2)}`, 20, 239);
      
      if (contrato.desconto && contrato.desconto > 0) {
        const valorDesconto = (contrato.valorTotal * contrato.desconto) / 100;
        doc.text(`Desconto (${contrato.desconto}%): -R$ ${valorDesconto.toFixed(2)}`, 20, 247);
        doc.text(`Total: R$ ${(contrato.valorTotal - valorDesconto).toFixed(2)}`, 20, 255);
      } else {
        doc.text(`Total: R$ ${contrato.valorTotal.toFixed(2)}`, 20, 247);
      }
      
      // Forma de pagamento
      doc.setFont('helvetica', 'bold');
      doc.text('FORMA DE PAGAMENTO:', 20, 270);
      doc.setFont('helvetica', 'normal');
      
      const formasPagamento = {
        'DINHEIRO': 'Dinheiro à vista',
        'CARTAO': 'Cartão de crédito/débito',
        'PIX': 'PIX',
        'TRANSFERENCIA': 'Transferência bancária',
        'PARCELADO': 'Parcelado',
        'A_COMBINAR': 'A combinar'
      };
      
      const formaPagamentoTexto = formasPagamento[contrato.formaPagamento as keyof typeof formasPagamento] || 'A combinar';
      doc.text(formaPagamentoTexto, 20, 278);
      
      // Rodapé
      doc.line(20, 290, pageWidth - 20, 290);
      doc.setFontSize(8);
      doc.text('Esta nota fiscal foi gerada automaticamente pelo sistema Você Aluga.', pageWidth / 2, 298, { align: 'center' });
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 304, { align: 'center' });
      
      // Salvar o PDF
      const nomeArquivo = `nota-fiscal-${String(contrato.id).padStart(6, '0')}.pdf`;
      doc.save(nomeArquivo);
      
      alert('PDF da Nota Fiscal gerado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao gerar PDF:', error);
      setError(`Erro ao gerar PDF: ${error.message}`);
    }
  };

  // Recalcular valor quando dados mudarem
  useEffect(() => {
    calcularValorTotal();
  }, [novoContrato.veiculoNome, novoContrato.dataInicio, novoContrato.dataFim, novoContrato.desconto]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      try {
        const response = await fetch(`http://localhost:8081/contratos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestão de Contratos
        </Typography>
        <Button variant="contained" onClick={handleOpenModal}>
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
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar contrato">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenEditModal(contrato)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Registrar pagamento">
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleOpenPaymentModal(contrato)}
                          >
                            <PaymentIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Devolução do veículo">
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleOpenReturnModal(contrato)}
                          >
                            <AssignmentReturnIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Gerar PDF/Nota Fiscal">
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => gerarPDF(contrato)}
                          >
                            <PictureAsPdfIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar contrato">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(contrato.id!)}
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
      )}

      {/* Modal para criar novo contrato */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Novo Contrato</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Cliente"
                value={novoContrato.clienteId}
                onChange={(e) => handleInputChange('clienteId', e.target.value)}
                required
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id?.toString()}>
                    {cliente.nome} - {cliente.cpf}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do Veículo"
                value={novoContrato.veiculoNome}
                onChange={(e) => handleInputChange('veiculoNome', e.target.value)}
                placeholder="Ex: Civic, Corolla, Gol..."
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Início"
                value={novoContrato.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Fim"
                value={novoContrato.dataFim}
                onChange={(e) => handleInputChange('dataFim', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Desconto (R$)"
                value={novoContrato.desconto}
                onChange={(e) => handleInputChange('desconto', e.target.value)}
                inputProps={{ step: "0.01", min: "0" }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Forma de Pagamento"
                value={novoContrato.formaPagamento}
                onChange={(e) => setNovoContrato({ ...novoContrato, formaPagamento: e.target.value })}
              >
                <MenuItem value="DINHEIRO">Dinheiro</MenuItem>
                <MenuItem value="CARTAO">Cartão</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferência</MenuItem>
                <MenuItem value="PARCELADO">Parcelado</MenuItem>
                <MenuItem value="A_COMBINAR">A Combinar</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valor Total (R$)"
                value={novoContrato.valorTotal}
                InputProps={{
                  readOnly: true,
                }}
                helperText="Calculado automaticamente"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loadingModal || !novoContrato.clienteId || !novoContrato.veiculoNome || !novoContrato.dataInicio || !novoContrato.dataFim}
          >
            {loadingModal ? <CircularProgress size={20} /> : 'Criar Contrato'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição de Contrato */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <DialogTitle>Editar Contrato</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Cliente"
                value={novoContrato.clienteId}
                onChange={(e) => setNovoContrato({ ...novoContrato, clienteId: e.target.value })}
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
                label="Nome do Veículo"
                value={novoContrato.veiculoNome}
                onChange={(e) => {
                  setNovoContrato({ 
                    ...novoContrato, 
                    veiculoNome: e.target.value
                  });
                  calcularValorTotal();
                }}
                placeholder="Ex: Civic, Corolla, Gol..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Início"
                value={novoContrato.dataInicio}
                onChange={(e) => {
                  setNovoContrato({ ...novoContrato, dataInicio: e.target.value });
                  calcularValorTotal();
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Fim"
                value={novoContrato.dataFim}
                onChange={(e) => {
                  setNovoContrato({ ...novoContrato, dataFim: e.target.value });
                  calcularValorTotal();
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Desconto (%)"
                value={novoContrato.desconto}
                onChange={(e) => {
                  setNovoContrato({ ...novoContrato, desconto: e.target.value });
                  calcularValorTotal();
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Forma de Pagamento"
                value={novoContrato.formaPagamento}
                onChange={(e) => setNovoContrato({ ...novoContrato, formaPagamento: e.target.value })}
              >
                <MenuItem value="DINHEIRO">Dinheiro</MenuItem>
                <MenuItem value="CARTAO">Cartão</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferência</MenuItem>
                <MenuItem value="PARCELADO">Parcelado</MenuItem>
                <MenuItem value="A_COMBINAR">A Combinar</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valor Total"
                value={`R$ ${parseFloat(novoContrato.valorTotal || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={loadingModal}>
            {loadingModal ? <CircularProgress size={20} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Pagamento */}
      <Dialog open={openPaymentModal} onClose={handleClosePaymentModal} maxWidth="sm" fullWidth>
        <DialogTitle>Registrar Pagamento</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Contrato #{contratoSelecionado?.id} - Valor Total: R$ {contratoSelecionado?.valorTotal?.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Valor Pago"
                value={dadosPagamento.valorPago}
                onChange={(e) => setDadosPagamento({ ...dadosPagamento, valorPago: e.target.value })}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Forma de Pagamento"
                value={dadosPagamento.formaPagamento}
                onChange={(e) => setDadosPagamento({ ...dadosPagamento, formaPagamento: e.target.value })}
              >
                <MenuItem value="DINHEIRO">Dinheiro</MenuItem>
                <MenuItem value="CARTAO">Cartão</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferência</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                value={dadosPagamento.observacoes}
                onChange={(e) => setDadosPagamento({ ...dadosPagamento, observacoes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentModal}>Cancelar</Button>
          <Button onClick={handlePaymentSubmit} variant="contained" disabled={loadingModal}>
            {loadingModal ? <CircularProgress size={20} /> : 'Registrar Pagamento'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Devolução */}
      <Dialog open={openReturnModal} onClose={handleCloseReturnModal} maxWidth="sm" fullWidth>
        <DialogTitle>Registrar Devolução</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Contrato #{contratoSelecionado?.id} - Veículo #{contratoSelecionado?.veiculoId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Data/Hora de Devolução"
                value={dadosDevolucao.dataDevolucao}
                onChange={(e) => setDadosDevolucao({ ...dadosDevolucao, dataDevolucao: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quilometragem Final"
                value={dadosDevolucao.quilometragemFinal}
                onChange={(e) => setDadosDevolucao({ ...dadosDevolucao, quilometragemFinal: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Condição do Veículo"
                value={dadosDevolucao.condicaoVeiculo}
                onChange={(e) => setDadosDevolucao({ ...dadosDevolucao, condicaoVeiculo: e.target.value })}
              >
                <MenuItem value="EXCELENTE">Excelente</MenuItem>
                <MenuItem value="BOM">Bom</MenuItem>
                <MenuItem value="REGULAR">Regular</MenuItem>
                <MenuItem value="RUIM">Ruim</MenuItem>
                <MenuItem value="DANIFICADO">Danificado</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Taxas Adicionais"
                value={dadosDevolucao.taxasAdicionais}
                onChange={(e) => setDadosDevolucao({ ...dadosDevolucao, taxasAdicionais: e.target.value })}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                value={dadosDevolucao.observacoes}
                onChange={(e) => setDadosDevolucao({ ...dadosDevolucao, observacoes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReturnModal}>Cancelar</Button>
          <Button onClick={handleReturnSubmit} variant="contained" disabled={loadingModal}>
            {loadingModal ? <CircularProgress size={20} /> : 'Registrar Devolução'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contratos;
