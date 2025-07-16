import api from './api';
import { Estoque } from '../types';

export const estoqueService = {
  listarTodos: () => api.get<Estoque[]>('/estoque'),
  
  buscarPorId: (id: number) => api.get<Estoque>(`/estoque/${id}`),
  
  criar: (estoque: Omit<Estoque, 'id'>) => api.post<Estoque>('/estoque', estoque),
  
  atualizar: (id: number, estoque: Partial<Estoque>) => 
    api.put<Estoque>(`/estoque/${id}`, estoque),
  
  deletar: (id: number) => api.delete(`/estoque/${id}`),
};
