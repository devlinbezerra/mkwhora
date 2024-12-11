const AuxModalidade = require('../models/ModelAuxModalidade');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as modalidades
  async getAll(req, res) {
    try {
      const modalidades = await AuxModalidade.findAll();
      res.status(200).json(modalidades);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar modalidades.' });
    }
  },

  // Buscar modalidade por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const modalidade = await AuxModalidade.findByPk(id);
      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada.' });
      }
      res.status(200).json(modalidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a modalidade.' });
    }
  },

  // Criar uma nova modalidade
  async create(req, res) {
    try {
      const { descricao } = req.body;

      // Validação do campo obrigatório
      if (!descricao) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(AuxModalidade, { descricao });

      // Cria a nova modalidade no banco de dados
      const newModalidade = await AuxModalidade.create({ descricao });

      // Retorna o novo registro criado
      res.status(201).json(newModalidade);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma modalidade existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const modalidade = await AuxModalidade.findByPk(id);
      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada.' });
      }

      // Validação do campo obrigatório
      if (!descricao) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
      }

      // Atualiza o campo descrição
      modalidade.descricao = descricao;

      await modalidade.save();

      res.status(200).json(modalidade);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a modalidade.' });
    }
  },

  // Deletar uma modalidade
  async delete(req, res) {
    try {
      const { id } = req.params;

      const modalidade = await AuxModalidade.findByPk(id);
      if (!modalidade) {
        return res.status(404).json({ error: 'Modalidade não encontrada.' });
      }

      await modalidade.destroy();
      res.status(200).json({ message: 'Modalidade deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a modalidade.' });
    }
  },
};
