import api from './api';
import { Cliente } from '../types';

// Mock data para demonstração quando backend não estiver disponível
const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    cpf: '123.456.789-01',
    email: 'joao@email.com',
    telefone: '(11) 99999-1111',
    endereco: 'Rua A, 123, São Paulo - SP',
    cnh: '12345678901',
    dataNascimento: '1990-05-15',
    dataCadastro: '2024-01-10',
    status: 'ATIVO'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    cpf: '987.654.321-09',
    email: 'maria@email.com',
    telefone: '(21) 88888-2222',
    endereco: 'Rua B, 456, Rio de Janeiro - RJ',
    cnh: '98765432109',
    dataNascimento: '1985-12-20',
    dataCadastro: '2024-01-15',
    status: 'ATIVO'
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    cpf: '111.111.111-11',
    email: 'pedro@email.com',
    telefone: '(31) 77777-3333',
    endereco: 'Rua C, 789, Belo Horizonte - MG',
    cnh: '11111111111',
    dataNascimento: '1995-08-30',
    dataCadastro: '2024-02-01',
    status: 'BLOQUEADO'
  }
];

export const clienteService = {
  listarTodos: async () => {
    try {
      // Usar a URL correta do backend
      const response = await fetch('http://localhost:8081/clientes');
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Backend não disponível');
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
      const response = await fetch(`http://localhost:8081/clientes/${id}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Cliente não encontrado');
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
      const response = await fetch('http://localhost:8081/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao criar cliente');
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
      const response = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao atualizar cliente');
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
      const response = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return { data: null };
      }
      throw new Error('Erro ao deletar cliente');
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
