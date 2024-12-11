const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelGeracao = sequelize.define('Geracao', {
  id_geracao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  unidade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mes_ano: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  geracao: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  }
}, {
  tableName: 'geracao',
  timestamps: false,
});

module.exports = ModelGeracao;
