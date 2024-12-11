const Tarifas = require('../models/ModelTarifas');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as tarifas
  async getAll(req, res) {
    try {
      const tarifas = await Tarifas.findAll();
      res.status(200).json(tarifas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as tarifas.' });
    }
  },

  // Buscar tarifa por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const tarifa = await Tarifas.findByPk(id);
      if (!tarifa) {
        return res.status(404).json({ error: 'Tarifa não encontrada.' });
      }
      res.status(200).json(tarifa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a tarifa.', details: error.message });
    }
  },

  // Criar uma nova tarifa
  async create(req, res) {
    try {
      const { subgrupo, posto_tarifario, tarifa_tusd, tarifa_te, tarifa_total, revisao_tarifaria, modalidade } = req.body;

      // Validação dos campos obrigatórios
      if (!subgrupo || !posto_tarifario) {
        return res.status(400).json({ error: 'Campos obrigatórios: subgrupo e posto_tarifario.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Tarifas, { subgrupo, posto_tarifario, revisao_tarifaria, modalidade });
      

      // Cria a nova tarifa no banco de dados
      const newTarifa = await Tarifas.create({
        subgrupo,
        posto_tarifario,
        tarifa_tusd,
        tarifa_te,
        tarifa_total,
        revisao_tarifaria,
        modalidade
      });

      // Retorna o novo registro criado
      res.status(201).json(newTarifa);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma tarifa existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { subgrupo, posto_tarifario, tarifa_tusd, tarifa_te, tarifa_total, revisao_tarifaria, modalidade } = req.body;

      const tarifaRecord = await Tarifas.findByPk(id);
      if (!tarifaRecord) {
        return res.status(404).json({ error: 'Tarifa não encontrada.' });
      }

      // Atualiza os dados da tarifa
      tarifaRecord.subgrupo = subgrupo;
      tarifaRecord.posto_tarifario = posto_tarifario;
      tarifaRecord.tarifa_tusd = tarifa_tusd;
      tarifaRecord.tarifa_te = tarifa_te;
      tarifaRecord.tarifa_total = tarifa_total;
      tarifaRecord.revisao_tarifaria = revisao_tarifaria;
      tarifaRecord.modalidade = modalidade;

      await tarifaRecord.save();

      res.status(200).json(tarifaRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a tarifa.' , details: error.message  });
    }
  },

  // Deletar uma tarifa
  async delete(req, res) {
    try {
      const { id } = req.params;

      const tarifaRecord = await Tarifas.findByPk(id);
      if (!tarifaRecord) {
        return res.status(404).json({ error: 'Tarifa não encontrada.' });
      }

      await tarifaRecord.destroy();
      res.status(200).json({ message: 'Tarifa deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a tarifa.' });
    }
  },
};
