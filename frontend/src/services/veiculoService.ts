import api from './api';
import { Veiculo } from '../types';

export const veiculoService = {
  listarTodos: async () => {
    const response = await api.get<Veiculo[]>('/veiculos');
    return response;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Veiculo>(`/veiculos/${id}`);
    return response;
  },

  criar: async (veiculo: Omit<Veiculo, 'id'>) => {
    const response = await api.post<Veiculo>('/veiculos', veiculo);
    return response;
  },

  atualizar: async (id: number, veiculo: Partial<Veiculo>) => {
    const response = await api.put<Veiculo>(`/veiculos/${id}`, veiculo);
    return response;
  },

  deletar: async (id: number) => {
    const response = await api.delete(`/veiculos/${id}`);
    return response;
  },

  listarDisponiveis: async () => {
    const response = await api.get<Veiculo[]>('/veiculos?disponivel=true');
    return response;
  }
};
