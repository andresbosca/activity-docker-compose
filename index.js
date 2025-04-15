const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configura a conexão com o banco via variável de ambiente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/users', async (req, res) => {
  console.log(process.env.DATABASE_URL);
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

// Cria a tabela users se não existir
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log('Tabela users pronta');
  } catch (err) {
    console.error('Erro ao criar tabela users:', err);
  }
}

const PORT = 3000;

app.listen(PORT, async () => {
  await createTable();
  console.log(`Servidor rodando na porta ${PORT}`);
});
