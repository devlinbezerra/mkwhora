const express = require('express');
const router = express.Router();
const AuxUsinasController = require('../controllers/AuxUsinasController');

// Listar todos os subgrupos
router.get('/', AuxUsinasController.getAll);

// Buscar subgrupo por ID
router.get('/:id', AuxUsinasController.getById);

// Criar um novo subgrupo
router.post('/', AuxUsinasController.create);

// Atualizar um subgrupo existente
router.put('/:id', AuxUsinasController.update);

// Deletar um subgrupo
router.delete('/:id', AuxUsinasController.delete);

module.exports = router;
