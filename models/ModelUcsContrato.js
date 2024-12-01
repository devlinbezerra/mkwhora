const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelUcsContrato = sequelize.define('UcsContrato', {
  id_uc_contrato: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_uc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'ucs_contrato',
  timestamps: false,
});

module.exports = ModelUcsContrato;
