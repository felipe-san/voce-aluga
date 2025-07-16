-- BANCO DE DADOS COMPLETO VOCE ALUGA
-- Criação do banco e estrutura completa

CREATE DATABASE IF NOT EXISTS voce_aluga;
USE voce_aluga;

-- TABELA SISTEMA
CREATE TABLE SISTEMA (
   id INT PRIMARY KEY AUTO_INCREMENT,
   dataOperacao DATETIME
);

-- TABELA FIDELIDADE
CREATE TABLE FIDELIDADE (
   id INT PRIMARY KEY AUTO_INCREMENT,
   fidelidade VARCHAR(50),
   quantidadePontos INT
);

-- TABELA USUARIO
CREATE TABLE USUARIO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   cpf VARCHAR(14) UNIQUE,
   telefone VARCHAR(20),
   CNH VARCHAR(20),
   email VARCHAR(100),
   nome VARCHAR(100),
   senha VARCHAR(255),
   tipo VARCHAR(50)
);

-- TABELA ADMINISTRADOR
CREATE TABLE ADMINISTRADOR (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(100),
   email VARCHAR(100),
   telefone VARCHAR(20)
);

-- TABELA CLIENTE
CREATE TABLE CLIENTE (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(100),
   email VARCHAR(100),
   telefone VARCHAR(20),
   CNH VARCHAR(20),
   cpf VARCHAR(14),
   fidelidadeId INT,
   FOREIGN KEY (fidelidadeId) REFERENCES FIDELIDADE(id)
);

-- TABELA LISTA_SUJA
CREATE TABLE LISTA_SUJA (
   id INT PRIMARY KEY AUTO_INCREMENT,
   clienteId INT,
   motivo TEXT,
   dataInclusao DATE,
   dataExclusao DATE,
   FOREIGN KEY (clienteId) REFERENCES CLIENTE(id)
);

-- TABELA CONTRATO
CREATE TABLE CONTRATO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   dataAssinatura DATE,
   termos TEXT,
   status VARCHAR(20),
   sistemaId INT,
   FOREIGN KEY (sistemaId) REFERENCES SISTEMA(id)
);

-- TABELA AUDITORIA
CREATE TABLE AUDITORIA (
   id INT PRIMARY KEY AUTO_INCREMENT,
   sistemaId INT,
   dataHora DATETIME,
   usuario VARCHAR(100),
   FOREIGN KEY (sistemaId) REFERENCES SISTEMA(id)
);

-- TABELA NOTIFICACAO
CREATE TABLE NOTIFICACAO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   sistemaId INT,
   tipoNotificacao VARCHAR(50),
   prioridade VARCHAR(50),
   mensagem TEXT,
   dataEnvio DATETIME,
   status VARCHAR(20),
   FOREIGN KEY (sistemaId) REFERENCES SISTEMA(id)
);

-- TABELA PAGAMENTO
CREATE TABLE PAGAMENTO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   usuarioId INT,
   opcao VARCHAR(20),
   FOREIGN KEY (usuarioId) REFERENCES USUARIO(id)
);

-- TABELA PAGAMENTO_DINHEIRO
CREATE TABLE PAGAMENTO_DINHEIRO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   valorRecebido DECIMAL(10,2),
   troco DECIMAL(10,2),
   pagamentoId INT,
   FOREIGN KEY (pagamentoId) REFERENCES PAGAMENTO(id)
);

-- TABELA PAGAMENTO_CARTAO
CREATE TABLE PAGAMENTO_CARTAO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   numCartao VARCHAR(20),
   titular VARCHAR(100),
   bandeira VARCHAR(50),
   cvv VARCHAR(4),
   validade DATE,
   parcelas INT,
   pagamentoId INT,
   FOREIGN KEY (pagamentoId) REFERENCES PAGAMENTO(id)
);

-- TABELA PAGAMENTO_PIX
CREATE TABLE PAGAMENTO_PIX (
   id INT PRIMARY KEY AUTO_INCREMENT,
   chavePix VARCHAR(100),
   pagamentoId INT,
   FOREIGN KEY (pagamentoId) REFERENCES PAGAMENTO(id)
);

-- TABELA FILIAL
CREATE TABLE FILIAL (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(100),
   telefone VARCHAR(20),
   email VARCHAR(100)
);

-- TABELA MATRIZ
CREATE TABLE MATRIZ (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(100),
   endereco TEXT,
   telefone VARCHAR(20),
   email VARCHAR(100),
   funcionarios TEXT,
   capacidadeEstoque INT,
   filialId INT,
   FOREIGN KEY (filialId) REFERENCES FILIAL(id)
);

