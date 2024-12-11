const AuxAgencia = require('../models/ModelAuxAgencia');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todas as agências
  async getAll(req, res) {
    try {
      const agencias = await AuxAgencia.findAll();
      res.status(200).json(agencias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar agências.' });
    }
  },

  // Buscar agência por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const agencia = await AuxAgencia.findByPk(id);
      if (!agencia) {
        return res.status(404).json({ error: 'Agência não encontrada.' });
      }
      res.status(200).json(agencia);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a agência.' });
    }
  },

  // Criar uma nova agência
  async create(req, res) {
    try {
      const { nome, cnpj, link_faturas, telefone_suporte, email_suporte } = req.body;

      // Validação de duplicidade
      await checkDuplicidade(AuxAgencia, { cnpj });

      // Validação dos campos obrigatórios
      if (!nome || !cnpj || !link_faturas || !telefone_suporte || !email_suporte) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Cria a nova agência no banco de dados
      const newAgencia = await AuxAgencia.create({ nome, cnpj, link_faturas, telefone_suporte, email_suporte });

      // Retorna o novo registro criado
      res.status(201).json(newAgencia);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o subgrupo.', /* details: error.message */ });
    }
  },

  // Atualizar uma agência existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj, link_faturas, telefone_suporte, email_suporte } = req.body;

      const agencia = await AuxAgencia.findByPk(id);
      if (!agencia) {
        return res.status(404).json({ error: 'Agência não encontrada.' });
      }

      // Validação dos campos obrigatórios
      if (!nome || !cnpj || !link_faturas || !telefone_suporte || !email_suporte) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Atualiza os dados da agência
      agencia.nome = nome;
      agencia.cnpj = cnpj;
      agencia.link_faturas = link_faturas;
      agencia.telefone_suporte = telefone_suporte;
      agencia.email_suporte = email_suporte;

      await agencia.save();

      res.status(200).json(agencia);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a agência.' });
    }
  },

  // Deletar uma agência
  async delete(req, res) {
    try {
      const { id } = req.params;

      const agencia = await AuxAgencia.findByPk(id);
      if (!agencia) {
        return res.status(404).json({ error: 'Agência não encontrada.' });
      }

      await agencia.destroy();
      res.status(200).json({ message: 'Agência deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a agência.' });
    }
  },
};
