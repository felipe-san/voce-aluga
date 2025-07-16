import api from './api';
import { Cliente } from '../types';

// Mock data para demonstração quando backend não estiver disponível
const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    endereco: 'Rua A, 123, São Paulo - SP',
    documento: '12345678901',
    cpf: '123.456.789-01',
    cnh: '12345678901',
    fidelidade: '150',
    listaSuja: false
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@email.com',
    endereco: 'Rua B, 456, Rio de Janeiro - RJ',
    documento: '98765432109',
    cpf: '987.654.321-09',
    cnh: '98765432109',
    fidelidade: '250',
    listaSuja: false
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro@email.com',
    endereco: 'Rua C, 789, Belo Horizonte - MG',
    documento: '11111111111',
    cpf: '111.111.111-11',
    cnh: '11111111111',
    fidelidade: '50',
    listaSuja: true
  }
];

export const clienteService = {
  listarTodos: async () => {
    try {
      // Tenta a API real primeiro
      const response = await api.get<Cliente[]>('/clientes');
      return response;
    } catch (error) {
      // Se falhar, usa dados mock
      console.log('🔄 Backend indisponível, usando dados mock');
      return new Promise<{data: Cliente[]}>((resolve) => {
        setTimeout(() => {
          resolve({ data: mockClientes });
        }, 800);
      });
    }
  },

  buscarPorId: async (id: number) => {
    try {
      const response = await api.get<Cliente>(`/clientes/${id}`);
      return response;
    } catch (error) {
      console.log('🔄 Backend indisponível, usando dados mock');
      return new Promise<{data: Cliente}>((resolve, reject) => {
        setTimeout(() => {
          const cliente = mockClientes.find(c => c.id === id);
          if (cliente) {
            resolve({ data: cliente });
          } else {
            reject(new Error('Cliente não encontrado'));
          }
        }, 500);
      });
    }
  },

  criar: async (cliente: Omit<Cliente, 'id'>) => {
    try {
      const response = await api.post<Cliente>('/clientes', cliente);
      return response;
    } catch (error) {
      console.log('🔄 Backend indisponível, simulando criação');
      return new Promise<{data: Cliente}>((resolve) => {
        setTimeout(() => {
          const novoCliente = { ...cliente, id: Math.max(...mockClientes.map(c => c.id || 0)) + 1 };
          mockClientes.push(novoCliente);
          resolve({ data: novoCliente });
        }, 600);
      });
    }
  },

  atualizar: async (id: number, cliente: Partial<Cliente>) => {
    try {
      const response = await api.put<Cliente>(`/clientes/${id}`, cliente);
      return response;
    } catch (error) {
      console.log('🔄 Backend indisponível, simulando atualização');
      return new Promise<{data: Cliente}>((resolve, reject) => {
        setTimeout(() => {
          const index = mockClientes.findIndex(c => c.id === id);
          if (index !== -1) {
            mockClientes[index] = { ...mockClientes[index], ...cliente };
            resolve({ data: mockClientes[index] });
          } else {
            reject(new Error('Cliente não encontrado'));
          }
        }, 600);
      });
    }
  },

  deletar: async (id: number) => {
    try {
      const response = await api.delete(`/clientes/${id}`);
      return response;
    } catch (error) {
      console.log('🔄 Backend indisponível, simulando exclusão');
      return new Promise<{data: void}>((resolve) => {
        setTimeout(() => {
          const index = mockClientes.findIndex(c => c.id === id);
          if (index !== -1) {
            mockClientes.splice(index, 1);
          }
          resolve({ data: undefined });
        }, 500);
      });
    }
  }
};
