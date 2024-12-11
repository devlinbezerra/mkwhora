const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelAuxAgencia = sequelize.define('AuxAgencia', {
  id_agencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_faturas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone_suporte: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email_suporte: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'aux_agencia',
  timestamps: false,
});

module.exports = ModelAuxAgencia;
