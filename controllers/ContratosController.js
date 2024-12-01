const Contratos = require('../models/ModelContratos');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os contratos
  async getAll(req, res) {
    try {
      const contratos = await Contratos.findAll();
      res.status(200).json(contratos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os contratos.' });
    }
  },

  // Buscar contrato por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const contrato = await Contratos.findByPk(id);
      if (!contrato) {
        return res.status(404).json({ error: 'Contrato não encontrado.' });
      }
      res.status(200).json(contrato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o contrato.' });
    }
  },

  // Criar um novo contrato
  async create(req, res) {
    try {
      const { id_consumidor, data_inicio, data_fim, desagio_a, desagio_b } = req.body;

      // Validação dos campos obrigatórios
      if (!id_consumidor || !data_inicio || !data_fim) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_consumidor, data_inicio e data_fim.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Contratos, { id_consumidor, data_inicio });

      // Cria o novo contrato no banco de dados
      const newContrato = await Contratos.create({
        id_consumidor,
        data_inicio,
        data_fim,
        desagio_a,
        desagio_b
      });

      // Retorna o novo registro criado
      res.status(201).json(newContrato);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar um contrato existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_consumidor, data_inicio, data_fim, desagio_a, desagio_b } = req.body;

      const contrato = await Contratos.findByPk(id);
      if (!contrato) {
        return res.status(404).json({ error: 'Contrato não encontrado.' });
      }

      // Atualiza os dados do contrato
      contrato.id_consumidor = id_consumidor;
      contrato.data_inicio = data_inicio;
      contrato.data_fim = data_fim;
      contrato.desagio_a = desagio_a;
      contrato.desagio_b = desagio_b;

      await contrato.save();

      res.status(200).json(contrato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o contrato.' });
    }
  },

  // Deletar um contrato
  async delete(req, res) {
    try {
      const { id } = req.params;

      const contrato = await Contratos.findByPk(id);
      if (!contrato) {
        return res.status(404).json({ error: 'Contrato não encontrado.' });
      }

      await contrato.destroy();
      res.status(200).json({ message: 'Contrato deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o contrato.' });
    }
  },
};
