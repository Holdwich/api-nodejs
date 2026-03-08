
# API de Pedidos

## Descrição

API REST desenvolvida com Node.js e Express para gerenciar pedidos e seus itens. Utiliza SQLite como banco de dados e inclui documentação interativa com Swagger.

## 🚀 Funcionalidades

- Criar pedidos com múltiplos itens
- Listar todos os pedidos
- Buscar pedido por ID
- Deletar pedido
- Validação de dados
- Transações atômicas
- Documentação Swagger integrada

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/Holdwich/api-nodejs.git

# Instale as dependências
npm install

# Execute as migrações do banco de dados (o projeto já contém, por padrão, o banco de dados inicializado vazio em database/db.sqlite)
npm run migrate

# Inicie o servidor
npm start
```

## 📖 Uso

A API estará disponível em `http://localhost:3000`

### Documentação Swagger

Acesse a documentação interativa em: `http://localhost:3000/docs`

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações
│   └── database.js
├── controllers/      # Controladores
│   └── orderController.js
├── database/         # Migrações e BD
│   ├── migrations.sql
│   └── migrate.js
├── repositories/     # Acesso a dados
│   └── orderRepository.js
├── routes/          # Rotas
│   └── orderRoutes.js
├── services/        # Lógica de negócio
│   └── orderService.js
├── app.js
├── server.js
└── swagger.js
```

## 🛠️ Scripts Disponíveis

```bash
npm start      # Inicia o servidor
npm run migrate # Executa as migrações do banco
```

## 💾 Banco de Dados

Utiliza SQLite com duas tabelas principais:

- **orders**: Armazena informações dos pedidos
- **items**: Armazena os itens de cada pedido

## 📦 Dependências

- **express**: Framework web
- **sqlite3**: Driver SQLite
- **swagger-jsdoc**: Gerador de especificação Swagger
- **swagger-ui-express**: Interface Swagger

## 👨‍💻 Arquiteturas Utilizadas

- Controller - Service - Repository (CSR) Pattern
- Async/Await
- Transações de banco de dados
