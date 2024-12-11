const FaturasAgencia = require('../models/ModelFaturasAgencia');
const checkDuplicidade = require('../services/checkDuplicidade');
const atualizarStatusFatura = require('../services/atualizarStatusFatura');
const listaFaturas = require('../services/listaFaturas');

module.exports = {
    
  // Listar faturas com status para relação de faturamento
  async listaFaturas(req, res) {
    try {
      // Extrai o id_fatura_agencia da query string
      const { id_fatura_agencia } = req.params;

      // Chama o serviço passando id_fatura_agencia ou undefined
      const faturas = await listaFaturas.listaFaturas(id_fatura_agencia || null);

      res.status(200).json(faturas);
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao listar as faturas.',
        details: error.message,
      });
    }
  },
  
  
  // Listar todas as faturas da agência
  async getAll(req, res) {
    try {
      const faturas = await FaturasAgencia.findAll();
      res.status(200).json(faturas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as faturas da agência.' });
    }
  },

  // Buscar fatura da agência por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const fatura = await FaturasAgencia.findByPk(id);
      if (!fatura) {
        return res.status(404).json({ error: 'Fatura não encontrada.' });
      }
      res.status(200).json(fatura);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a fatura da agência.' });
    }
  },

  // Criar uma nova fatura da agência
  async create(req, res) {
    try {
      const { 
        uc, 
        referencia,
        data_vencimento,
        data_leitura_atual,
        data_leitura_anterior, 
        data_emissao, 
        data_apresentacao, 
        data_prox_leitura, 
        valor_fatura, 
        aliq_pis, 
        aliq_cofins, 
        aliq_icms,
        bandeira 
      } = req.body;

      // Validação dos campos obrigatórios (ajuste conforme necessidade)
      if (!uc || !referencia || !data_emissao || !valor_fatura) {
        return res.status(400).json({ error: 'Campos obrigatórios: uc, referencia, data_emissao e valor_fatura.' });
      }

      // Validação de duplicidade
      const referenciaConsulta = new Date(referencia); //Se o campo é date temque tratar o dado para data e deixar apenas string
      await checkDuplicidade(FaturasAgencia, { uc, referencia: referenciaConsulta });

      // Cria a nova fatura no banco de dados
      const newFatura = await FaturasAgencia.create({
        uc,
        referencia,
        data_vencimento,
        data_leitura_atual,
        data_leitura_anterior,
        data_emissao,
        data_apresentacao,
        data_prox_leitura,
        valor_fatura,
        aliq_pis,
        aliq_cofins,
        aliq_icms,
        bandeira
      });

      //Atualiza o status da fatura
      await atualizarStatusFatura(newFatura.id_fatura_agencia);

      // Retorna o novo registro criado
      res.status(201).json(newFatura);

    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', details: error.message });
    }
  },

  // Atualizar uma fatura da agência existente
  async update(req, res) {
    /**
     * Não há alteração manual no status da fatura
     */
    try {
      const { id } = req.params;
      const { 
        uc, 
        referencia, 
        data_vencimento,
        data_leitura_atual,
        data_leitura_anterior,
        data_emissao, 
        data_apresentacao, 
        data_prox_leitura, 
        valor_fatura, 
        aliq_pis, 
        aliq_cofins, 
        aliq_icms,
        bandeira
      } = req.body;

      const fatura = await FaturasAgencia.findByPk(id);
      if (!fatura) {
        return res.status(404).json({ error: 'Fatura não encontrada.' });
      }

      // Atualiza os dados da fatura
      fatura.uc = uc || fatura.uc ;
      fatura.referencia = referencia || fatura.referencia ;
      fatura.data_vencimento = data_vencimento || fatura.data_vencimento ;
      fatura.data_leitura_atual = data_leitura_atual || fatura.data_leitura_atual ;
      fatura.data_leitura_anterior = data_leitura_anterior || fatura.data_leitura_anterior ;
      fatura.data_emissao = data_emissao || fatura.data_emissao ;
      fatura.data_apresentacao = data_apresentacao || fatura.data_apresentacao ;
      fatura.data_prox_leitura = data_prox_leitura || fatura.data_prox_leitura ;
      fatura.valor_fatura = valor_fatura || fatura.valor_fatura ;
      fatura.aliq_pis = aliq_pis || fatura.aliq_pis ;
      fatura.aliq_cofins = aliq_cofins || fatura.aliq_cofins ;
      fatura.aliq_icms = aliq_icms || fatura.aliq_icms ;
      fatura.bandeira = bandeira || fatura.bandeira ;

      await fatura.save();

      //Atualiza o status da fatura
      atualizarStatusFatura(id);

      res.status(200).json(fatura);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a fatura da agência.', details: error.message });
    }
  },

  // Deletar uma fatura da agência
  async delete(req, res) {
    try {
      const { id } = req.params;

      const fatura = await FaturasAgencia.findByPk(id);
      if (!fatura) {
        return res.status(404).json({ error: 'Fatura não encontrada.' });
      }

      await fatura.destroy();
      res.status(200).json({ message: 'Fatura deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a fatura da agência.' });
    }
  },
};
