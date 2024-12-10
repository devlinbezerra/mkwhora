const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importação de Modelos Relacionados
const Ucs = require('./ModelUcs'); // Modelo para a tabela 'ucs'
const Bandeira = require('./ModelBandeira'); // Modelo para a tabela 'bandeira'
const AuxStatusFatura = require('./ModelAuxStatusFatura'); // Modelo para a tabela 'aux_status_fatura'

// Definição do Modelo FaturasAgencia
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
    references: {
      model: Ucs, // Nome do modelo referenciado
      key: 'id_uc' // Nome da chave primária
    }
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
  data_leitura_atual: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  data_leitura_anterior: {
    type: DataTypes.DATE,
    allowNull: true,
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
  },
  bandeira: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bandeira, // Nome do modelo referenciado
      key: 'id_bandeira' // Nome da chave primária
    }
  },
  status_fatura: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AuxStatusFatura, // Nome do modelo referenciado
      key: 'id_status' // Nome da chave primária
    }
  }
}, {
  tableName: 'faturas_agencia',
  timestamps: false,
});


// Definindo Associações
ModelFaturasAgencia.belongsTo(Ucs, { foreignKey: 'uc', as: 'u' });
ModelFaturasAgencia.belongsTo(Bandeira, { foreignKey: 'bandeira', as: 'b' });
ModelFaturasAgencia.belongsTo(AuxStatusFatura, { foreignKey: 'status_fatura', as: 's' });

module.exports = ModelFaturasAgencia;
