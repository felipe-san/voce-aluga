# Sistema Você Aluga - Guia de Instalação Completo

## 📋 Visão Geral

Sistema completo de gerenciamento de aluguel de carros com:
- **Backend**: Java 17 + Spring Boot + H2 Database
- **Frontend**: React TypeScript + Material-UI

## 🛠️ Pré-requisitos

### Para o Backend (Java/Spring Boot):
1. **Java 17 ou superior**
   - Download: https://www.oracle.com/java/technologies/downloads/#java17
   - Ou OpenJDK: https://adoptium.net/

2. **Maven 3.6+**
   - Download: https://maven.apache.org/download.cgi
   - Ou use o wrapper incluído no projeto

### Para o Frontend (React):
1. **Node.js 16+**
   - Download: https://nodejs.org/

2. **npm** (incluído com Node.js)

## 🚀 Instalação e Execução

### 1. Backend (API Java)

```bash
# Navegue para a pasta do backend
cd voce-aluga

# Compile o projeto (se tiver Maven instalado)
mvn clean install

# OU use o wrapper do Maven (se disponível)
./mvnw clean install    # Linux/Mac
.\mvnw.cmd clean install # Windows

# Execute a aplicação
mvn spring-boot:run

# OU execute o JAR compilado
java -jar target/voce-aluga-1.0-SNAPSHOT.jar
```

**⚠️ Problema Atual**: O sistema foi compilado com Java 17, mas o Java atual é versão 8.

**Soluções**:

1. **Instalar Java 17**:
   - Download do OpenJDK 17: https://adoptium.net/
   - Configurar JAVA_HOME para apontar para Java 17
   - Atualizar PATH para usar Java 17

2. **Verificar instalação**:
   ```bash
   java -version  # Deve mostrar versão 17
   javac -version # Deve mostrar versão 17
   ```

### 2. Frontend (React)

```bash
# Navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

## 📡 Status Atual

### ✅ Frontend (Funcionando)
- React app rodando em http://localhost:3000
- Interface completa com todas as páginas
- Dados mockados temporários para desenvolvimento
- CRUD funcional para Clientes, Contratos, Veículos e Estoque

### ⚠️ Backend (Pendente configuração Java 17)
- Código Java completo e atualizado
- Controllers com CORS configurado
- Modelos atualizados para compatibilidade com frontend
- Endpoints REST implementados
- **Problema**: Precisa Java 17 para executar

## 🔧 Controllers Implementados

### ClienteController (`/clientes`)
- `GET /clientes` - Listar todos
- `GET /clientes/{id}` - Buscar por ID
- `POST /clientes` - Criar novo
- `PUT /clientes/{id}` - Atualizar
- `DELETE /clientes/{id}` - Deletar

### ContratoController (`/contratos`)
- `GET /contratos` - Listar todos
- `GET /contratos/{id}` - Buscar por ID
- `POST /contratos` - Criar novo
- `PUT /contratos/{id}` - Atualizar
- `DELETE /contratos/{id}` - Deletar
- `GET /contratos/{id}/gerar` - Gerar contrato
- `POST /contratos/{id}/encerrar` - Encerrar
- `POST /contratos/{id}/desconto` - Aplicar desconto

### VeiculoController (`/veiculos`)
- `GET /veiculos` - Listar todos
- `GET /veiculos/{id}` - Buscar por ID
- `POST /veiculos` - Criar novo
- `PUT /veiculos/{id}` - Atualizar
- `DELETE /veiculos/{id}` - Deletar
- `GET /veiculos/disponiveis` - Listar disponíveis

### EstoqueController (`/estoque`)
- `GET /estoque` - Listar todos
- `GET /estoque/{id}` - Buscar por ID
- `POST /estoque` - Criar novo
- `PUT /estoque/{id}` - Atualizar
- `DELETE /estoque/{id}` - Deletar

## 🎯 Próximos Passos

1. **Instalar Java 17** para executar o backend
2. **Conectar frontend com backend** (alterar services para usar API real)
3. **Testar integração completa**
4. **Adicionar autenticação/autorização**
5. **Implementar validações de negócio**
6. **Adicionar testes automatizados**
Projeto acadêmico de engenharia e análise de software para os cursos de Análise e Modelagem e Engenharia de Software do CEFET/RJ UNED Maria da Graça. 
