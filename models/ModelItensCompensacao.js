const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelItensCompensacao = sequelize.define('ItensCompensacao', {
  id_itens_compensacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_compensacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  item: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  posto_tarifario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'itens_compensacao',
  timestamps: false,
});

module.exports = ModelItensCompensacao;
