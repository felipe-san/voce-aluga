# Frontend - Você Aluga

Frontend web em React TypeScript para o sistema de gerenciamento de aluguel de carros "Você Aluga".

## 🚀 Tecnologias Utilizadas

- **React** 18.2 - Framework JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Biblioteca de componentes UI
- **React Router** - Roteamento
- **Axios** - Cliente HTTP para API
- **Dayjs** - Manipulação de datas

## 📦 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   └── Sidebar.tsx     # Menu lateral
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.tsx   # Painel principal
│   │   ├── Clientes.tsx    # Gestão de clientes
│   │   ├── Contratos.tsx   # Gestão de contratos
│   │   ├── Veiculos.tsx    # Gestão de veículos
│   │   └── Estoque.tsx     # Gestão de estoque
│   ├── services/           # Serviços de API
│   │   ├── api.ts          # Configuração do Axios
│   │   ├── clienteService.ts
│   │   ├── contratoService.ts
│   │   └── estoqueService.ts
│   ├── types/              # Definições TypeScript
│   │   └── index.ts        # Interfaces e tipos
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts          # Configuração do Vite
└── tsconfig.json           # Configuração do TypeScript
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
cd frontend
npm install
```

### Execução em Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em: `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

## 🔌 Configuração da API

O frontend está configurado para se comunicar com a API Java Spring Boot que roda na porta 8080.

### Proxy Configuration
O Vite está configurado para fazer proxy das requisições:
- Frontend: `http://localhost:3000`
- API Backend: `http://localhost:8080`
- Rotas da API: `/api/*` → `http://localhost:8080/*`

## 📱 Funcionalidades

### Dashboard
- Visão geral do sistema
- Estatísticas principais (clientes, veículos, contratos, receita)
- Cards informativos

### Gestão de Clientes
- Listagem de clientes
- Cadastro de novos clientes
- Edição de dados do cliente
- Remoção de clientes
- Visualização de status (Lista Suja/Regular)

### Gestão de Contratos
- Listagem de contratos
- Visualização de detalhes
- Status dos contratos (Ativo, Encerrado, Pendente)
- Ações específicas (gerar, encerrar, aplicar desconto)

### Gestão de Veículos
- Visualização em cards
- Status de disponibilidade
- Informações detalhadas (marca, modelo, ano, cor, categoria)
- Valor da diária

### Gestão de Estoque
- Controle de quantidade
- Localização dos veículos
- Associação com veículos

## 🎨 Interface

A interface utiliza Material-UI com:
- Design responsivo
- Tema customizado
- Navegação lateral
- Header fixo
- Tabelas e cards para visualização de dados
- Formulários modais para cadastro/edição

## 🔗 Integração com Backend

O frontend consome as seguintes APIs do backend Spring Boot:

### Clientes
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/{id}` - Buscar cliente por ID
- `POST /clientes` - Criar novo cliente
- `PUT /clientes/{id}` - Atualizar cliente
- `DELETE /clientes/{id}` - Deletar cliente

### Contratos
- `GET /contratos` - Listar todos os contratos
- `GET /contratos/{id}` - Buscar contrato por ID
- `POST /contratos` - Criar novo contrato
- `GET /contratos/{id}/gerar` - Gerar contrato
- `POST /contratos/{id}/encerrar` - Encerrar contrato
- `POST /contratos/{id}/desconto` - Aplicar desconto

### Estoque
- `GET /estoque` - Listar itens do estoque
- `POST /estoque` - Adicionar item ao estoque
- `PUT /estoque/{id}` - Atualizar item do estoque
- `DELETE /estoque/{id}` - Remover item do estoque

## 🚀 Próximos Passos

1. **Autenticação**: Implementar sistema de login/logout
2. **Validação**: Adicionar validação de formulários com Formik/Yup
3. **Testes**: Implementar testes unitários e de integração
4. **PWA**: Transformar em Progressive Web App
5. **Relatórios**: Adicionar geração de relatórios
6. **Notificações**: Sistema de notificações em tempo real
7. **Dashboards avançados**: Gráficos e métricas detalhadas

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run lint` - Executa o linter
- `npm run preview` - Visualiza o build de produção localmente

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
