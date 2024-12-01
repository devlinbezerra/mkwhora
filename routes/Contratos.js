const express = require('express');
const router = express.Router();
const ContratosController = require('../controllers/ContratosController');

// Listar todos os contratos
router.get('/', ContratosController.getAll);

// Buscar contrato por ID
router.get('/:id', ContratosController.getById);

// Criar um novo contrato
router.post('/', ContratosController.create);

// Atualizar um contrato existente
router.put('/:id', ContratosController.update);

// Deletar um contrato
router.delete('/:id', ContratosController.delete);

module.exports = router;
