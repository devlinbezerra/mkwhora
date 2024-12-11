const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const ModelConsumidores = sequelize.define('Consumidores', {
  id_consumidor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razao_social: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email_responsavel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone_responsavel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cpf_responsavel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome_financeiro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email_financeiro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone_financeiro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  }
}, {
  tableName: 'consumidores',
  timestamps: false,
});

module.exports = ModelConsumidores;
