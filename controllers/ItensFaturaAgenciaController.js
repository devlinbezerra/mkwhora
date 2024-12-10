const ItensFaturaAgencia = require('../models/ModelItensFaturaAgencia');
const ItensFatura = require('../models/ModelItensFatura');
const Tarifas = require('../models/ModelTarifas');
const FaturaAgencia = require('../models/ModelFaturasAgencia');
const Ucs = require('../models/ModelUcs');
const checkDuplicidade = require('../services/checkDuplicidade');
const atualizarStatusFatura = require('../services/atualizarStatusFatura')

//Carregar variáveis externas



//Função para calcular a energia com impostos
const calcularEnergia = (pis, cofins, icms, tarifa, kwh) => {
  // Converte para número, se necessário
  const valores = [pis, cofins, icms, tarifa, kwh].map(value => {
    const numero = Number(value);
    if (isNaN(numero)) {
      throw new Error(`O valor "${value}" não é um número válido.`);
    }
    return numero;
  });

  const [pisNum, cofinsNum, icmsNum, tarifaNum, kwhNum] = valores;

  // Realiza o cálculo
  const res = ((tarifaNum / (1 - (pisNum + cofinsNum))) / (1 - icmsNum)) * kwhNum;
  return res;
};

//Função para calcular a energia com impostos quando é Geração Compartilhada (Sem ICMS na base de Cálculo)
const calcularEnergiaGC = (pis, cofins, icms, tarifa, kwh) => {
  // Converte para número, se necessário
  const valores = [pis, cofins, icms, tarifa, kwh].map(value => {
    const numero = Number(value);
    if (isNaN(numero)) {
      throw new Error(`O valor "${value}" não é um número válido.`);
    }
    return numero;
  });

  const [pisNum, cofinsNum, icmsNum, tarifaNum, kwhNum] = valores;

  // Realiza o cálculo
  const res = tarifaNum / (1 - (pisNum + cofinsNum))  * kwhNum;
  return res;
};

//Função para associar a tabela itemFatura com a Tarifa para trazer a valores das tarifas
const fetchTarifaTotal = async (itemFaturaAgenciaId) => {
  try {
    const result = await ItensFatura.findOne({
      where: { id_itens_fatura: itemFaturaAgenciaId }, // Filtra pelo ID específico
      attributes: [], // Nenhum atributo de ItensFatura será retornado
      include: [
        {
          model: Tarifas,
          as: 'idTarifa', // Deve corresponder ao alias definido na associação
          attributes: ['tarifa_total'], // Retorna apenas o campo tarifa_total
        },
      ],
    });

    // Retorna o valor de tarifa_total ou null se não encontrar
    return result?.idTarifa?.tarifa_total || null;
  } catch (error) {
    console.error('Erro ao buscar tarifa_total:', error);
    throw error; // Propaga o erro para ser tratado pelo chamador
  }
};


module.exports = {

  // Listar todos os itens de fatura da agência
  async getAll(req, res) {
    try {
      const itens = await ItensFaturaAgencia.findAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os itens de fatura da agência.' });
    }
  },

  // Buscar item de fatura da agência por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await ItensFaturaAgencia.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item de fatura da agência não encontrado.' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o item de fatura da agência.' });
    }
  },

  // Criar um novo item de fatura da agência
  async create(req, res) {
    try {

      //Setando as variáveis do formulário
      const { id_fatura_agencia, item_fatura_agencia, quantidade, valorInput } = req.body;

      let valor = valorInput;
     
      // Validação dos campos obrigatórios
      if (!id_fatura_agencia || !item_fatura_agencia ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(ItensFaturaAgencia, { id_fatura_agencia, item_fatura_agencia });

      //Pegando dados de parâmetro do item da fatura selecionado
      const dadosItemFatura = await ItensFatura.findByPk(item_fatura_agencia);

      if (!dadosItemFatura) {
        return res.status(400).json({
        error: true,
        message: `Item da fatura com o ID ${item_fatura_agencia} não foi encontrado.`,
        });
      }

      //Saldo será utilizado para identificar se o valor será dedutível (negativo) na fatura. SCEE definirá se entrará para a fatura da usina.
      const { saldo, SCEE } = dadosItemFatura;
      
      /**
       * Identificar se o tem faz parte do SCEE para ser ulizado na fatura da usina, se for então o valor é calculado e reatribuído
       * Senão, então o valor permanecerá o que veio no formulário.
       */
      
      //Verificando se o item faz parte do SCEE
      if(SCEE){//Se fizer parte do SCEE o sistema irá calcular o valor apenas com a quantidade informada.

        //Pegando dados da tabela fatura_agencia
        const dadosFatura = await FaturaAgencia.findByPk(id_fatura_agencia);

        if (!dadosFatura) {
          return res.status(400).json({
          error: true,
          message: `Fatura com o ID ${id_fatura_agencia} não foi encontrada.`,
          });
        }

        const { uc, aliq_pis, aliq_cofins, aliq_icms } = dadosFatura;
        
        //Pegando tarifa
        const tarifa = await fetchTarifaTotal(item_fatura_agencia);

        //Identificar se é consumo ou injeção/compensação
        if(saldo < 0){//Se menor que zero então é injeção/ compensação que irá ser dedutível do valor total da fatura.
          
          //Verificando a modalidade da compensação (Autoconsumo remoto ou Geração Compartilhada)
          const dadosUc = await Ucs.findByPk(uc);
          const { autoconsumo_remoto } = dadosUc;
          console.log(dadosUc);

          if(autoconsumo_remoto){
            
            valor = calcularEnergia(aliq_pis,aliq_cofins,aliq_icms,tarifa,quantidade)*saldo;
          
          }else{
            
            valor = calcularEnergiaGC(aliq_pis,aliq_cofins,aliq_icms,tarifa,quantidade)*saldo;
            
          }

        }else{//Se não for menor então é consumo. Irá aumentar o valor da fatura

          valor = calcularEnergia(aliq_pis,aliq_cofins,aliq_icms,tarifa,quantidade);

        }  

      }

      // Cria o novo item no banco de dados
      const newItem = await ItensFaturaAgencia.create({
        id_fatura_agencia,
        item_fatura_agencia,
        quantidade,
        valor
      });

      //Atualiza o status da fatura
      atualizarStatusFatura(newFatura.id_fatura);      

      // Retorna o novo registro criado
      res.status(201).json(newItem);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o fatura.', details: error.message });
    }
  },

  // Não haverá alteração, será sempre excluído e inserido novamente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_fatura_agencia, item_fatura_agencia, quantidade, valor } = req.body;

      const itemRecord = await ItensFaturaAgencia.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de fatura da agência não encontrado.' });
      }

      // Atualiza os dados do item de fatura
      itemRecord.id_fatura_agencia = id_fatura_agencia;
      itemRecord.item_fatura_agencia = item_fatura_agencia;
      itemRecord.quantidade = quantidade;
      itemRecord.valor = valor;

      await itemRecord.save();

      //Atualiza o status da fatura
      atualizarStatusFatura(newFatura.id_fatura);  

      res.status(200).json(itemRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o item de fatura da agência.' });
    }
  },

  // Deletar um item de fatura da agência
  async delete(req, res) {
    try {
      const { id } = req.params;

      const itemRecord = await ItensFaturaAgencia.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de fatura da agência não encontrado.' });
      }

      await itemRecord.destroy();
      res.status(200).json({ message: 'Item de fatura da agência deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o item de fatura da agência.' });
    }
  },
};
