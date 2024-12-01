const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelAuxPostoTarifario = sequelize.define('AuxPostoTarifario', {
  id_posto_tarifario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'aux_posto_tarifario',
  timestamps: false,
});

module.exports = ModelAuxPostoTarifario;
