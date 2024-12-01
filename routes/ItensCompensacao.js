const express = require('express');
const router = express.Router();
const ItensCompensacaoController = require('../controllers/ItensCompensacaoController');

// Listar todos os itens de compensação
router.get('/', ItensCompensacaoController.getAll);

// Buscar item de compensação por ID
router.get('/:id', ItensCompensacaoController.getById);

// Criar um novo item de compensação
router.post('/', ItensCompensacaoController.create);

// Atualizar um item de compensação existente
router.put('/:id', ItensCompensacaoController.update);

// Deletar um item de compensação
router.delete('/:id', ItensCompensacaoController.delete);

module.exports = router;
