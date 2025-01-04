const AuxUsinas = require('../models/ModelAuxUsinas');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as usinas
  async getAll(req, res) {
    try {
      const usinas = await AuxUsinas.findAll();
      res.status(200).json(usinas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as usinas.', details: error.message });
    }
  },

  // Buscar usina por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const usina = await AuxUsinas.findByPk(id);
      if (!usina) {
        return res.status(404).json({ error: 'Usina não encontrada.' });
      }
      res.status(200).json(usina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a usina.' });
    }
  },

  // Criar uma nova usina
  async create(req, res) {
    try {
      const { descricao, potencia, tipo } = req.body;

      // Validação dos campos obrigatórios
      if (!descricao || !potencia || !tipo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(AuxUsinas, { descricao });

      // Cria a nova usina no banco de dados
      const newUsina = await AuxUsinas.create({ descricao, potencia, tipo });

      // Retorna o novo registro criado
      res.status(201).json(newUsina);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma usina existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { descricao, potencia, tipo } = req.body;

      const usina = await AuxUsinas.findByPk(id);
      if (!usina) {
        return res.status(404).json({ error: 'Usina não encontrada.' });
      }

      // Validação dos campos obrigatórios
      if (!descricao || !potencia || !tipo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Atualiza os dados da usina
      usina.descricao = descricao;
      usina.potencia = potencia;
      usina.tipo = tipo;

      await usina.save();

      res.status(200).json(usina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a usina.' });
    }
  },

  // Deletar uma usina
  async delete(req, res) {
    try {
      const { id } = req.params;

      const usina = await AuxUsinas.findByPk(id);
      if (!usina) {
        return res.status(404).json({ error: 'Usina não encontrada.' });
      }

      await usina.destroy();
      res.status(200).json({ message: 'Usina deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a usina.' });
    }
  },
};
