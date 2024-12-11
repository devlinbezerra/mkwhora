const express = require('express');
const router = express.Router();
const UcsContratoController = require('../controllers/UcsContratoController');

// Listar todos os registros de UCs e contratos
router.get('/', UcsContratoController.getAll);

// Buscar registro por ID
router.get('/:id', UcsContratoController.getById);

// Criar um novo registro de UC e contrato
router.post('/', UcsContratoController.create);

// Atualizar um registro existente de UC e contrato
router.put('/:id', UcsContratoController.update);

// Deletar um registro de UC e contrato
router.delete('/:id', UcsContratoController.delete);

module.exports = router;
