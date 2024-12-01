const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelContratos = sequelize.define('Contratos', {
  id_contrato: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_consumidor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  desagio_a: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  desagio_b: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  }
}, {
  tableName: 'contratos',
  timestamps: false,
});

module.exports = ModelContratos;
