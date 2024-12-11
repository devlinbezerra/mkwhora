const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const ModelTarifas = require('../models/ModelTarifas');

const ModelItensFatura = sequelize.define('ItensFatura', {
  id_itens_fatura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tarifa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  saldo: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  injecao_usina: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }, SCEE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }, ordem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'itens_fatura',
  timestamps: false,
});

// Associações
ModelItensFatura.belongsTo(ModelTarifas, {
  foreignKey: 'tarifa',
  as: 'idTarifa',
});

module.exports = ModelItensFatura;
