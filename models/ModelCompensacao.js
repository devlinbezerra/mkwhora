const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelCompensacao = sequelize.define('Compensacao', {
  id_compensacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_uc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  referencia: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'compensacao',
  timestamps: false,
});

module.exports = ModelCompensacao;
