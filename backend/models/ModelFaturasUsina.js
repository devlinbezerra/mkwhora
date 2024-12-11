const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelFaturasUsina = sequelize.define('FaturasUsina', {
  id_fatura_usina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_fatura_agencia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  valor_sem_gd: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  valor_com_gd: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  economia: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  desagio: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  obs: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'faturas_usina',
  timestamps: false,
});

module.exports = ModelFaturasUsina;
