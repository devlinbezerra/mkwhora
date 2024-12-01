const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega variáveis do .env

// Cria uma instância do Sequelize com as variáveis de ambiente
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql', // Pode ser 'postgres', 'sqlite', 'mssql'
  logging: false, // Define como false para evitar logs de queries no console
  pool: {
    max: 5,        // Máximo de conexões no pool
    min: 0,        // Mínimo de conexões no pool
    acquire: 30000, // Tempo máximo para tentar obter uma conexão antes de erro
    idle: 10000,   // Tempo que uma conexão pode ficar ociosa antes de ser liberada
  },
});

// Testar a conexão com o banco
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = sequelize;
