const express = require('express');
const router = express.Router();
const ItensFaturaAgenciaController = require('../controllers/ItensFaturaAgenciaController');

// Listar todos os itens de fatura da agência
router.get('/', ItensFaturaAgenciaController.getAll);

// Buscar item de fatura da agência por ID
router.get('/:id', ItensFaturaAgenciaController.getById);

// Criar um novo item de fatura da agência
router.post('/', ItensFaturaAgenciaController.create);

// Atualizar um item de fatura da agência existente
router.put('/:id', ItensFaturaAgenciaController.update);

// Deletar um item de fatura da agência
router.delete('/:id', ItensFaturaAgenciaController.delete);

module.exports = router;
