import api from './api';
import { Contrato } from '../types';

// Dados mockados temporários para desenvolvimento
const mockContratos: Contrato[] = [
  {
    id: 1,
    clienteId: 1,
    veiculoId: 1,
    dataInicio: '2024-01-15',
    dataFim: '2024-01-20',
    valorTotal: 600.00,
    status: 'ATIVO'
  },
  {
    id: 2,
    clienteId: 2,
    veiculoId: 2,
    dataInicio: '2024-01-10',
    dataFim: '2024-01-17',
    valorTotal: 595.00,
    status: 'ENCERRADO'
  },
  {
    id: 3,
    clienteId: 3,
    veiculoId: 3,
    dataInicio: '2024-01-20',
    dataFim: '2024-01-25',
    valorTotal: 900.00,
    status: 'PENDENTE'
  }
];

export const contratoService = {
  listarTodos: () => {
    return new Promise<{data: Contrato[]}>((resolve) => {
      setTimeout(() => {
        resolve({ data: mockContratos });
      }, 500);
    });
  },
  
  buscarPorId: (id: number) => {
    return new Promise<{data: Contrato}>((resolve, reject) => {
      setTimeout(() => {
        const contrato = mockContratos.find(c => c.id === id);
        if (contrato) {
          resolve({ data: contrato });
        } else {
          reject(new Error('Contrato não encontrado'));
        }
      }, 300);
    });
  },
  
  criar: (contrato: Omit<Contrato, 'id'>) => {
    return new Promise<{data: Contrato}>((resolve) => {
      setTimeout(() => {
        const novoContrato = { ...contrato, id: mockContratos.length + 1 };
        mockContratos.push(novoContrato);
        resolve({ data: novoContrato });
      }, 300);
    });
  },
  
  atualizar: (id: number, contrato: Partial<Contrato>) => {
    return new Promise<{data: Contrato}>((resolve, reject) => {
      setTimeout(() => {
        const index = mockContratos.findIndex(c => c.id === id);
        if (index !== -1) {
          mockContratos[index] = { ...mockContratos[index], ...contrato };
          resolve({ data: mockContratos[index] });
        } else {
          reject(new Error('Contrato não encontrado'));
        }
      }, 300);
    });
  },
  
  deletar: (id: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockContratos.findIndex(c => c.id === id);
        if (index !== -1) {
          mockContratos.splice(index, 1);
        }
        resolve();
      }, 300);
    });
  },
  
  gerar: (id: number) => {
    return new Promise<{data: string}>((resolve) => {
      setTimeout(() => {
        resolve({ data: `Contrato #${id} gerado com sucesso!` });
      }, 300);
    });
  },
  
  encerrar: (id: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockContratos.findIndex(c => c.id === id);
        if (index !== -1) {
          mockContratos[index].status = 'ENCERRADO';
        }
        resolve();
      }, 300);
    });
  },
  
  aplicarDesconto: (id: number, valor: number) => {
    return new Promise<{data: number}>((resolve) => {
      setTimeout(() => {
        const index = mockContratos.findIndex(c => c.id === id);
        if (index !== -1) {
          const novoValor = mockContratos[index].valorTotal - valor;
          mockContratos[index].valorTotal = novoValor;
          resolve({ data: novoValor });
        }
      }, 300);
    });
  },

  // Funções para chamadas reais da API quando backend estiver funcionando
  listarTodosAPI: () => api.get<Contrato[]>('/contratos'),
};