-- TABELA SEGURO
CREATE TABLE SEGURO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   tipoSeguro VARCHAR(50),
   valor DECIMAL(10,2),
   descricao TEXT,
   cobertura TEXT
);

-- TABELA TARIFA
CREATE TABLE TARIFA (
   id INT PRIMARY KEY AUTO_INCREMENT,
   tipoTarifa VARCHAR(50),
   valor DECIMAL(10,2),
   descricao TEXT
);

-- TABELA RESERVA
CREATE TABLE RESERVA (
   id INT PRIMARY KEY AUTO_INCREMENT,
   dataInicio DATE,
   dataFim DATE,
   filialRetiradaId INT,
   filialDevolucaoId INT,
   valorTotal DECIMAL(10,2),
   desconto DECIMAL(10,2),
   status VARCHAR(20),
   seguroId INT,
   tarifaId INT,
   idCliente INT,
   FOREIGN KEY (idCliente) REFERENCES CLIENTE(id),
   FOREIGN KEY (filialRetiradaId) REFERENCES FILIAL(id),
   FOREIGN KEY (filialDevolucaoId) REFERENCES FILIAL(id),
   FOREIGN KEY (seguroId) REFERENCES SEGURO(id),
   FOREIGN KEY (tarifaId) REFERENCES TARIFA(id)
);

-- TABELA GRUPO_VEICULOS
CREATE TABLE GRUPO_VEICULOS (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nomeGrupo VARCHAR(100),
   tarifaBase DECIMAL(10,2)
);

-- TABELA VEICULO
CREATE TABLE VEICULO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   modelo VARCHAR(100),
   marca VARCHAR(100),
   placa VARCHAR(20),
   ano INT,
   cor VARCHAR(50),
   categoria VARCHAR(50),
   status VARCHAR(20),
   quilometragem DECIMAL(10,2),
   capacidadeTanque DECIMAL(10,2),
   dataProximaManutencao DATE,
   consumoMedio DECIMAL(10,2),
   preco_diario DECIMAL(10,2),
   km_atual INT,
   grupoVeiculo INT,
   filialId INT,
   FOREIGN KEY (grupoVeiculo) REFERENCES GRUPO_VEICULOS(id),
   FOREIGN KEY (filialId) REFERENCES FILIAL(id)
);

-- TABELA DEVOLUCAO
CREATE TABLE DEVOLUCAO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   reservaId INT,
   veiculoId INT,
   status VARCHAR(20),
   avarias TEXT,
   anotacoes TEXT,
   filialDevolucaoId INT,
   FOREIGN KEY (reservaId) REFERENCES RESERVA(id),
   FOREIGN KEY (veiculoId) REFERENCES VEICULO(id)
);

-- TABELA MANUTENCAO
CREATE TABLE MANUTENCAO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   veiculoId INT,
   anotacoes TEXT,
   dataInicio DATE,
   dataFim DATE,
   status VARCHAR(20),
   tipoManutencao VARCHAR(100),
   filialId INT,
   FOREIGN KEY (veiculoId) REFERENCES VEICULO(id),
   FOREIGN KEY (filialId) REFERENCES FILIAL(id)
);

-- TABELA OPERADOR
CREATE TABLE OPERADOR (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nome VARCHAR(100),
   email VARCHAR(100),
   telefone VARCHAR(20),
   funcao VARCHAR(50),
   idFilial INT,
   FOREIGN KEY (idFilial) REFERENCES FILIAL(id)
);

-- TABELA TRANSFERENCIA_VEICULO
CREATE TABLE TRANSFERENCIA_VEICULO (
   id INT PRIMARY KEY AUTO_INCREMENT,
   veiculoId INT,
   status VARCHAR(20),
   filialOrigemId INT,
   filialDestinoId INT,
   inicioTransferencia DATE,
   finalTransferencia DATE,
   anotacoes TEXT,
   FOREIGN KEY (veiculoId) REFERENCES VEICULO(id),
   FOREIGN KEY (filialOrigemId) REFERENCES FILIAL(id),
   FOREIGN KEY (filialDestinoId) REFERENCES FILIAL(id)
);

-- INSERÇÃO DE DADOS INICIAIS

-- Inserir dados no sistema
INSERT INTO SISTEMA (dataOperacao) VALUES (NOW());

-- Inserir tipos de fidelidade
INSERT INTO FIDELIDADE (fidelidade, quantidadePontos) VALUES
('Bronze', 0),
('Prata', 1000),
('Ouro', 5000),
('Platinum', 10000);

