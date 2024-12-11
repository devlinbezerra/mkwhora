const Consumidores = require('../models/ModelConsumidores');
const checkDuplicidade = require('../services/checkDuplicidade');

module.exports = {
  // Listar todos os consumidores
  async getAll(req, res) {
    try {
      const consumidores = await Consumidores.findAll();
      res.status(200).json(consumidores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os consumidores.' });
    }
  },

  // Buscar consumidor por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const consumidor = await Consumidores.findByPk(id);
      if (!consumidor) {
        return res.status(404).json({ error: 'Consumidor não encontrado.' });
      }
      res.status(200).json(consumidor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o consumidor.' });
    }
  },

  // Criar um novo consumidor
  async create(req, res) {
    try {
      const { 
        cnpj, 
        razao_social, 
        nome_fantasia, 
        email_responsavel, 
        telefone_responsavel, 
        cpf_responsavel, 
        nome_financeiro, 
        email_financeiro, 
        telefone_financeiro, 
        whatsapp 
      } = req.body;

      // Validação dos campos obrigatórios (ajuste conforme necessidade)
      if (!cnpj || !razao_social || !nome_fantasia) {
        return res.status(400).json({ error: 'Campos obrigatórios: cnpj, razao_social e nome_fantasia.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(Consumidores, { cnpj });

      // Cria o novo consumidor no banco de dados
      const newConsumidor = await Consumidores.create({
        cnpj,
        razao_social,
        nome_fantasia,
        email_responsavel,
        telefone_responsavel,
        cpf_responsavel,
        nome_financeiro,
        email_financeiro,
        telefone_financeiro,
        whatsapp
      });

      // Retorna o novo registro criado
      res.status(201).json(newConsumidor);
    } catch (error) {
      
      // Verifica a mensagem do erro para identificar duplicidade
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message }); // Retorna erro 400 com a mensagem correta
      }

      res.status(500).json({ error: 'Erro ao criar o consumidor.', details: error.message });
    }
  },

  // Atualizar um consumidor existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { 
        cnpj, 
        razao_social, 
        nome_fantasia, 
        email_responsavel, 
        telefone_responsavel, 
        cpf_responsavel, 
        nome_financeiro, 
        email_financeiro, 
        telefone_financeiro, 
        whatsapp 
      } = req.body;

      const consumidor = await Consumidores.findByPk(id);
      if (!consumidor) {
        return res.status(404).json({ error: 'Consumidor não encontrado.' });
      }

      // Atualiza os dados do consumidor
      consumidor.cnpj = cnpj;
      consumidor.razao_social = razao_social;
      consumidor.nome_fantasia = nome_fantasia;
      consumidor.email_responsavel = email_responsavel;
      consumidor.telefone_responsavel = telefone_responsavel;
      consumidor.cpf_responsavel = cpf_responsavel;
      consumidor.nome_financeiro = nome_financeiro;
      consumidor.email_financeiro = email_financeiro;
      consumidor.telefone_financeiro = telefone_financeiro;
      consumidor.whatsapp = whatsapp;

      await consumidor.save();

      res.status(200).json(consumidor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o consumidor.' });
    }
  },

  // Deletar um consumidor
  async delete(req, res) {
    try {
      const { id } = req.params;

      const consumidor = await Consumidores.findByPk(id);
      if (!consumidor) {
        return res.status(404).json({ error: 'Consumidor não encontrado.' });
      }

      await consumidor.destroy();
      res.status(200).json({ message: 'Consumidor deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o consumidor.' });
    }
  },
};
