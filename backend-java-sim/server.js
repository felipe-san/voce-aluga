const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Simulação de banco MySQL - em memória
let usuarios = [
  { id: 1, email: 'admin@vocealuga.com', senha: 'admin123', nome: 'Administrador', tipo: 'admin', endereco: 'Sede da empresa' },
  { id: 2, email: 'cliente@teste.com', senha: '123456', nome: 'João Silva', tipo: 'cliente', endereco: 'Rua das Flores, 123' }
];

let veiculos = [
  { id: 1, modelo: 'Civic', marca: 'Honda', ano: 2022, placa: 'ABC-1234', cor: 'Prata', categoria: 'Sedan', status: 'disponivel', preco_diario: 150, km_atual: 15000 },
  { id: 2, modelo: 'Corolla', marca: 'Toyota', ano: 2023, placa: 'DEF-5678', cor: 'Branco', categoria: 'Sedan', status: 'disponivel', preco_diario: 140, km_atual: 8000 },
  { id: 3, modelo: 'Ka', marca: 'Ford', ano: 2021, placa: 'GHI-9012', cor: 'Azul', categoria: 'Hatch', status: 'disponivel', preco_diario: 80, km_atual: 25000 }
];

let clientes = [
  { id: 1, nome: 'João Silva', email: 'cliente@teste.com', telefone: '(11) 99999-9999', cpf: '123.456.789-00' },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888', cpf: '987.654.321-00' }
];

// === ENDPOINTS DE AUTENTICAÇÃO ===
app.post('/auth/login', (req, res) => {
  console.log('🔐 POST /auth/login - Tentativa de login Java-style');
  const { email, password } = req.body;
  
  const usuario = usuarios.find(u => u.email === email && u.senha === password);
  
  if (usuario) {
    const response = {
      user: {
        id: usuario.id,
        email: usuario.email,
        name: usuario.nome,
        role: usuario.tipo
      },
      token: 'fake-jwt-token'
    };
    
    console.log(`✅ Login bem-sucedido para: ${usuario.nome} (${usuario.tipo})`);
    res.json(response);
  } else {
    console.log(`❌ Credenciais inválidas para: ${email}`);
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.get('/auth/me', (req, res) => {
  res.json({ message: 'Endpoint para verificar usuário logado' });
});

app.get('/auth/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'VOCÊ ALUGA - Backend Java Simulado está rodando!',
    database: 'MySQL (simulado)',
    port: 8081
  });
});

// === ENDPOINTS DE VEÍCULOS ===
app.get('/veiculos', (req, res) => {
  console.log('🚗 GET /veiculos');
  res.json(veiculos);
});

app.post('/veiculos', (req, res) => {
  console.log('🚗 POST /veiculos');
  const novoVeiculo = {
    id: veiculos.length + 1,
    ...req.body
  };
  veiculos.push(novoVeiculo);
  res.status(201).json(novoVeiculo);
});

app.put('/veiculos/:id', (req, res) => {
  console.log(`🚗 PUT /veiculos/${req.params.id}`);
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);
  
  if (index !== -1) {
    veiculos[index] = { ...veiculos[index], ...req.body };
    res.json(veiculos[index]);
  } else {
    res.status(404).json({ message: 'Veículo não encontrado' });
  }
});

app.delete('/veiculos/:id', (req, res) => {
  console.log(`🚗 DELETE /veiculos/${req.params.id}`);
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);
  
  if (index !== -1) {
    veiculos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Veículo não encontrado' });
  }
});

// === ENDPOINTS DE CLIENTES ===
app.get('/clientes', (req, res) => {
  console.log('👥 GET /clientes');
  res.json(clientes);
});

app.post('/clientes', (req, res) => {
  console.log('👥 POST /clientes');
  const novoCliente = {
    id: clientes.length + 1,
    ...req.body
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.put('/clientes/:id', (req, res) => {
  console.log(`👥 PUT /clientes/${req.params.id}`);
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});

app.delete('/clientes/:id', (req, res) => {
  console.log(`👥 DELETE /clientes/${req.params.id}`);
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  
  if (index !== -1) {
    clientes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 ===============================================');
  console.log('🚗 VOCÊ ALUGA - Backend Java Simulado');
  console.log('🚀 ===============================================');
  console.log(`📡 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}/auth/status`);
  console.log('📋 Endpoints disponíveis:');
  console.log('   POST   /auth/login (autenticação)');
  console.log('   GET    /auth/me (usuário logado)');
  console.log('   GET    /auth/status (status do servidor)');
  console.log('   GET    /veiculos');
  console.log('   POST   /veiculos');
  console.log('   PUT    /veiculos/:id');
  console.log('   DELETE /veiculos/:id');
  console.log('   GET    /clientes');
  console.log('   POST   /clientes');
  console.log('   PUT    /clientes/:id');
  console.log('   DELETE /clientes/:id');
  console.log('🚀 ===============================================');
  console.log('👤 Usuários de teste:');
  console.log('   Admin: admin@vocealuga.com / admin123');
  console.log('   Cliente: cliente@teste.com / 123456');
  console.log('🚀 ===============================================');
  console.log('💾 Dados simulando backend Java + MySQL');
  console.log('🚀 ===============================================');
});
