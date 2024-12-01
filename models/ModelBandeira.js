const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ModelBandeira = sequelize.define('Ucs', {
  id_bandeira: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarifa_bandeira: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
}, {
  tableName: 'bandeira',
  timestamps: false,
});

module.exports = ModelBandeira;
