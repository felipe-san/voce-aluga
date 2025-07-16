import api from './api';
import { Contrato } from '../types';

export const contratoService = {
  listarTodos: () => api.get<Contrato[]>('/contratos'),
  
  buscarPorId: (id: number) => api.get<Contrato>(`/contratos/${id}`),
  
  criar: (contrato: Omit<Contrato, 'id'>) => api.post<Contrato>('/contratos', contrato),
  
  atualizar: (id: number, contrato: Partial<Contrato>) => 
    api.put<Contrato>(`/contratos/${id}`, contrato),
  
  deletar: (id: number) => api.delete(`/contratos/${id}`),
  
  gerar: (id: number) => api.get<string>(`/contratos/${id}/gerar`),
  
  encerrar: (id: number) => api.post(`/contratos/${id}/encerrar`),
  
  aplicarDesconto: (id: number, valor: number) => 
    api.post<number>(`/contratos/${id}/desconto?valor=${valor}`),
};
