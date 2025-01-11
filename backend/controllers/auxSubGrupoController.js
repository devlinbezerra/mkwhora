const AuxSubgrupo = require('../models/ModelAuxSubgrupo');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os subgrupos
  async getAll(req, res) {
    try {
      const subgrupos = await AuxSubgrupo.findAll();
      res.status(200).json(subgrupos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar subgrupos.' });
    }
  },

  // Listar subgrupos formatados para campos select
  async getSelectOptions(req, res) {
    try {
      const subgrupos = await AuxSubgrupo.findAll();

      // Formatar os consumidores para o formato esperado no select
      const options = subgrupos.map((subgrupo) => ({
        value: subgrupo.subgrupo, // ID usado no backend e enviado no formulário
        label: subgrupo.subgrupo // Nome exibido no dropdown
      }));

      res.status(200).json(options);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as opções de consumidores.' });
    }
  },

  // Buscar subgrupo por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const subgrupo = await AuxSubgrupo.findByPk(id);
      if (!subgrupo) {
        return res.status(404).json({ error: 'Subgrupo não encontrado.' });
      }
      res.status(200).json(subgrupo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o subgrupo.' });
    }
  },

// Criar um novo subgrupo
  async create(req, res) {
    try {
      const { grupo, subgrupo } = req.body;

      // Validação dos campos obrigatórios
      if (!grupo || !subgrupo) {
        return res.status(400).json({ error: 'Os campos grupo e subgrupo são obrigatórios.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(AuxSubgrupo, { grupo, subgrupo });

      // Cria o novo subgrupo no banco de dados
      const newSubgrupo = await AuxSubgrupo.create({ grupo, subgrupo });

      // Retorna o novo registro criado
      res.status(201).json(newSubgrupo);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },


  // Atualizar um subgrupo existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { grupo, subgrupo } = req.body;

      const registro = await AuxSubgrupo.findByPk(id);
      if (!registro) {
        return res.status(404).json({ error: 'Subgrupo não encontrado.' });
      }

      if (!grupo) {
        return res.status(400).json({ error: 'Grupo é obrigatória.' });
      }

      if (!subgrupo) {
        return res.status(400).json({ error: 'Subgrupo é obrigatória.' });
      }

      registro.grupo = grupo;
      registro.subgrupo = subgrupo;

      await registro.save();

      res.status(200).json(registro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o subgrupo.' });
    }
  },

  // Deletar um subgrupo
  async delete(req, res) {
    try {
      const { id } = req.params;

      const subgrupo = await AuxSubgrupo.findByPk(id);
      if (!subgrupo) {
        return res.status(404).json({ error: 'Subgrupo não encontrado.' });
      }

      await subgrupo.destroy();
      res.status(200).json({ message: 'Subgrupo deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o subgrupo.' });
    }
  },
};
