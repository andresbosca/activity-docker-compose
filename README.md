# activity-docker-compose

# Aplicação Node.js + Express com PostgreSQL via Docker Compose

## Descrição

Esta é uma aplicação web simples desenvolvida em Node.js com o framework Express, que se conecta a um banco de dados PostgreSQL. A aplicação expõe uma API REST para listar e adicionar usuários. Todo o ambiente é orquestrado com Docker e Docker Compose, facilitando a implantação e o isolamento dos serviços.

---

## Tecnologias utilizadas

- Node.js 18 (Alpine)
- Express
- PostgreSQL 14
- Docker
- Docker Compose

---

## Estrutura do projeto

.
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── .gitignore
├── index.js
├── package.json
└── yarn.lock

---

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
DATABASE_URL=postgresql://user:password@db:5432/mydb
```

## Como executar

1. Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.

2. No terminal, navegue até a pasta do projeto.

3. Execute o comando para subir os containers em modo destacado:

```bash
docker-compose up -d
```

4. A aplicação estará disponível em: http://localhost:3000

## Endpoints disponíveis

- `GET /users` — Lista todos os usuários cadastrados.
- `POST /users` — Adiciona um novo usuário.
  Exemplo de requisição POST:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
```

## Parar e remover containers

```bash
docker-compose down
```

## Observações

- O comando ping do host para os containers pode não funcionar devido a limitações do Docker Desktop.
- Para testar a comunicação entre containers, use docker exec para acessar o shell do container e utilize ferramentas como ping ou nc.
