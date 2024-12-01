const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuxSubgrupo = sequelize.define('AuxSubgrupo', {
  id_subgrupo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grupo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subgrupo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
}, {
  tableName: 'aux_subgrupo', // Nome da tabela no banco de dados
  timestamps: false,         // Desativa createdAt e updatedAt
});

module.exports = AuxSubgrupo;
