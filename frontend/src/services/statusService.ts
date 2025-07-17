const API_BASE_URL = 'http://localhost:8081';

export interface StatusUpdate {
  id: number;
  status: 'ATIVO' | 'CONCLUIDO' | 'CANCELADO';
}

class StatusService {
  async atualizarStatusContrato(id: number, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contratos/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar status: ${response.statusText}`);
    }
  }

  async ativarContrato(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contratos/${id}/ativar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao ativar contrato: ${response.statusText}`);
    }
  }

  async concluirContrato(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contratos/${id}/concluir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao concluir contrato: ${response.statusText}`);
    }
  }

  async cancelarContrato(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contratos/${id}/cancelar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao cancelar contrato: ${response.statusText}`);
    }
  }

  // Método para inicializar contratos existentes com status padrão
  async inicializarStatusContratos(): Promise<void> {
    try {
      // Buscar todos os contratos
      const response = await fetch(`${API_BASE_URL}/contratos`);
      if (!response.ok) {
        throw new Error('Erro ao buscar contratos');
      }

      const contratos = await response.json();

      // Atualizar contratos sem status
      for (const contrato of contratos) {
        if (!contrato.status) {
          // Definir status baseado na data
          const dataFim = new Date(contrato.dataFim);
          const hoje = new Date();
          
          let novoStatus = 'ATIVO';
          if (dataFim < hoje) {
            novoStatus = 'CONCLUIDO';
          }

          await this.atualizarStatusContrato(contrato.id, novoStatus);
          console.log(`Contrato ${contrato.id} atualizado para status: ${novoStatus}`);
        }
      }
    } catch (error) {
      console.error('Erro ao inicializar status dos contratos:', error);
    }
  }
}

export default new StatusService();
