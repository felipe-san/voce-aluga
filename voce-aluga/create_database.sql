-- Criar banco e usar
CREATE DATABASE IF NOT EXISTS voce_aluga;
USE voce_aluga;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    endereco VARCHAR(255)
);

-- Tabela de veículos
CREATE TABLE IF NOT EXISTS veiculo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    placa VARCHAR(20) UNIQUE NOT NULL,
    cor VARCHAR(100),
    categoria VARCHAR(100),
    status VARCHAR(50) DEFAULT 'disponivel',
    preco_diario DECIMAL(10,2),
    km_atual INT DEFAULT 0
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(20) UNIQUE
);

-- Inserir dados iniciais
INSERT IGNORE INTO usuario (nome, email, senha, tipo, endereco) VALUES 
('Administrador', 'admin@vocealuga.com', 'admin123', 'admin', 'Sede da empresa'),
('João Silva', 'cliente@teste.com', '123456', 'cliente', 'Rua das Flores, 123'),
('Maria Santos', 'maria@email.com', '123456', 'cliente', 'Av. Principal, 456');

INSERT IGNORE INTO veiculo (modelo, marca, ano, placa, cor, categoria, status, preco_diario, km_atual) VALUES
('Civic', 'Honda', 2022, 'ABC-1234', 'Prata', 'Sedan', 'disponivel', 150.00, 15000),
('Corolla', 'Toyota', 2023, 'DEF-5678', 'Branco', 'Sedan', 'disponivel', 140.00, 8000),
('Ka', 'Ford', 2021, 'GHI-9012', 'Azul', 'Hatch', 'disponivel', 80.00, 25000),
('HB20', 'Hyundai', 2022, 'JKL-3456', 'Vermelho', 'Hatch', 'disponivel', 90.00, 12000);

INSERT IGNORE INTO cliente (nome, email, telefone, cpf) VALUES
('João Silva', 'cliente@teste.com', '(11) 99999-9999', '123.456.789-00'),
('Maria Santos', 'maria@email.com', '(11) 88888-8888', '987.654.321-00'),
('Pedro Costa', 'pedro@email.com', '(11) 77777-7777', '456.789.123-00');

SELECT 'Banco de dados criado e populado com sucesso!' as status;
