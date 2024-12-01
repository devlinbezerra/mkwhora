const Compensacao = require('../models/ModelCompensacao');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as compensações
  async getAll(req, res) {
    try {
      const compensacoes = await Compensacao.findAll();
      res.status(200).json(compensacoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as compensações.' });
    }
  },

  // Buscar compensação por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const compensacao = await Compensacao.findByPk(id);
      if (!compensacao) {
        return res.status(404).json({ error: 'Compensação não encontrada.' });
      }
      res.status(200).json(compensacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a compensação.' });
    }
  },

  // Criar uma nova compensação
  async create(req, res) {
    try {
      const { id_uc, referencia } = req.body;

      // Validação dos campos obrigatórios
      if (!id_uc || !referencia) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_uc e referencia.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Compensacao, { id_uc, referencia });

      // Cria a nova compensação no banco de dados
      const newCompensacao = await Compensacao.create({ id_uc, referencia });

      // Retorna o novo registro criado
      res.status(201).json(newCompensacao);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma compensação existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_uc, referencia } = req.body;

      const compensacao = await Compensacao.findByPk(id);
      if (!compensacao) {
        return res.status(404).json({ error: 'Compensação não encontrada.' });
      }

      // Validação dos campos obrigatórios
      if (!id_uc || !referencia) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_uc e referencia.' });
      }

      // Atualiza os dados da compensação
      compensacao.id_uc = id_uc;
      compensacao.referencia = referencia;

      await compensacao.save();

      res.status(200).json(compensacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a compensação.' });
    }
  },

  // Deletar uma compensação
  async delete(req, res) {
    try {
      const { id } = req.params;

      const compensacao = await Compensacao.findByPk(id);
      if (!compensacao) {
        return res.status(404).json({ error: 'Compensação não encontrada.' });
      }

      await compensacao.destroy();
      res.status(200).json({ message: 'Compensação deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a compensação.' });
    }
  },
};
