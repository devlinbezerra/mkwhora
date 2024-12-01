const express = require('express');
const router = express.Router();
const RevisaoController = require('../controllers/RevisaoController');

// Listar todas as revisões
router.get('/', RevisaoController.getAll);

// Buscar revisão por ID
router.get('/:id', RevisaoController.getById);

// Criar uma nova revisão
router.post('/', RevisaoController.create);

// Atualizar uma revisão existente
router.put('/:id', RevisaoController.update);

// Deletar uma revisão
router.delete('/:id', RevisaoController.delete);

module.exports = router;
