const Revisao = require('../models/ModelRevisao');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as revisões
  async getAll(req, res) {
    try {
      const revisoes = await Revisao.findAll();
      res.status(200).json(revisoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as revisões.' });
    }
  },

  // Buscar revisão por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const revisao = await Revisao.findByPk(id);
      if (!revisao) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }
      res.status(200).json(revisao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a revisão.' });
    }
  },

  // Criar uma nova revisão
  async create(req, res) {
    try {
      const { agencia, nome, data_revisao, arquivo } = req.body;

      // Validação dos campos obrigatórios
      if (!agencia || !nome || !data_revisao) {
        return res.status(400).json({ error: 'Campos obrigatórios: agencia, nome e data_revisao.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Revisao, { agencia, data_revisao });

      // Cria a nova revisão no banco de dados
      const newRevisao = await Revisao.create({
        agencia,
        nome,
        data_revisao,
        arquivo
      });

      // Retorna o novo registro criado
      res.status(201).json(newRevisao);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma revisão existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { agencia, nome, data_revisao, arquivo } = req.body;

      const revisaoRecord = await Revisao.findByPk(id);
      if (!revisaoRecord) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }

      // Atualiza os dados da revisão
      revisaoRecord.agencia = agencia;
      revisaoRecord.nome = nome;
      revisaoRecord.data_revisao = data_revisao;
      revisaoRecord.arquivo = arquivo;

      await revisaoRecord.save();

      res.status(200).json(revisaoRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a revisão.' });
    }
  },

  // Deletar uma revisão
  async delete(req, res) {
    try {
      const { id } = req.params;

      const revisaoRecord = await Revisao.findByPk(id);
      if (!revisaoRecord) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }

      await revisaoRecord.destroy();
      res.status(200).json({ message: 'Revisão deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a revisão.' });
    }
  },
};
