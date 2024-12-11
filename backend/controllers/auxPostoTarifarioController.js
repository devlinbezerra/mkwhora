const AuxPostoTarifario = require('../models/ModelAuxPostoTarifario');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os postos tarifários
  async getAll(req, res) {
    try {
      const postosTarifarios = await AuxPostoTarifario.findAll();
      res.status(200).json(postosTarifarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar postos tarifários.' });
    }
  },

  // Buscar posto tarifário por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const postoTarifario = await AuxPostoTarifario.findByPk(id);
      if (!postoTarifario) {
        return res.status(404).json({ error: 'Posto tarifário não encontrado.' });
      }
      res.status(200).json(postoTarifario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o posto tarifário.' });
    }
  },

  // Criar um novo posto tarifário
  async create(req, res) {
    try {
      const { descricao } = req.body;

      // Validação dos campos obrigatórios
      if (!descricao) {
        return res.status(400).json({ error: 'Descrição é obrigatória.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(AuxPostoTarifario, { descricao });

      // Cria o novo posto tarifário no banco de dados
      const newPostoTarifario = await AuxPostoTarifario.create({ descricao });

      // Retorna o novo registro criado
      res.status(201).json(newPostoTarifario);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar um posto tarifário existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const postoTarifario = await AuxPostoTarifario.findByPk(id);
      if (!postoTarifario) {
        return res.status(404).json({ error: 'Posto tarifário não encontrado.' });
      }

      // Validação dos campos obrigatórios
      if (!descricao) {
        return res.status(400).json({ error: 'Descrição é obrigatória.' });
      }

      // Atualiza os dados do posto tarifário
      postoTarifario.descricao = descricao;

      await postoTarifario.save();

      res.status(200).json(postoTarifario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o posto tarifário.' });
    }
  },

  // Deletar um posto tarifário
  async delete(req, res) {
    try {
      const { id } = req.params;

      const postoTarifario = await AuxPostoTarifario.findByPk(id);
      if (!postoTarifario) {
        return res.status(404).json({ error: 'Posto tarifário não encontrado.' });
      }

      await postoTarifario.destroy();
      res.status(200).json({ message: 'Posto tarifário deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o posto tarifário.' });
    }
  },
};
