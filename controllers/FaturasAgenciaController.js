const FaturasAgencia = require('../models/ModelFaturasAgencia');
const checkDuplicidade = require('../services/checkDuplicidade');
const calcularTotalFatura = require('../services/calculaTotalFatura');

module.exports = {
  
  //Traz o total
  async getTotal(req, res) {
    try {
      const { id } = req.params;
      const total = await calcularTotalFatura(id);
      if (!total) {
        return res.status(404).json({ error: 'Fatura não encontrada.' });
      }
      res.status(200).json(total);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao pegar total.', details: error.message });
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
        data_emissao, 
        data_apresentacao, 
        data_prox_leitura, 
        valor_fatura, 
        aliq_pis, 
        aliq_cofins, 
        aliq_icms 
      } = req.body;

      // Validação dos campos obrigatórios (ajuste conforme necessidade)
      if (!uc || !referencia || !data_emissao || !valor_fatura) {
        return res.status(400).json({ error: 'Campos obrigatórios: uc, referencia, data_emissao e valor_fatura.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(FaturasAgencia, { uc, referencia });

      // Cria a nova fatura no banco de dados
      const newFatura = await FaturasAgencia.create({
        uc,
        referencia,
        data_vencimento,
        data_emissao,
        data_apresentacao,
        data_prox_leitura,
        valor_fatura,
        aliq_pis,
        aliq_cofins,
        aliq_icms
      });

      // Retorna o novo registro criado
      res.status(201).json(newFatura);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma fatura da agência existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { 
        uc, 
        referencia, 
        data_vencimento,
        data_emissao, 
        data_apresentacao, 
        data_prox_leitura, 
        valor_fatura, 
        aliq_pis, 
        aliq_cofins, 
        aliq_icms 
      } = req.body;

      const fatura = await FaturasAgencia.findByPk(id);
      if (!fatura) {
        return res.status(404).json({ error: 'Fatura não encontrada.' });
      }

      // Atualiza os dados da fatura
      fatura.uc = uc;
      fatura.referencia = referencia;
      fatura.data_vencimento = data_vencimento;
      fatura.data_emissao = data_emissao;
      fatura.data_apresentacao = data_apresentacao;
      fatura.data_prox_leitura = data_prox_leitura;
      fatura.valor_fatura = valor_fatura;
      fatura.aliq_pis = aliq_pis;
      fatura.aliq_cofins = aliq_cofins;
      fatura.aliq_icms = aliq_icms;

      await fatura.save();

      res.status(200).json(fatura);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a fatura da agência.' });
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
