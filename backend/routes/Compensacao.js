const express = require('express');
const router = express.Router();
const Compensacao = require('../controllers/CompensacaoController');

// Listar todas as modalidades
router.get('/', Compensacao.getAll);

// Buscar modalidade por ID
router.get('/:id', Compensacao.getById);

// Criar uma nova modalidade
router.post('/', Compensacao.create);

// Atualizar uma modalidade existente
router.put('/:id', Compensacao.update);

// Deletar uma modalidade
router.delete('/:id', Compensacao.delete);

module.exports = router;
