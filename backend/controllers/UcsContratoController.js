const UcsContrato = require('../models/ModelUcsContrato');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os registros de UCs e contratos
  async getAll(req, res) {
    try {
      const ucsContratos = await UcsContrato.findAll();
      res.status(200).json(ucsContratos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os registros de UCs e contratos.' });
    }
  },

  // Buscar registro por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const ucContrato = await UcsContrato.findByPk(id);
      if (!ucContrato) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
      res.status(200).json(ucContrato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o registro.' });
    }
  },

  // Criar um novo registro
  async create(req, res) {
    try {
      const { id_contrato, id_uc } = req.body;

      // Validação dos campos obrigatórios
      if (!id_contrato || !id_uc) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_contrato e id_uc.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(UcsContrato, { id_contrato, id_uc });

      // Cria o novo registro no banco de dados
      const newUcContrato = await UcsContrato.create({
        id_contrato,
        id_uc,
      });

      // Retorna o novo registro criado
      res.status(201).json(newUcContrato);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar um registro existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_contrato, id_uc } = req.body;

      const ucContratoRecord = await UcsContrato.findByPk(id);
      if (!ucContratoRecord) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      // Atualiza os dados do registro
      ucContratoRecord.id_contrato = id_contrato;
      ucContratoRecord.id_uc = id_uc;

      await ucContratoRecord.save();

      res.status(200).json(ucContratoRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o registro.' });
    }
  },

  // Deletar um registro
  async delete(req, res) {
    try {
      const { id } = req.params;

      const ucContratoRecord = await UcsContrato.findByPk(id);
      if (!ucContratoRecord) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      await ucContratoRecord.destroy();
      res.status(200).json({ message: 'Registro deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o registro.' });
    }
  },
};
