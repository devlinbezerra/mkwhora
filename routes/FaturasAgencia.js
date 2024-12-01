const express = require('express');
const router = express.Router();
const FaturasAgenciaController = require('../controllers/FaturasAgenciaController');
const { route } = require('./ItensFaturaAgencia');

//Pega o total da fatura
router.get('/total/:id', FaturasAgenciaController.getTotal);

// Listar todas as faturas da agência
router.get('/', FaturasAgenciaController.getAll);

// Buscar fatura da agência por ID
router.get('/:id', FaturasAgenciaController.getById);

// Criar uma nova fatura da agência
router.post('/', FaturasAgenciaController.create);

// Atualizar uma fatura da agência existente
router.put('/:id', FaturasAgenciaController.update);

// Deletar uma fatura da agência
router.delete('/:id', FaturasAgenciaController.delete);

module.exports = router;
