const AuxTipoCompensacao = require('../models/ModelAuxTipoCompensacao');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os tipos de compensação
  async getAll(req, res) {
    try {
      const tiposCompensacao = await AuxTipoCompensacao.findAll();
      res.status(200).json(tiposCompensacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os tipos de compensação.' });
    }
  },

  // Buscar tipo de compensação por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const tipoCompensacao = await AuxTipoCompensacao.findByPk(id);
      if (!tipoCompensacao) {
        return res.status(404).json({ error: 'Tipo de compensação não encontrado.' });
      }
      res.status(200).json(tipoCompensacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o tipo de compensação.' });
    }
  },

  // Criar um novo tipo de compensação
  async create(req, res) {
    try {
      const { descricao } = req.body;

      // Validação dos campos obrigatórios
      if (!descricao) {
        return res.status(400).json({ error: 'Descrição é obrigatória.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(AuxTipoCompensacao, { descricao });

      // Cria o novo tipo de compensação no banco de dados
      const newTipoCompensacao = await AuxTipoCompensacao.create({ descricao });

      // Retorna o novo registro criado
      res.status(201).json(newTipoCompensacao);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar um tipo de compensação existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const tipoCompensacao = await AuxTipoCompensacao.findByPk(id);
      if (!tipoCompensacao) {
        return res.status(404).json({ error: 'Tipo de compensação não encontrado.' });
      }

      // Validação dos campos obrigatórios
      if (!descricao) {
        return res.status(400).json({ error: 'Descrição é obrigatória.' });
      }

      // Atualiza os dados do tipo de compensação
      tipoCompensacao.descricao = descricao;

      await tipoCompensacao.save();

      res.status(200).json(tipoCompensacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o tipo de compensação.' });
    }
  },

  // Deletar um tipo de compensação
  async delete(req, res) {
    try {
      const { id } = req.params;

      const tipoCompensacao = await AuxTipoCompensacao.findByPk(id);
      if (!tipoCompensacao) {
        return res.status(404).json({ error: 'Tipo de compensação não encontrado.' });
      }

      await tipoCompensacao.destroy();
      res.status(200).json({ message: 'Tipo de compensação deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o tipo de compensação.' });
    }
  },
};
