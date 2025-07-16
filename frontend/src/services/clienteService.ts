import api from './api';
import { Cliente } from '../types';

export const clienteService = {
  listarTodos: () => api.get<Cliente[]>('/clientes'),
  
  buscarPorId: (id: number) => api.get<Cliente>(`/clientes/${id}`),
  
  criar: (cliente: Omit<Cliente, 'id'>) => api.post<Cliente>('/clientes', cliente),
  
  atualizar: (id: number, cliente: Partial<Cliente>) => 
    api.put<Cliente>(`/clientes/${id}`, cliente),
  
  deletar: (id: number) => api.delete(`/clientes/${id}`),
};
