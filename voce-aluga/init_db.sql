-- Script para criar e popular o banco de dados voce_aluga

-- Criar banco se não existir
CREATE DATABASE IF NOT EXISTS voce_aluga;
USE voce_aluga;

-- Inserir usuários de teste
INSERT INTO usuario (nome, email, senha, tipo, endereco) VALUES 
('Administrador', 'admin@vocealuga.com', 'admin123', 'admin', 'Sede da empresa'),
('João Silva', 'cliente@teste.com', '123456', 'cliente', 'Rua das Flores, 123'),
('Maria Santos', 'maria@email.com', '123456', 'cliente', 'Av. Principal, 456'),
('Pedro Costa', 'pedro@email.com', '123456', 'cliente', 'Rua do Comércio, 789')
ON DUPLICATE KEY UPDATE 
nome = VALUES(nome),
senha = VALUES(senha),
tipo = VALUES(tipo),
endereco = VALUES(endereco);

-- Inserir alguns veículos de exemplo
INSERT INTO veiculo (modelo, marca, ano, placa, cor, categoria, status, preco_diario, km_atual) VALUES
('Civic', 'Honda', 2022, 'ABC-1234', 'Prata', 'Sedan', 'disponivel', 150.00, 15000),
('Corolla', 'Toyota', 2023, 'DEF-5678', 'Branco', 'Sedan', 'disponivel', 140.00, 8000),
('Ka', 'Ford', 2021, 'GHI-9012', 'Azul', 'Hatch', 'disponivel', 80.00, 25000),
('HB20', 'Hyundai', 2022, 'JKL-3456', 'Vermelho', 'Hatch', 'disponivel', 90.00, 12000),
('Onix', 'Chevrolet', 2023, 'MNO-7890', 'Preto', 'Hatch', 'disponivel', 85.00, 5000)
ON DUPLICATE KEY UPDATE 
modelo = VALUES(modelo),
marca = VALUES(marca),
ano = VALUES(ano),
cor = VALUES(cor),
categoria = VALUES(categoria),
status = VALUES(status),
preco_diario = VALUES(preco_diario),
km_atual = VALUES(km_atual);

-- Inserir alguns itens de estoque
INSERT INTO estoque (item, quantidade, preco_unitario) VALUES
('Pneu Aro 15', 20, 250.00),
('Óleo Motor 5W30', 15, 45.00),
('Filtro de Ar', 30, 25.00),
('Pastilha de Freio', 25, 80.00),
('Bateria 60Ah', 10, 320.00)
ON DUPLICATE KEY UPDATE 
quantidade = VALUES(quantidade),
preco_unitario = VALUES(preco_unitario);

SELECT 'Dados inseridos com sucesso!' as status;