-- Inserir filiais
INSERT INTO FILIAL (nome, telefone, email) VALUES
('Filial Centro', '(11) 3000-1000', 'centro@vocealuga.com'),
('Filial Zona Sul', '(11) 3000-2000', 'zonasul@vocealuga.com'),
('Filial Zona Norte', '(11) 3000-3000', 'zonanorte@vocealuga.com');

-- Inserir grupos de veículos
INSERT INTO GRUPO_VEICULOS (nomeGrupo, tarifaBase) VALUES
('Econômico', 80.00),
('Intermediário', 120.00),
('Executivo', 180.00),
('Luxo', 300.00),
('SUV', 250.00);

-- Inserir usuários
INSERT INTO USUARIO (cpf, telefone, CNH, email, nome, senha, tipo) VALUES
('123.456.789-00', '(11) 99999-9999', '12345678901', 'admin@vocealuga.com', 'Administrador', 'admin123', 'admin'),
('987.654.321-00', '(11) 88888-8888', '10987654321', 'cliente@teste.com', 'João Silva', '123456', 'cliente'),
('456.789.123-00', '(11) 77777-7777', '45678912345', 'maria@email.com', 'Maria Santos', '123456', 'cliente');

-- Inserir clientes
INSERT INTO CLIENTE (nome, email, telefone, CNH, cpf, fidelidadeId) VALUES
('João Silva', 'cliente@teste.com', '(11) 99999-9999', '12345678901', '987.654.321-00', 1),
('Maria Santos', 'maria@email.com', '(11) 88888-8888', '10987654321', '456.789.123-00', 2),
('Pedro Costa', 'pedro@email.com', '(11) 77777-7777', '45678912345', '321.654.987-00', 1);

-- Inserir administradores
INSERT INTO ADMINISTRADOR (nome, email, telefone) VALUES
('Administrador Sistema', 'admin@vocealuga.com', '(11) 3000-0000'),
('Gerente Operacional', 'gerente@vocealuga.com', '(11) 3000-0001');

-- Inserir veículos
INSERT INTO VEICULO (modelo, marca, placa, ano, cor, categoria, status, quilometragem, preco_diario, km_atual, grupoVeiculo, filialId) VALUES
('Civic', 'Honda', 'ABC-1234', 2022, 'Prata', 'Sedan', 'disponivel', 15000, 150.00, 15000, 3, 1),
('Corolla', 'Toyota', 'DEF-5678', 2023, 'Branco', 'Sedan', 'disponivel', 8000, 140.00, 8000, 3, 1),
('Ka', 'Ford', 'GHI-9012', 2021, 'Azul', 'Hatch', 'disponivel', 25000, 80.00, 25000, 1, 2),
('HB20', 'Hyundai', 'JKL-3456', 2022, 'Vermelho', 'Hatch', 'disponivel', 12000, 90.00, 12000, 1, 2),
('Compass', 'Jeep', 'MNO-7890', 2023, 'Preto', 'SUV', 'disponivel', 5000, 250.00, 5000, 5, 3);

-- Inserir seguros
INSERT INTO SEGURO (tipoSeguro, valor, descricao, cobertura) VALUES
('Básico', 15.00, 'Cobertura básica contra terceiros', 'Danos a terceiros'),
('Intermediário', 25.00, 'Cobertura intermediária', 'Danos a terceiros e próprios parcial'),
('Completo', 35.00, 'Cobertura completa', 'Danos a terceiros e próprios total'),
('Premium', 50.00, 'Cobertura premium com assistência 24h', 'Cobertura total + assistência');

-- Inserir tarifas
INSERT INTO TARIFA (tipoTarifa, valor, descricao) VALUES
('Diária', 0.00, 'Tarifa padrão diária'),
('Semanal', -10.00, 'Desconto para locação semanal'),
('Mensal', -20.00, 'Desconto para locação mensal'),
('Feriado', 15.00, 'Acréscimo para feriados'),
('Fim de semana', 10.00, 'Acréscimo para fins de semana');

-- Inserir operadores
INSERT INTO OPERADOR (nome, email, telefone, funcao, idFilial) VALUES
('Carlos Silva', 'carlos@vocealuga.com', '(11) 98000-1000', 'Atendente', 1),
('Ana Costa', 'ana@vocealuga.com', '(11) 98000-2000', 'Supervisor', 1),
('Roberto Santos', 'roberto@vocealuga.com', '(11) 98000-3000', 'Atendente', 2),
('Lucia Oliveira', 'lucia@vocealuga.com', '(11) 98000-4000', 'Gerente', 3);

SELECT 'Banco de dados completo criado e populado com sucesso!' as status;
