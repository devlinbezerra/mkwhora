const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelRevisao = sequelize.define('Revisao', {
  id_revisao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  agencia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_revisao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  arquivo: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'revisao',
  timestamps: false,
});

module.exports = ModelRevisao;
