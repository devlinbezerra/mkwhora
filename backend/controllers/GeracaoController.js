const Geracao = require('../models/ModelGeracao');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as gerações
  async getAll(req, res) {
    try {
      const geracoes = await Geracao.findAll();
      res.status(200).json(geracoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as gerações.' });
    }
  },

  // Buscar geração por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const geracao = await Geracao.findByPk(id);
      if (!geracao) {
        return res.status(404).json({ error: 'Geração não encontrada.' });
      }
      res.status(200).json(geracao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a geração.' });
    }
  },

  // Criar uma nova geração
  async create(req, res) {
    try {
      const { unidade, mes_ano, geracao } = req.body;

      // Validação dos campos obrigatórios
      if (!unidade || !mes_ano || !geracao) {
        return res.status(400).json({ error: 'Campos obrigatórios: unidade, mes_ano e geracao.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Geracao, { unidade, mes_ano });

      // Cria a nova geração no banco de dados
      const newGeracao = await Geracao.create({ unidade, mes_ano, geracao });

      // Retorna o novo registro criado
      res.status(201).json(newGeracao);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma geração existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { unidade, mes_ano, geracao } = req.body;

      const geracaoRecord = await Geracao.findByPk(id);
      if (!geracaoRecord) {
        return res.status(404).json({ error: 'Geração não encontrada.' });
      }

      // Atualiza os dados da geração
      geracaoRecord.unidade = unidade;
      geracaoRecord.mes_ano = mes_ano;
      geracaoRecord.geracao = geracao;

      await geracaoRecord.save();

      res.status(200).json(geracaoRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a geração.' });
    }
  },

  // Deletar uma geração
  async delete(req, res) {
    try {
      const { id } = req.params;

      const geracaoRecord = await Geracao.findByPk(id);
      if (!geracaoRecord) {
        return res.status(404).json({ error: 'Geração não encontrada.' });
      }

      await geracaoRecord.destroy();
      res.status(200).json({ message: 'Geração deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a geração.' });
    }
  },
};
