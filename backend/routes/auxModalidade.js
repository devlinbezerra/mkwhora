const express = require('express');
const router = express.Router();
const AuxModalidadeController = require('../controllers/auxModalidadeController');

// Listar todas as modalidades
router.get('/', AuxModalidadeController.getAll);

// Buscar modalidade por ID
router.get('/:id', AuxModalidadeController.getById);

// Criar uma nova modalidade
router.post('/', AuxModalidadeController.create);

// Atualizar uma modalidade existente
router.put('/:id', AuxModalidadeController.update);

// Deletar uma modalidade
router.delete('/:id', AuxModalidadeController.delete);

module.exports = router;
