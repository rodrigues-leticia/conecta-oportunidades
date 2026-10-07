# Conecta Oportunidades — Full Stack

Projeto de extensão UFMS Digital (95DX7.200525), semestre 2026.2.

Nesta versão, o protótipo React foi ampliado para uma arquitetura full stack:

- React + Vite no front-end
- Node.js + Express na API
- PostgreSQL no banco de dados
- API REST para operações CRUD
- Área administrativa para cadastro, edição e exclusão
- Pesquisa e filtros
- Interface responsiva

## Arquitetura

```text
Usuário
   |
   v
React / Vite
   |
   v
API REST (Node.js + Express)
   |
   v
PostgreSQL
```

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm

## 1. Criar o banco

No PostgreSQL, crie o banco:

```sql
CREATE DATABASE conecta_oportunidades;
```

Depois conecte-se ao banco e execute o arquivo:

```text
server/sql/schema.sql
```

Esse arquivo cria a tabela `opportunities` e insere dados de exemplo.

## 2. Configurar a API

Entre na pasta:

```bash
cd server
```

Copie `.env.example` para `.env` e ajuste a senha do PostgreSQL:

```text
PORT=3001
DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/conecta_oportunidades
```

## 3. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

Depois:

```bash
npm install --workspace client
npm install --workspace server
```

## 4. Executar

Na raiz:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

A API ficará disponível em:

```text
http://localhost:3001
```

Teste a API em:

```text
http://localhost:3001/api/health
```

## 5. Área administrativa

Na aplicação, clique em **Administração**.

É possível:

- cadastrar oportunidade;
- editar oportunidade;
- excluir oportunidade;
- visualizar todas as oportunidades cadastradas.

### Observação importante

Nesta versão acadêmica, a área administrativa ainda não possui autenticação. Portanto, ela deve ser considerada um protótipo funcional.

Para uma versão de produção, deve ser implementado login, autorização por perfil, proteção das rotas administrativas e armazenamento seguro de credenciais.

## Endpoints

### Listar

```http
GET /api/opportunities
```

### Buscar por filtros

```http
GET /api/opportunities?type=Vaga
GET /api/opportunities?category=Tecnologia
GET /api/opportunities?location=Santos%20-%20SP
GET /api/opportunities?search=programação
```

### Buscar por ID

```http
GET /api/opportunities/:id
```

### Cadastrar

```http
POST /api/opportunities
```

### Editar

```http
PUT /api/opportunities/:id
```

### Excluir

```http
DELETE /api/opportunities/:id
```

## Segurança e boas práticas

A API utiliza consultas parametrizadas do PostgreSQL, reduzindo o risco de SQL Injection.

Os dados de conexão com o banco ficam em `.env` e não devem ser enviados ao GitHub.

O arquivo `.gitignore` deve impedir o envio de:

```text
.env
node_modules
dist
```

Antes de uma publicação real, recomenda-se adicionar:

- autenticação;
- autorização;
- validação mais completa dos dados;
- rate limiting;
- logs;
- HTTPS;
- tratamento de erros;
- proteção das rotas administrativas.

## Próximas melhorias

- Login de administrador
- Cadastro de usuários
- Favoritos
- Expiração automática de vagas
- Upload de imagens
- PostgreSQL hospedado
- Deploy da API
- Deploy do React
- Testes automatizados
- Documentação Swagger/OpenAPI
- Recursos adicionais de acessibilidade
