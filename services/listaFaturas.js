const FaturasAgencia = require('../models/ModelFaturasAgencia');
const Ucs = require('../models/ModelUcs');
const Bandeira = require('../models/ModelBandeira');
const AuxStatusFatura = require('../models/ModelAuxStatusFatura');
const sequelize = require('../config/database');

class FaturasAgenciaService {
  static async listFaturas() {
    return await FaturasAgencia.findAll({
      attributes: [
        'uc',
        [sequelize.col('u.codigo_uc'), 'uc_codigo'],
        'referencia',
        'valor_fatura',
        ['bandeira', 'cod_bandeira'],
        [sequelize.col('b.descricao'), 'bandeira'],
        ['status_fatura', 'cod_status'],
        [sequelize.col('s.descricao'), 'status']
      ],
      include: [
        {
          model: Ucs,
          as: 'u',
          required: true, // INNER JOIN
          attributes: []
        },
        {
          model: Bandeira,
          as: 'b',
          required: true, // INNER JOIN
          attributes: []
        },
        {
          model: AuxStatusFatura,
          as: 's',
          required: true, // INNER JOIN
          attributes: []
        }
      ],
      raw: true
    });
  }
}

module.exports = FaturasAgenciaService;
