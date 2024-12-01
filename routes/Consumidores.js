const express = require('express');
const router = express.Router();
const CondumidoresController = require('../controllers/ConsumidoresController');

// Listar todos os subgrupos
router.get('/', CondumidoresController.getAll);

// Buscar subgrupo por ID
router.get('/:id', CondumidoresController.getById);

// Criar um novo subgrupo
router.post('/', CondumidoresController.create);

// Atualizar um subgrupo existente
router.put('/:id', CondumidoresController.update);

// Deletar um subgrupo
router.delete('/:id', CondumidoresController.delete);

module.exports = router;
