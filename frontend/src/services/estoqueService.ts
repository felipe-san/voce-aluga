import api from './api';
import { Estoque } from '../types';

// Dados mockados temporários para desenvolvimento
const mockEstoque: Estoque[] = [
  {
    id: 1,
    veiculoId: 1,
    quantidade: 5,
    localizacao: 'Filial Centro'
  },
  {
    id: 2,
    veiculoId: 2,
    quantidade: 3,
    localizacao: 'Filial Norte'
  },
  {
    id: 3,
    veiculoId: 3,
    quantidade: 2,
    localizacao: 'Filial Sul'
  }
];

export const estoqueService = {
  listarTodos: () => {
    return new Promise<{data: Estoque[]}>((resolve) => {
      setTimeout(() => {
        resolve({ data: mockEstoque });
      }, 500);
    });
  },
  
  buscarPorId: (id: number) => {
    return new Promise<{data: Estoque}>((resolve, reject) => {
      setTimeout(() => {
        const item = mockEstoque.find(e => e.id === id);
        if (item) {
          resolve({ data: item });
        } else {
          reject(new Error('Item não encontrado'));
        }
      }, 300);
    });
  },
  
  criar: (estoque: Omit<Estoque, 'id'>) => {
    return new Promise<{data: Estoque}>((resolve) => {
      setTimeout(() => {
        const novoItem = { ...estoque, id: mockEstoque.length + 1 };
        mockEstoque.push(novoItem);
        resolve({ data: novoItem });
      }, 300);
    });
  },
  
  atualizar: (id: number, estoque: Partial<Estoque>) => {
    return new Promise<{data: Estoque}>((resolve, reject) => {
      setTimeout(() => {
        const index = mockEstoque.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEstoque[index] = { ...mockEstoque[index], ...estoque };
          resolve({ data: mockEstoque[index] });
        } else {
          reject(new Error('Item não encontrado'));
        }
      }, 300);
    });
  },
  
  deletar: (id: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockEstoque.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEstoque.splice(index, 1);
        }
        resolve();
      }, 300);
    });
  },

  // Funções para chamadas reais da API quando backend estiver funcionando
  listarTodosAPI: () => api.get<Estoque[]>('/estoque'),
};
