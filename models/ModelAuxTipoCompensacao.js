const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelAuxTipoCompensacao = sequelize.define('AuxTipoCompensacao', {
  id_tipo_compensacao: {
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
  tableName: 'aux_tipo_compensacao',
  timestamps: false,
});

module.exports = ModelAuxTipoCompensacao;
