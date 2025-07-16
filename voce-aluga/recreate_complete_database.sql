-- Primeiro, excluir todas as tabelas existentes
DROP DATABASE IF EXISTS voce_aluga;

-- Recriar o banco de dados
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
   nome VARCHAR(100)
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
   id INT PRIMARY KEY,
   valorRecebido DECIMAL(10,2),
   troco DECIMAL(10,2),
   pagamentoId int,
   FOREIGN KEY (pagamentoId) REFERENCES PAGAMENTO(id)
);

-- TABELA PAGAMENTO_CARTAO
CREATE TABLE PAGAMENTO_CARTAO (
   id INT PRIMARY KEY,
   numCartao VARCHAR(20),
   titular VARCHAR(100),
   bandeira VARCHAR(50),
   cvv VARCHAR(4),
   validade DATE,
   parcelas INT,
   pagamentoId int,
   FOREIGN KEY (pagamentoId) REFERENCES PAGAMENTO(id)
);

-- TABELA PAGAMENTO_PIX
CREATE TABLE PAGAMENTO_PIX (
   id INT PRIMARY KEY,
   chavePix VARCHAR(100),
   pagamentoId int,
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
   placa VARCHAR(20),
   ano INT,
   status VARCHAR(20),
   quilometragem DECIMAL(10,2),
   capacidadeTanque DECIMAL(10,2),
   dataProximaManutencao DATE,
   consumoMedio DECIMAL(10,2),
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

-- Inserir dados iniciais para teste
INSERT INTO SISTEMA (dataOperacao) VALUES (NOW());

INSERT INTO FIDELIDADE (fidelidade, quantidadePontos) VALUES 
('Bronze', 100),
('Prata', 500),
('Ouro', 1000);

INSERT INTO USUARIO (cpf, telefone, CNH, email, nome) VALUES 
('123.456.789-00', '(11) 99999-9999', 'CNH123456', 'admin@vocealuga.com', 'Administrador'),
('987.654.321-00', '(11) 88888-8888', 'CNH654321', 'cliente@teste.com', 'João Silva'),
('456.789.123-00', '(11) 77777-7777', 'CNH789456', 'maria@email.com', 'Maria Santos');

INSERT INTO ADMINISTRADOR (nome, email, telefone) VALUES 
('Administrador', 'admin@vocealuga.com', '(11) 99999-9999');

INSERT INTO CLIENTE (nome, email, telefone, CNH, cpf, fidelidadeId) VALUES 
('João Silva', 'cliente@teste.com', '(11) 88888-8888', 'CNH654321', '987.654.321-00', 1),
('Maria Santos', 'maria@email.com', '(11) 77777-7777', 'CNH789456', '456.789.123-00', 2);

INSERT INTO FILIAL (nome, telefone, email) VALUES 
('Filial Centro', '(11) 1111-1111', 'centro@vocealuga.com'),
('Filial Zona Sul', '(11) 2222-2222', 'zonasul@vocealuga.com'),
('Filial Zona Norte', '(11) 3333-3333', 'zonanorte@vocealuga.com');

INSERT INTO GRUPO_VEICULOS (nomeGrupo, tarifaBase) VALUES 
('Econômico', 80.00),
('Intermediário', 120.00),
('Executivo', 180.00),
('Premium', 250.00);

INSERT INTO VEICULO (modelo, placa, ano, status, quilometragem, capacidadeTanque, dataProximaManutencao, consumoMedio, grupoVeiculo, filialId) VALUES 
('Ka', 'ABC-1234', 2021, 'disponivel', 25000.00, 55.00, '2025-08-15', 14.5, 1, 1),
('HB20', 'DEF-5678', 2022, 'disponivel', 12000.00, 50.00, '2025-09-10', 13.8, 1, 1),
('Civic', 'GHI-9012', 2022, 'disponivel', 15000.00, 60.00, '2025-08-20', 12.5, 2, 2),
('Corolla', 'JKL-3456', 2023, 'disponivel', 8000.00, 65.00, '2025-10-05', 11.8, 2, 2),
('Camaro', 'MNO-7890', 2023, 'disponivel', 5000.00, 70.00, '2025-09-15', 8.5, 4, 3);

INSERT INTO SEGURO (tipoSeguro, valor, descricao, cobertura) VALUES 
('Básico', 15.00, 'Seguro básico contra terceiros', 'Danos a terceiros'),
('Completo', 35.00, 'Seguro completo com cobertura total', 'Danos próprios e terceiros'),
('Premium', 50.00, 'Seguro premium com assistência 24h', 'Cobertura total + assistência');

INSERT INTO TARIFA (tipoTarifa, valor, descricao) VALUES 
('Diária Padrão', 0.00, 'Tarifa padrão incluída no grupo'),
('Taxa Aeroporto', 25.00, 'Taxa adicional para retirada/devolução no aeroporto'),
('Condutor Adicional', 20.00, 'Taxa por condutor adicional'),
('GPS', 15.00, 'Taxa diária por GPS');

SELECT 'Banco de dados recriado com sucesso! Todas as tabelas foram criadas.' as status;
