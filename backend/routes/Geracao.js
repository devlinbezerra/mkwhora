const express = require('express');
const router = express.Router();
const GeracaoController = require('../controllers/GeracaoController');

// Listar todas as gerações
router.get('/', GeracaoController.getAll);

// Buscar geração por ID
router.get('/:id', GeracaoController.getById);

// Criar uma nova geração
router.post('/', GeracaoController.create);

// Atualizar uma geração existente
router.put('/:id', GeracaoController.update);

// Deletar uma geração
router.delete('/:id', GeracaoController.delete);

module.exports = router;
