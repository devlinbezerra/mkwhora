const ItensFatura = require('../models/ModelItensFatura');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os itens de fatura
  async getAll(req, res) {
    try {
      const itens = await ItensFatura.findAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os itens de fatura.' });
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
      res.status(500).json({ error: 'Erro ao buscar o item de fatura.' });
    }
  },

  // Criar um novo item de fatura
  async create(req, res) {
    try {
      const { nome, unidade, tarifa, saldo, injecao_usina, SCEE, ordem } = req.body;
      

      // Validação dos campos obrigatórios
      if (!nome || !saldo || !ordem) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, unidade e tarifa.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(ItensFatura, { nome });

      // Cria o novo item no banco de dados
      const newItem = await ItensFatura.create({
        nome,
        unidade,
        tarifa,
        saldo,
        injecao_usina,
        SCEE,
        ordem
      });

      // Retorna o novo registro criado
      res.status(201).json(newItem);
    } catch (error) {
     
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', details: error.message });
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
      itemRecord.nome = nome;
      itemRecord.unidade = unidade;
      itemRecord.tarifa = tarifa;
      itemRecord.saldo = saldo;
      itemRecord.injecao_usina = injecao_usina;
      itemRecord.SCEE = SCEE;
      itemRecord.ordem = ordem;

      await itemRecord.save();

      res.status(200).json(itemRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o item de fatura.' });
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
      res.status(500).json({ error: 'Erro ao deletar o item de fatura.' });
    }
  },
};
