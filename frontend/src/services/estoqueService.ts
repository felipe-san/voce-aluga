import api from './api';
import { Estoque } from '../types';

export const estoqueService = {
  listarTodos: async () => {
    const response = await api.get<Estoque[]>('/estoque');
    return response;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Estoque>(`/estoque/${id}`);
    return response;
  },

  criar: async (estoque: Omit<Estoque, 'id'>) => {
    const response = await api.post<Estoque>('/estoque', estoque);
    return response;
  },

  atualizar: async (id: number, estoque: Partial<Estoque>) => {
    const response = await api.put<Estoque>(`/estoque/${id}`, estoque);
    return response;
  },

  deletar: async (id: number) => {
    const response = await api.delete(`/estoque/${id}`);
    return response;
  },

  buscarPorVeiculo: async (veiculoId: number) => {
    const response = await api.get<Estoque[]>(`/estoque?veiculoId=${veiculoId}`);
    return response;
  }
};
