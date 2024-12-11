const Ucs = require('../models/ModelUcs');
const UcsContrato = require('../models/ModelUcsContrato');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as UCs
  async getAll(req, res) {
    try {
      const ucs = await Ucs.findAll();
      res.status(200).json(ucs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as UCs.' });
    }
  },

  // Buscar UC por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const uc = await Ucs.findByPk(id);
      if (!uc) {
        return res.status(404).json({ error: 'UC não encontrada.' });
      }
      res.status(200).json(uc);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a UC.' });
    }
  },

  // Criar uma nova UC
  async create(req, res) {
    try {
      const {
        codigo_uc,
        codigo_instalacao,
        grupo,
        subgrupo,
        optante_bt,
        tipo_ligacao,
        tensao,
        consumidor,
        titularidade,
        cnpj_titular,
        modalidade,
        localizacao,
        desagio,
        autoconsumo_remoto,
        id_contrato
      } = req.body;

      // Validação dos campos obrigatórios (ajuste conforme necessidade)
      if (!codigo_uc || !grupo || !subgrupo) {
        return res.status(400).json({ error: 'Campos obrigatórios: codigo_uc, grupo e subgrupo.', details: error.message });
      }

      // Validação de duplicidade
      await checkDuplicidade(Ucs, { codigo_uc });

      //Faltou associar a UC a um contrato

      // Cria a nova UC no banco de dados
      const newUc = await Ucs.create({
        codigo_uc,
        codigo_instalacao,
        grupo,
        subgrupo,
        optante_bt,
        tipo_ligacao,
        tensao,
        consumidor,
        titularidade,
        cnpj_titular,
        modalidade,
        localizacao,
        desagio,
        autoconsumo_remoto
      });

      //Assoicar UC ao contrato
      const id_uc = newUc.id_uc;
      try{
        UcsContrato.create({
          id_uc,
          id_contrato
        })
      } catch(error){
        res.status(500).json({ error: 'Erro ao criar o subgrupo.', details: error.message  });
      }

      // Retorna o novo registro criado
      res.status(201).json(newUc);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', details: error.message  });
    }
  },

  // Atualizar uma UC existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        codigo_uc,
        codigo_instalacao,
        grupo,
        subgrupo,
        optante_bt,
        tipo_ligacao,
        tensao,
        consumidor,
        titularidade,
        cnpj_titular,
        modalidade,
        localizacao,
        desagio,
        autoconsumo_remoto
      } = req.body;

      const ucRecord = await Ucs.findByPk(id);
      if (!ucRecord) {
        return res.status(404).json({ error: 'UC não encontrada.' });
      }

      // Atualiza os dados da UC
      ucRecord.codigo_uc = codigo_uc;
      ucRecord.codigo_instalacao = codigo_instalacao;
      ucRecord.grupo = grupo;
      ucRecord.subgrupo = subgrupo;
      ucRecord.optante_bt = optante_bt;
      ucRecord.tipo_ligacao = tipo_ligacao;
      ucRecord.tensao = tensao;
      ucRecord.consumidor = consumidor;
      ucRecord.titularidade = titularidade;
      ucRecord.cnpj_titular = cnpj_titular;
      ucRecord.modalidade = modalidade;
      ucRecord.localizacao = localizacao;
      ucRecord.desagio = desagio;
      ucRecord.autoconsumo_remoto = autoconsumo_remoto;

      await ucRecord.save();

      res.status(200).json(ucRecord);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a UC.' });
    }
  },

  // Deletar uma UC
  async delete(req, res) {
    try {
      const { id } = req.params;

      const ucRecord = await Ucs.findByPk(id);
      if (!ucRecord) {
        return res.status(404).json({ error: 'UC não encontrada.' });
      }

      await ucRecord.destroy();
      res.status(200).json({ message: 'UC deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a UC.' });
    }
  },
};
