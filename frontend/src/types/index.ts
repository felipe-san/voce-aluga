export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  endereco: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  cnh: string;
  dataNascimento: string;
  dataCadastro: string;
  usuarioId?: number;
  status?: string;
}

export interface Contrato {
  id?: number;
  clienteId: number;
  veiculoId: number;
  dataInicio: string;
  dataFim: string;
  dataAssinatura?: string;
  valor: number;
  valorTotal: number;
  termos?: string;
  status: string;
  desconto?: number;
  formaPagamento?: string;
}

export interface Veiculo {
  id?: number;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
  status: string;
  quilometragem?: number;
  capacidadeTanque?: number;
  dataProximaManutencao?: string;
  consumoMedio?: number;
  grupoVeiculo?: number;
  filialId?: number;
  cor: string;
  categoria: string;
  preco_diario: number;
  km_atual?: number;
  disponivel: boolean;
  valorDiaria: number;
  localizacao?: string;
}

export interface Administrador {
  id?: number;
  nome: string;
  email: string;
  endereco: string;
  cargo: string;
  nivel: string;
}

export interface Estoque {
  id?: number;
  filialId: number;
  totalVeiculos: number;
  veiculoId: number;
  quantidade: number;
  localizacao: string;
  veiculosDisponiveis?: number[];
  veiculosManutencao?: number[];
  veiculosAlocados?: number[];
  veiculosAlugados?: number[];
}

export interface Devolucao {
  id?: number;
  veiculoId: number;
  reservaId: number;
  status: string;
  avarias: boolean;
  anotacoes?: string;
}

export interface Auditoria {
  id?: number;
  acao: string;
  usuario: string;
  dataHora: string;
  detalhes: string;
}
