const express = require('express');
const router = express.Router();
const TarifasController = require('../controllers/TarifasController');

// Listar todas as tarifas
router.get('/', TarifasController.getAll);

// Buscar tarifa por ID
router.get('/:id', TarifasController.getById);

// Criar uma nova tarifa
router.post('/', TarifasController.create);

// Atualizar uma tarifa existente
router.put('/:id', TarifasController.update);

// Deletar uma tarifa
router.delete('/:id', TarifasController.delete);

module.exports = router;
