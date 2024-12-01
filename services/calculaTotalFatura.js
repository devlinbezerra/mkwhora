const sequelize = require('sequelize');
const ItensFaturaAgencia = require('../models/ModelItensFaturaAgencia'); // Ajuste o caminho para seu arquivo de modelos

const calcularTotalFatura = async (idFaturaAgencia) => {
  try {
    const resultado = await ItensFaturaAgencia.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('valor')), 'total']
      ],
      where: {
        id_fatura_agencia: idFaturaAgencia
      },
      raw: true, // Retorna os dados como um objeto simples, sem instância do modelo
    });

    return resultado[0]?.total || 0; // Retorna o total ou 0 caso não haja resultados
  } catch (error) {
    console.error('Erro ao calcular o total da fatura:', error);
    throw error;
  }
};

module.exports = calcularTotalFatura;
