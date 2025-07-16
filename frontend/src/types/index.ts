export interface Usuario {
  id?: number;
  nome: string;
  email: string;
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
  status?: string | null;
  desconto?: number;
}

export interface Veiculo {
  id?: number;
  modelo: string;
  marca: string;
  ano: string; // Pode ser Date no backend, mas vamos usar string para simplicidade
  placa: string;
  cor: string;
  quilometragem?: number;
  capacidadeTanque?: number;
  consumoMedio?: number;
  dataProximaManutencao?: string;
  historicoManutencao?: string;
  status?: string;
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
