const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ModelSubGrupo = require('../models/ModelAuxSubgrupo');
const ModelRevisao = require('../models/ModelRevisao');

const ModelTarifas = sequelize.define('Tarifas', {
  id_tarifa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  subgrupo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  posto_tarifario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarifa_tusd: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  tarifa_te: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  tarifa_total: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  revisao_tarifaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  modalidade: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'tarifas',
  timestamps: false,
});

// Associações
ModelTarifas.belongsTo(ModelSubGrupo, {
  foreignKey: 'subgrupo',
  as: 'idSubgrupo',
});

ModelTarifas.belongsTo(ModelRevisao, {
  foreignKey: 'revisao_tarifaria',
  as: 'idRevisao',
});

module.exports = ModelTarifas;
