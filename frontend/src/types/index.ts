export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface Cliente extends Usuario {
  documento: string;
  fidelidade: string;
  listaSuja: boolean;
  cpf: string;
  cnh: string;
}

export interface Contrato {
  id?: number;
  clienteId: number;
  veiculoId: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  status: string;
  desconto?: number;
}

export interface Veiculo {
  id?: number;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
  disponivel: boolean;
  valorDiaria: number;
  categoria: string;
}

export interface Administrador extends Usuario {
  cargo: string;
  nivel: string;
}

export interface Estoque {
  id?: number;
  veiculoId: number;
  quantidade: number;
  localizacao: string;
}

export interface Devolucao {
  id?: number;
  contratoId: number;
  dataDevolucao: string;
  condicaoVeiculo: string;
  taxasAdicionais?: number;
  observacoes?: string;
}

export interface Auditoria {
  id?: number;
  acao: string;
  usuario: string;
  dataHora: string;
  detalhes: string;
}
