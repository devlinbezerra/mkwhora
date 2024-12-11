const express = require('express');
const router = express.Router();
const FaturasAgenciaController = require('../controllers/FaturasAgenciaController');
const { route } = require('./ItensFaturaAgencia');

// Listar dados para faturar de uma fatura específica da agência
router.get('/lista/:id_fatura_agencia?', FaturasAgenciaController.listaFaturas);

// Listar os dados de todas as faturas da agência para faturar
router.get('/lista', FaturasAgenciaController.listaFaturas);

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
