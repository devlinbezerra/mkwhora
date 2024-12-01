const ItensCompensacao = require('../models/ModelItensCompensacao');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os itens de compensação
  async getAll(req, res) {
    try {
      const itens = await ItensCompensacao.findAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os itens de compensação.' });
    }
  },

  // Buscar item de compensação por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await ItensCompensacao.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item de compensação não encontrado.' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o item de compensação.' });
    }
  },

  // Criar um novo item de compensação
  async create(req, res) {
    try {
      const { id_compensacao, item, posto_tarifario } = req.body;

      // Validação dos campos obrigatórios
      if (!id_compensacao || !posto_tarifario) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_compensacao e posto_tarifario.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(ItensCompensacao, { id_compensacao, item, posto_tarifario });

      // Cria o novo item no banco de dados
      const newItem = await ItensCompensacao.create({
        id_compensacao,
        item,
        posto_tarifario
      });

      // Retorna o novo registro criado
      res.status(201).json(newItem);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar um item de compensação existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_compensacao, item, posto_tarifario } = req.body;

      const itemRecord = await ItensCompensacao.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de compensação não encontrado.' });
      }

      // Atualiza os dados do item de compensação
      itemRecord.id_compensacao = id_compensacao;
      itemRecord.item = item;
      itemRecord.posto_tarifario = posto_tarifario;

      await itemRecord.save();

      res.status(200).json(itemRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o item de compensação.' });
    }
  },

  // Deletar um item de compensação
  async delete(req, res) {
    try {
      const { id } = req.params;

      const itemRecord = await ItensCompensacao.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de compensação não encontrado.' });
      }

      await itemRecord.destroy();
      res.status(200).json({ message: 'Item de compensação deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o item de compensação.' });
    }
  },
};
