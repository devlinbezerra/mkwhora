const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); 
const cors = require('cors');
const routes = require('./routes'); // Requer o arquivo de roteamento centralizado

dotenv.config({ path: '../.env' });

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
});

const app = express();

app.use(express.json());
app.use(cors());

// Usa o roteador centralizado
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API de Gestão de Energia - Serviço Ativo');
});

// Inicialização do banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida.'))
  .then(() => sequelize.sync())
  .catch(err => console.error('Erro ao conectar ou sincronizar o banco de dados:', err));

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
