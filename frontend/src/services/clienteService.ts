import api from './api';
import { Cliente } from '../types';

// Dados mockados temporários para desenvolvimento
const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua A, 123',
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
    telefone: '(11) 88888-8888',
    endereco: 'Rua B, 456',
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
    telefone: '(11) 77777-7777',
    endereco: 'Rua C, 789',
    documento: '11111111111',
    cpf: '111.111.111-11',
    cnh: '11111111111',
    fidelidade: '50',
    listaSuja: true
  }
];

export const clienteService = {
  listarTodos: () => {
    // Simulando chamada da API com delay
    return new Promise<{data: Cliente[]}>((resolve) => {
      setTimeout(() => {
        resolve({ data: mockClientes });
      }, 500);
    });
  },
  
  buscarPorId: (id: number) => {
    return new Promise<{data: Cliente}>((resolve, reject) => {
      setTimeout(() => {
        const cliente = mockClientes.find(c => c.id === id);
        if (cliente) {
          resolve({ data: cliente });
        } else {
          reject(new Error('Cliente não encontrado'));
        }
      }, 300);
    });
  },
  
  criar: (cliente: Omit<Cliente, 'id'>) => {
    return new Promise<{data: Cliente}>((resolve) => {
      setTimeout(() => {
        const novoCliente = { ...cliente, id: mockClientes.length + 1 };
        mockClientes.push(novoCliente);
        resolve({ data: novoCliente });
      }, 300);
    });
  },
  
  atualizar: (id: number, cliente: Partial<Cliente>) => {
    return new Promise<{data: Cliente}>((resolve, reject) => {
      setTimeout(() => {
        const index = mockClientes.findIndex(c => c.id === id);
        if (index !== -1) {
          mockClientes[index] = { ...mockClientes[index], ...cliente };
          resolve({ data: mockClientes[index] });
        } else {
          reject(new Error('Cliente não encontrado'));
        }
      }, 300);
    });
  },
  
  deletar: (id: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockClientes.findIndex(c => c.id === id);
        if (index !== -1) {
          mockClientes.splice(index, 1);
        }
        resolve();
      }, 300);
    });
  },

  // Função para fazer chamada real da API quando backend estiver funcionando
  listarTodosAPI: () => api.get<Cliente[]>('/clientes'),
};
