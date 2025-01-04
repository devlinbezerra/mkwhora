const ItensFatura = require('../models/ModelItensFatura');
const { Op } = require('sequelize');

module.exports = {
  // Listar todos os itens de fatura com paginação e filtros
  async getAll(req, res) {
    console.log(req.query);
    try {
      // Extrai parâmetros de paginação e filtros da query
      const {
        page = 0, // Página atual (default: 0)
        limit = 2, // Registros por página (default: 10)
        filter, // Filtro (nome ou outro campo)
        sortField = 'id', // Campo para ordenação (default: 'id')
        sortOrder = 'ASC', // Ordem da ordenação (default: 'ASC')
      } = req.query;

      const offset = parseInt(page) * parseInt(limit); // Calcula o deslocamento
      const where = {};

      // Adiciona filtros à consulta, se fornecidos
      if (filter) {
        where.nome = { [Op.like]: `%${filter}%` }; // Exemplo: filtro por nome
      }

      // Busca os itens de fatura com paginação, filtros e ordenação
      const { count: total, rows: items } = await ItensFatura.findAndCountAll({
        where,
        offset,
        limit: parseInt(limit),
        order: [[sortField, sortOrder.toUpperCase()]],
      });

      // Retorna os itens e o total de registros
      res.status(200).json({ items, total });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os itens de fatura.', details: error.message });
    }
  },

  // Buscar item de fatura por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await ItensFatura.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: 'Item de fatura não encontrado.' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o item de fatura.', details: error.message });
    }
  },

  // Criar um novo item de fatura
  async create(req, res) {
    try {
      const { nome, unidade, tarifa, saldo, injecao_usina, SCEE, ordem } = req.body;

      // Validação dos campos obrigatórios
      if (!nome || !ordem) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome e ordem.' });
      }

      // Cria o novo item no banco de dados
      const newItem = await ItensFatura.create({
        nome,
        unidade,
        tarifa,
        saldo,
        injecao_usina,
        SCEE,
        ordem,
      });

      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o item de fatura.', details: error.message });
    }
  },

  // Atualizar um item de fatura existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, unidade, tarifa, saldo, injecao_usina, SCEE, ordem } = req.body;

      const itemRecord = await ItensFatura.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de fatura não encontrado.' });
      }

      // Atualiza os dados do item de fatura
      Object.assign(itemRecord, { nome, unidade, tarifa, saldo, injecao_usina, SCEE, ordem });

      await itemRecord.save();

      res.status(200).json(itemRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o item de fatura.', details: error.message });
    }
  },

  // Deletar um item de fatura
  async delete(req, res) {
    try {
      const { id } = req.params;

      const itemRecord = await ItensFatura.findByPk(id);
      if (!itemRecord) {
        return res.status(404).json({ error: 'Item de fatura não encontrado.' });
      }

      await itemRecord.destroy();
      res.status(200).json({ message: 'Item de fatura deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o item de fatura.', details: error.message });
    }
  },
};
