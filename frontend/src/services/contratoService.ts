import api from './api';
import { Contrato } from '../types';

export const contratoService = {
  listarTodos: async () => {
    try {
      const response = await api.get<Contrato[]>('/contratos');
      return response;
    } catch (error) {
      console.error('Erro ao listar contratos:', error);
      throw error;
    }
  },

  buscarPorId: async (id: number) => {
    try {
      const response = await api.get<Contrato>(`/contratos/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar contrato por ID:', error);
      throw error;
    }
  },

  criar: async (contrato: Omit<Contrato, 'id'>) => {
    try {
      const response = await api.post<Contrato>('/contratos', contrato);
      return response;
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      throw error;
    }
  },

  atualizar: async (id: number, contrato: Partial<Contrato>) => {
    try {
      const response = await api.put<Contrato>(`/contratos/${id}`, contrato);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      throw error;
    }
  },

  deletar: async (id: number) => {
    try {
      const response = await api.delete(`/contratos/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      throw error;
    }
  },

  buscarPorCliente: async (clienteId: number) => {
    try {
      const response = await api.get<Contrato[]>(`/contratos?clienteId=${clienteId}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar contratos por cliente:', error);
      throw error;
    }
  },

  buscarPorStatus: async (status: string) => {
    try {
      const response = await api.get<Contrato[]>(`/contratos?status=${status}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar contratos por status:', error);
      throw error;
    }
  }
};
