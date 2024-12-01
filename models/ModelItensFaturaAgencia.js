const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const FaturasAgencia = require('../models/ModelFaturasAgencia');
const ItensFatura = require('../models/ModelItensFatura');

const ModelItensFaturaAgencia = sequelize.define('ItensFaturaAgencia', {
  id_item_fatura_agencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_fatura_agencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_fatura_agencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  }
}, {
  tableName: 'itens_fatura_agencia',
  timestamps: false,
});

// Associações
ModelItensFaturaAgencia.belongsTo(FaturasAgencia, {
  foreignKey: 'id_fatura_agencia',
  as: 'faturaAgencia',
});

ModelItensFaturaAgencia.belongsTo(ItensFatura, {
  foreignKey: 'item_fatura_agencia',
  as: 'itemFatura',
});

module.exports = ModelItensFaturaAgencia;
