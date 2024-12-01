const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelFaturasAgencia = sequelize.define('FaturasAgencia', {
  id_fatura_agencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  uc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referencia: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_emissao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_apresentacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_prox_leitura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor_fatura: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  aliq_pis: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  aliq_cofins: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  aliq_icms: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
}, {
  tableName: 'faturas_agencia',
  timestamps: false,
});

module.exports = ModelFaturasAgencia;
