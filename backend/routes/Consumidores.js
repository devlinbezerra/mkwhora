const express = require('express');
const router = express.Router();
const ConsumidoresController = require('../controllers/ConsumidoresController');

// Listar consumidores formatados para campos select
router.get('/options', ConsumidoresController.getSelectOptions);

// Listar todos os subgrupos
router.get('/', ConsumidoresController.getAll);

// Buscar subgrupo por ID
router.get('/:id', ConsumidoresController.getById);

// Criar um novo subgrupo
router.post('/', ConsumidoresController.create);

// Atualizar um subgrupo existente
router.put('/:id', ConsumidoresController.update);

// Deletar um subgrupo
router.delete('/:id', ConsumidoresController.delete);

module.exports = router;
