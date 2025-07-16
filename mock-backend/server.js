const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Dados simulados
let clientes = [
  { id: 1, nome: 'João Silva', email: 'cliente@teste.com', telefone: '(11) 99999-9999', cpf: '123.456.789-00' },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888', cpf: '987.654.321-00' },
  { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', telefone: '(11) 77777-7777', cpf: '456.789.123-00' }
];

let veiculos = [
  { id: 1, modelo: 'Civic', marca: 'Honda', ano: 2022, placa: 'ABC-1234', cor: 'Prata', categoria: 'Sedan', status: 'disponivel', preco_diario: 150, km_atual: 15000 },
  { id: 2, modelo: 'Corolla', marca: 'Toyota', ano: 2023, placa: 'DEF-5678', cor: 'Branco', categoria: 'Sedan', status: 'alugado', preco_diario: 140, km_atual: 8000 },
  { id: 3, modelo: 'Ka', marca: 'Ford', ano: 2021, placa: 'GHI-9012', cor: 'Azul', categoria: 'Hatch', status: 'manutencao', preco_diario: 80, km_atual: 25000 },
  { id: 4, modelo: 'HB20', marca: 'Hyundai', ano: 2022, placa: 'JKL-3456', cor: 'Vermelho', categoria: 'Hatch', status: 'disponivel', preco_diario: 90, km_atual: 12000 }
];

let contratos = [
  { id: 1, cliente_id: 1, veiculo_id: 2, data_inicio: '2024-07-10', data_fim: '2024-07-15', valor_total: 700, status: 'ativo' },
  { id: 2, cliente_id: 2, veiculo_id: 1, data_inicio: '2024-06-15', data_fim: '2024-06-20', valor_total: 750, status: 'concluido' }
];

let estoque = [
  { id: 1, item: 'Pneu Aro 15', quantidade: 20, preco_unitario: 250 },
  { id: 2, item: 'Óleo Motor 5W30', quantidade: 15, preco_unitario: 45 },
  { id: 3, item: 'Filtro de Ar', quantidade: 30, preco_unitario: 25 }
];

// Usuarios para autenticação
const usuarios = [
  { id: 1, email: 'admin@vocealuga.com', password: 'admin123', name: 'Administrador', role: 'admin' },
  { id: 2, email: 'cliente@teste.com', password: '123456', name: 'João Silva', role: 'cliente' }
];

// Routes de autenticação
app.post('/auth/login', (req, res) => {
  console.log('🔐 POST /auth/login - Tentativa de login');
  const { email, password } = req.body;
  
  const user = usuarios.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    console.log(`✅ Login bem-sucedido para: ${user.name} (${user.role})`);
    res.json({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token'
    });
  } else {
    console.log(`❌ Login falhou para: ${email}`);
    res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }
});

app.get('/auth/me', (req, res) => {
  console.log('🔐 GET /auth/me - Verificação de usuário logado');
  // Simulação - em produção verificaria o token JWT
  const user = usuarios[0]; // Mock user
  const { password, ...userWithoutPassword } = user;
  res.json({
    success: true,
    user: userWithoutPassword
  });
});

// Status endpoint
app.get('/status', (req, res) => {
  console.log('📋 GET /status - Verificação de status do servidor');
  res.json({ 
    status: 'online', 
    message: 'VOCÊ ALUGA - Mock Backend Server está rodando!',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /auth/login',
      'GET /auth/me',
      'GET /clientes',
      'POST /clientes',
      'PUT /clientes/:id',
      'DELETE /clientes/:id',
      'GET /veiculos',
      'POST /veiculos',
      'PUT /veiculos/:id',
      'DELETE /veiculos/:id',
      'GET /contratos',
      'POST /contratos',
      'PUT /contratos/:id',
      'DELETE /contratos/:id',
      'GET /estoque',
      'POST /estoque',
      'PUT /estoque/:id',
      'DELETE /estoque/:id'
    ]
  });
});

// CRUD Clientes
app.get('/clientes', (req, res) => {
  console.log('📋 GET /clientes - Listando todos os clientes');
  res.json(clientes);
});

