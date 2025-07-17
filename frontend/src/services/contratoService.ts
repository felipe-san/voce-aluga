import { Contrato } from '../types';

export const contratoService = {
  listarTodos: async () => {
    try {
      const response = await fetch('http://localhost:8081/contratos');
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao buscar contratos');
    } catch (error) {
      console.error('Erro ao listar contratos:', error);
      throw error;
    }
  },

  buscarPorId: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/contratos/${id}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Contrato não encontrado');
    } catch (error) {
      console.error('Erro ao buscar contrato por ID:', error);
      throw error;
    }
  },

  criar: async (contrato: Omit<Contrato, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8081/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contrato),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao criar contrato');
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      throw error;
    }
  },

  atualizar: async (id: number, contrato: Partial<Contrato>) => {
    try {
      const response = await fetch(`http://localhost:8081/contratos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contrato),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao atualizar contrato');
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      throw error;
    }
  },

  deletar: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/contratos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return { data: null };
      }
      throw new Error('Erro ao deletar contrato');
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      throw error;
    }
  },

  buscarPorCliente: async (clienteId: number) => {
    try {
      const response = await fetch(`http://localhost:8081/contratos?clienteId=${clienteId}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao buscar contratos por cliente');
    } catch (error) {
      console.error('Erro ao buscar contratos por cliente:', error);
      throw error;
    }
  },

  buscarPorStatus: async (status: string) => {
    try {
      const response = await fetch(`http://localhost:8081/contratos?status=${status}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao buscar contratos por status');
    } catch (error) {
      console.error('Erro ao buscar contratos por status:', error);
      throw error;
    }
  }
};
