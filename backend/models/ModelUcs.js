const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const ModelUcs = sequelize.define('Ucs', {
  id_uc: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  codigo_uc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_instalacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subgrupo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  optante_bt: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  tipo_ligacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tensao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  consumidor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  titularidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cnpj_titular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modalidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  desagio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  autoconsumo_remoto: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  }
}, {
  tableName: 'ucs',
  timestamps: false,
});

module.exports = ModelUcs;
