const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme necessário

const AuxStatusFatura = sequelize.define('AuxStatusFatura', {
  id_status: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: true, // Pode ser `false` se for obrigatório
  }
}, {
  tableName: 'aux_status_fatura',
  timestamps: false, // Remove createdAt e updatedAt
});

module.exports = AuxStatusFatura;
