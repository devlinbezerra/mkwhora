const express = require('express');
const router = express.Router();
const BandeiraController = require('../controllers/BandeiraController');

// Listar todos os contratos
router.get('/', BandeiraController.getAll);

// Buscar contrato por ID
router.get('/:id', BandeiraController.getById);

// Criar um novo contrato
router.post('/', BandeiraController.create);

// Atualizar um contrato existente
router.put('/:id', BandeiraController.update);

// Deletar um contrato
router.delete('/:id', BandeiraController.delete);

module.exports = router;
