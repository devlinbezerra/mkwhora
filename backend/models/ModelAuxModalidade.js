const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuxModalidade = sequelize.define('AuxModalidade', {
  id_modalidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'aux_modalidade', // Nome da tabela no banco de dados
  timestamps: false,         // Desativa createdAt e updatedAt
});

module.exports = AuxModalidade;
