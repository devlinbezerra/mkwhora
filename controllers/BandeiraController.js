const Bandeira = require('../models/ModelBandeira');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as bandeiras
  async getAll(req, res) {
    try {
      const bandeiras = await Bandeira.findAll();
      res.status(200).json(bandeiras);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as bandeiras.' });
    }
  },

  // Buscar bandeira por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const bandeira = await Bandeira.findByPk(id);
      if (!bandeira) {
        return res.status(404).json({ error: 'Bandeira não encontrada.' });
      }
      res.status(200).json(bandeira);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a bandeira.' });
    }
  },

  // Criar uma nova bandeira
  async create(req, res) {
    try {
      const { descricao, tarifa_bandeira } = req.body;

      // Validação dos campos obrigatórios
      if (!descricao ) {
        return res.status(400).json({ error: 'Campos obrigatórios: descricao.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Bandeira, { descricao, tarifa_bandeira });

      // Cria a nova bandeira no banco de dados
      const newBandeira = await Bandeira.create({ descricao, tarifa_bandeira });

      // Retorna o novo registro criado
      res.status(201).json(newBandeira);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar a bandeira.' });
    }
  },

  // Atualizar uma bandeira existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao, tarifa_bandeira } = req.body;

      const bandeira = await Bandeira.findByPk(id);
      if (!bandeira) {
        return res.status(404).json({ error: 'Bandeira não encontrada.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Bandeira, { descricao, tarifa_bandeira });

      // Atualiza os dados da bandeira
      bandeira.descricao = descricao;
      bandeira.tarifa_bandeira = tarifa_bandeira;

      await bandeira.save();

      res.status(200).json(bandeira);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a bandeira.' });
    }
  },

  // Deletar uma bandeira
  async delete(req, res) {
    try {
      const { id } = req.params;

      const bandeira = await Bandeira.findByPk(id);
      if (!bandeira) {
        return res.status(404).json({ error: 'Bandeira não encontrada.' });
      }

      await bandeira.destroy();
      res.status(200).json({ message: 'Bandeira deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a bandeira.' });
    }
  },
};
