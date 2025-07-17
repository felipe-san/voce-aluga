import { Estoque } from '../types';

export const estoqueService = {
  listarTodos: async () => {
    try {
      const response = await fetch('http://localhost:8081/estoque');
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao buscar estoque');
    } catch (error) {
      console.error('Erro ao listar estoque:', error);
      throw error;
    }
  },

  buscarPorId: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/estoque/${id}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Item de estoque não encontrado');
    } catch (error) {
      console.error('Erro ao buscar item de estoque:', error);
      throw error;
    }
  },

  criar: async (estoque: Omit<Estoque, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8081/estoque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estoque),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao criar item de estoque');
    } catch (error) {
      console.error('Erro ao criar estoque:', error);
      throw error;
    }
  },

  atualizar: async (id: number, estoque: Partial<Estoque>) => {
    try {
      const response = await fetch(`http://localhost:8081/estoque/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estoque),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao atualizar estoque');
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      throw error;
    }
  },

  deletar: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/estoque/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return { data: null };
      }
      throw new Error('Erro ao deletar item de estoque');
    } catch (error) {
      console.error('Erro ao deletar estoque:', error);
      throw error;
    }
  },

  buscarPorVeiculo: async (veiculoId: number) => {
    try {
      const response = await fetch(`http://localhost:8081/estoque?veiculoId=${veiculoId}`);
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      throw new Error('Erro ao buscar estoque por veículo');
    } catch (error) {
      console.error('Erro ao buscar estoque por veículo:', error);
      throw error;
    }
  }
};
