const express = require('express');
const router = express.Router();
const ItensFaturaController = require('../controllers/ItensFaturaController');

// Listar todos os itens de fatura
router.get('/', ItensFaturaController.getAll);

// Buscar item de fatura por ID
router.get('/:id', ItensFaturaController.getById);

// Criar um novo item de fatura
router.post('/', ItensFaturaController.create);

// Atualizar um item de fatura existente
router.put('/:id', ItensFaturaController.update);

// Deletar um item de fatura
router.delete('/:id', ItensFaturaController.delete);

module.exports = router;
