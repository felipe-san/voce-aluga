import api from './api';

export interface DashboardStats {
  totalVeiculos: number;
  veiculosDisponiveis: number;
  veiculosAlugados: number;
  veiculosManutencao: number;
  totalClientes: number;
  contratosAtivos: number;
  receitaMensal: number;
  crescimentoMensal: number;
}

export interface RecentActivity {
  id: number;
  action: string;
  cliente: string;
  veiculo: string;
  time: string;
}

export interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success';
  message: string;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get('/api/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw error;
    }
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      const response = await api.get('/api/dashboard/recent-activity');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar atividades recentes:', error);
      return [];
    }
  },

  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await api.get('/api/dashboard/alerts');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      return [];
    }
  }
};
