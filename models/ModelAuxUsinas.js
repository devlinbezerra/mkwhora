const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelAuxUsinas = sequelize.define('AuxUsinas', {
  id_usina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  potencia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'aux_usinas',
  timestamps: false,
});

module.exports = ModelAuxUsinas;
