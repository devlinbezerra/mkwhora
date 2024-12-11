const express = require('express');
const router = express.Router();
const UcsController = require('../controllers/UcsController');

// Listar todas as UCs
router.get('/', UcsController.getAll);

// Buscar UC por ID
router.get('/:id', UcsController.getById);

// Criar uma nova UC
router.post('/', UcsController.create);

// Atualizar uma UC existente
router.put('/:id', UcsController.update);

// Deletar uma UC
router.delete('/:id', UcsController.delete);

module.exports = router;
