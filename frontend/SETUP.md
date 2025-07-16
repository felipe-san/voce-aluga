# Sistema Você Aluga - Frontend

## 🚀 Configuração Realizada

O frontend foi configurado para consumir a API REST do backend Java Spring Boot. Aqui estão as principais mudanças implementadas:

### ✅ Atualizações dos Serviços

**1. API Base URL Corrigida**
- Alterado de `http://localhost:8081/api` para `http://localhost:8080`
- Corresponde à porta configurada no backend Spring Boot

**2. Serviços Convertidos para API Real**
- ❌ **Antes**: Dados mockados com setTimeout
- ✅ **Agora**: Chamadas reais para endpoints REST

### 📁 Estrutura dos Serviços

```typescript
// clienteService.ts - Endpoints para /clientes
listarTodos()    -> GET /clientes
buscarPorId(id)  -> GET /clientes/{id}
criar(cliente)   -> POST /clientes
atualizar(id, cliente) -> PUT /clientes/{id}
deletar(id)      -> DELETE /clientes/{id}

// veiculoService.ts - Endpoints para /veiculos
listarTodos()    -> GET /veiculos
listarDisponiveis() -> GET /veiculos?disponivel=true
// ... demais métodos CRUD

// contratoService.ts - Endpoints para /contratos
buscarPorCliente(clienteId) -> GET /contratos?clienteId={id}
buscarPorStatus(status) -> GET /contratos?status={status}
// ... demais métodos CRUD

// estoqueService.ts - Endpoints para /estoque
buscarPorVeiculo(veiculoId) -> GET /estoque?veiculoId={id}
// ... demais métodos CRUD
```

### 🔧 Tipos TypeScript Atualizados

**Principais ajustes nos tipos:**

```typescript
// Usuario: removido campo 'telefone' (não existe no backend)
interface Usuario {
  id?: number;
  nome: string;
  email: string;
  endereco: string; // sem telefone
}

// Veiculo: campos adicionais do modelo Java
interface Veiculo {
  // ... campos básicos
  quilometragem?: number;
  capacidadeTanque?: number;
  consumoMedio?: number;
  dataProximaManutencao?: string;
  historicoManutencao?: string;
  status?: string;
}
```

### 🌐 CORS Configurado

O backend já possui configuração CORS para aceitar requisições do frontend:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

## 🚀 Como Executar

### 1. Backend (Spring Boot)
**Pré-requisito**: Java 17+ e Maven

```bash
cd voce-aluga
mvn spring-boot:run
```

O backend rodará em: `http://localhost:8080`

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O frontend rodará em: `http://localhost:3000`

## 📋 Endpoints da API

### Clientes
- `GET /clientes` - Listar todos
- `GET /clientes/{id}` - Buscar por ID
- `POST /clientes` - Criar novo
- `PUT /clientes/{id}` - Atualizar
- `DELETE /clientes/{id}` - Deletar

### Veículos
- `GET /veiculos` - Listar todos
- `GET /veiculos/{id}` - Buscar por ID
- `POST /veiculos` - Criar novo
- `PUT /veiculos/{id}` - Atualizar
- `DELETE /veiculos/{id}` - Deletar

### Contratos
- `GET /contratos` - Listar todos
- `GET /contratos/{id}` - Buscar por ID
- `POST /contratos` - Criar novo
- `PUT /contratos/{id}` - Atualizar
- `DELETE /contratos/{id}` - Deletar

### Estoque
- `GET /estoque` - Listar todos
- `GET /estoque/{id}` - Buscar por ID
- `POST /estoque` - Criar novo
- `PUT /estoque/{id}` - Atualizar
- `DELETE /estoque/{id}` - Deletar

## 🛠 Funcionalidades Implementadas

### ✅ Páginas Funcionais
- **Dashboard**: Visão geral do sistema
- **Clientes**: CRUD completo com formulário
- **Veículos**: Listagem e gestão de frota
- **Contratos**: Gestão de aluguéis
- **Estoque**: Controle de disponibilidade

### ✅ Componentes
- **Header**: Navegação principal
- **Sidebar**: Menu lateral responsivo
- **Formulários**: Material-UI com validação
- **Tabelas**: DataGrid para listagens

### ✅ Tecnologias
- **React 18** com TypeScript
- **Material-UI** para componentes
- **Axios** para requisições HTTP
- **React Router** para navegação
- **Vite** para build rápido

## 🔄 Próximos Passos

1. **Testar Conectividade**: Verificar se backend responde às requisições
2. **Tratamento de Erros**: Melhorar feedback para usuário
3. **Loading States**: Adicionar indicadores de carregamento
4. **Validação**: Implementar validação de formulários
5. **Autenticação**: Adicionar sistema de login/logout
6. **Relatórios**: Implementar dashboards e relatórios

## 🐛 Solução de Problemas

### Backend não inicia
- Verificar se Java 17+ está instalado
- Verificar se Maven está instalado
- Porta 8080 deve estar livre

### Frontend não conecta
- Verificar se backend está rodando na porta 8080
- Verificar console do navegador para erros CORS
- Verificar se URLs dos endpoints estão corretas

### Erros de compilação TypeScript
- Verificar se tipos estão atualizados
- Executar `npm install` para dependências
- Verificar se não há campos removidos sendo utilizados

---

## 💡 Dicas de Desenvolvimento

1. **Console de Logs**: Os interceptors do Axios logam todas as requisições
2. **DevTools**: Use React DevTools para debug
3. **Network Tab**: Monitore as chamadas HTTP no navegador
4. **H2 Console**: Backend tem console H2 em `/h2-console` (se habilitado)
