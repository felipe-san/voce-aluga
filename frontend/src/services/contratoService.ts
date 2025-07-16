import api from './api';
import { Contrato } from '../types';

export const contratoService = {
  listarTodos: async () => {
    const response = await api.get<Contrato[]>('/contratos');
    return response;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Contrato>(`/contratos/${id}`);
    return response;
  },

  criar: async (contrato: Omit<Contrato, 'id'>) => {
    const response = await api.post<Contrato>('/contratos', contrato);
    return response;
  },

  atualizar: async (id: number, contrato: Partial<Contrato>) => {
    const response = await api.put<Contrato>(`/contratos/${id}`, contrato);
    return response;
  },

  deletar: async (id: number) => {
    const response = await api.delete(`/contratos/${id}`);
    return response;
  },

  buscarPorCliente: async (clienteId: number) => {
    const response = await api.get<Contrato[]>(`/contratos?clienteId=${clienteId}`);
    return response;
  },

  buscarPorStatus: async (status: string) => {
    const response = await api.get<Contrato[]>(`/contratos?status=${status}`);
    return response;
  }
};