app.post('/clientes', (req, res) => {
  console.log('📋 POST /clientes - Criando novo cliente');
  const novoCliente = { id: Date.now(), ...req.body };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.put('/clientes/:id', (req, res) => {
  console.log(`📋 PUT /clientes/${req.params.id} - Atualizando cliente`);
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

app.delete('/clientes/:id', (req, res) => {
  console.log(`📋 DELETE /clientes/${req.params.id} - Removendo cliente`);
  const id = parseInt(req.params.id);
  clientes = clientes.filter(c => c.id !== id);
  res.status(204).send();
});

// CRUD Veículos
app.get('/veiculos', (req, res) => {
  console.log('🚗 GET /veiculos - Listando todos os veículos');
  res.json(veiculos);
});

app.post('/veiculos', (req, res) => {
  console.log('🚗 POST /veiculos - Criando novo veículo');
  const novoVeiculo = { id: Date.now(), ...req.body };
  veiculos.push(novoVeiculo);
  res.status(201).json(novoVeiculo);
});

app.put('/veiculos/:id', (req, res) => {
  console.log(`🚗 PUT /veiculos/${req.params.id} - Atualizando veículo`);
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);
  if (index !== -1) {
    veiculos[index] = { ...veiculos[index], ...req.body };
    res.json(veiculos[index]);
  } else {
    res.status(404).json({ error: 'Veículo não encontrado' });
  }
});

app.delete('/veiculos/:id', (req, res) => {
  console.log(`🚗 DELETE /veiculos/${req.params.id} - Removendo veículo`);
  const id = parseInt(req.params.id);
  veiculos = veiculos.filter(v => v.id !== id);
  res.status(204).send();
});

// CRUD Contratos
app.get('/contratos', (req, res) => {
  console.log('📄 GET /contratos - Listando todos os contratos');
  const contratosCompletos = contratos.map(contrato => {
    const cliente = clientes.find(c => c.id === contrato.cliente_id);
    const veiculo = veiculos.find(v => v.id === contrato.veiculo_id);
    return { ...contrato, cliente, veiculo };
  });
  res.json(contratosCompletos);
});

app.post('/contratos', (req, res) => {
  console.log('📄 POST /contratos - Criando novo contrato');
  const novoContrato = { id: Date.now(), ...req.body };
  contratos.push(novoContrato);
  res.status(201).json(novoContrato);
});

app.put('/contratos/:id', (req, res) => {
  console.log(`📄 PUT /contratos/${req.params.id} - Atualizando contrato`);
  const id = parseInt(req.params.id);
  const index = contratos.findIndex(c => c.id === id);
  if (index !== -1) {
    contratos[index] = { ...contratos[index], ...req.body };
    res.json(contratos[index]);
  } else {
    res.status(404).json({ error: 'Contrato não encontrado' });
  }
});

app.delete('/contratos/:id', (req, res) => {
  console.log(`📄 DELETE /contratos/${req.params.id} - Removendo contrato`);
  const id = parseInt(req.params.id);
  contratos = contratos.filter(c => c.id !== id);
  res.status(204).send();
});

// CRUD Estoque
app.get('/estoque', (req, res) => {
  console.log('📦 GET /estoque - Listando todo o estoque');
  res.json(estoque);
});

app.post('/estoque', (req, res) => {
  console.log('📦 POST /estoque - Criando novo item de estoque');
  const novoItem = { id: Date.now(), ...req.body };
  estoque.push(novoItem);
  res.status(201).json(novoItem);
});

app.put('/estoque/:id', (req, res) => {
  console.log(`📦 PUT /estoque/${req.params.id} - Atualizando item de estoque`);
  const id = parseInt(req.params.id);
  const index = estoque.findIndex(e => e.id === id);
  if (index !== -1) {
    estoque[index] = { ...estoque[index], ...req.body };
    res.json(estoque[index]);
  } else {
    res.status(404).json({ error: 'Item de estoque não encontrado' });
  }
});

app.delete('/estoque/:id', (req, res) => {
  console.log(`📦 DELETE /estoque/${req.params.id} - Removendo item de estoque`);
  const id = parseInt(req.params.id);
  estoque = estoque.filter(e => e.id !== id);
  res.status(204).send();
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log('🚀 ===============================================');
  console.log('🚗 VOCÊ ALUGA - Mock Backend Server');
  console.log('🚀 ===============================================');
  console.log(`📡 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}/status`);
  console.log('📋 Endpoints disponíveis:');
  console.log('   POST   /auth/login (autenticação)');
  console.log('   GET    /auth/me (usuário logado)');
  console.log('   GET    /clientes');
  console.log('   POST   /clientes');
  console.log('   PUT    /clientes/:id');
  console.log('   DELETE /clientes/:id');
  console.log('   GET    /veiculos');
  console.log('   POST   /veiculos');
  console.log('   PUT    /veiculos/:id');
  console.log('   DELETE /veiculos/:id');
  console.log('   GET    /contratos');
  console.log('   POST   /contratos');
  console.log('   PUT    /contratos/:id');
  console.log('   DELETE /contratos/:id');
  console.log('   GET    /estoque');
  console.log('   POST   /estoque');
  console.log('   PUT    /estoque/:id');
  console.log('   DELETE /estoque/:id');
  console.log('🚀 ===============================================');
  console.log('👤 Usuários de teste:');
  console.log('   Admin: admin@vocealuga.com / admin123');
  console.log('   Cliente: cliente@teste.com / 123456');
  console.log('🚀 ===============================================');
});
