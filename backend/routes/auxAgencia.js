const express = require('express');
const router = express.Router();
const AuxAgenciaController = require('../controllers/auxAgenciaController');

// Listar todos os subgrupos
router.get('/', AuxAgenciaController.getAll);

// Buscar subgrupo por ID
router.get('/:id', AuxAgenciaController.getById);

// Criar um novo subgrupo
router.post('/', AuxAgenciaController.create);

// Atualizar um subgrupo existente
router.put('/:id', AuxAgenciaController.update);

// Deletar um subgrupo
router.delete('/:id', AuxAgenciaController.delete);

module.exports = router;
