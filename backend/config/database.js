const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega variáveis do .env

// Configura a instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Nome do banco de dados
  "root",                // Usuário fixo para o MySQL
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,        // Nome do serviço no docker-compose
    port: process.env.DB_PORT || 3306, // Porta do MySQL
    dialect: process.env.DB_DIALECT || 'mysql', // Dialeto de banco de dados
    logging: false,                   // Desativa logs de queries no console
    pool: {
      max: 5,        // Máximo de conexões no pool
      min: 0,        // Mínimo de conexões no pool
      acquire: 30000, // Tempo máximo de espera por uma conexão
      idle: 10000,   // Tempo ocioso antes de liberar uma conexão
    },
  }
);

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = sequelize;
