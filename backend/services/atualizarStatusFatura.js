const sequelize = require('sequelize');
const FaturaAgencia = require('../models/ModelFaturasAgencia');
const ItensFaturaAgencia = require('../models/ModelItensFaturaAgencia'); // Ajuste o caminho para seu arquivo de modelos

/**
* 1 - Pendente
* 2 - A Faturar
* 3 - Faturado
* 4 - Pago
*/

const atualizarStatusFatura = async (idFaturaAgencia) => {

  try {
    //Trazer a somatória dos valores dos itens da fatura
    const resultado = await ItensFaturaAgencia.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('valor')), 'total']
      ],
      where: {
        id_fatura_agencia: idFaturaAgencia
      },
      raw: true, // Retorna os dados como um objeto simples, sem instância do modelo
    });

    const total =  resultado[0]?.total || 0; // Atribui o total ou 0 caso não haja resultados

    //Traz o valor total informando no registro da fatura da agência
    const fatura = await FaturaAgencia.findByPk(idFaturaAgencia);
    const valor_fatura = fatura.valor_fatura;
    let status_fatura;

    //console.log(`Esse é o valor total dos itens ${total}`);
    //console.log(`Esse é o valor total da fatura ${valor_fatura}`);

    //Compara os resultados com tolerância de 1. Atribui 1 para pendente e 2 para deixar disponível para faturamento.
    if(Math.abs(total - valor_fatura) > 1){
      //console.log('Deu MAIOR que 1');
      status_fatura = 1;
    }else{
      //console.log('Deu MENOR que 1');
      status_fatura =  2;
    }

    fatura.status_fatura = status_fatura;

    await fatura.save(); 

  } catch (error) {
    console.error('Erro ao atualizar o status da fatura:', error);
    throw error;
  }
};

const alterarStatusParaFaturado = async (idFaturaAgencia) => {
  try {
    const fatura = await FaturaAgencia.findByPk(idFaturaAgencia);

    if (!fatura) {
      throw new Error('Fatura não encontrada');
    }

    fatura.status_fatura = 3; // Faturado
    await fatura.save();

    console.log(`Status da fatura ${idFaturaAgencia} alterado para Faturado (3)`);
  } catch (error) {
    console.error('Erro ao alterar o status da fatura para Faturado:', error);
    throw error;
  }
};

module.exports = {
  atualizarStatusFatura,
  alterarStatusParaFaturado,
};
