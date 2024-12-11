const express = require('express');
const router = express.Router();
const FaturasUsinaController = require('../controllers/FaturasUsinaController');

// Listar todos os contratos
router.get('/', FaturasUsinaController.getAll);

// Buscar contrato por ID
router.get('/:id', FaturasUsinaController.getById);

// Criar um novo contrato
router.post('/', FaturasUsinaController.create);

// Atualizar um contrato existente
router.put('/:id', FaturasUsinaController.update);

// Deletar um contrato
router.delete('/:id', FaturasUsinaController.delete);

module.exports = router;
