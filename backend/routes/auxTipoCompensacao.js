const express = require('express');
const router = express.Router();
const AuxTipoCompensacaoController = require('../controllers/AuxTipoCompensacaoController');

// Listar todos os subgrupos
router.get('/', AuxTipoCompensacaoController.getAll);

// Buscar subgrupo por ID
router.get('/:id', AuxTipoCompensacaoController.getById);

// Criar um novo subgrupo
router.post('/', AuxTipoCompensacaoController.create);

// Atualizar um subgrupo existente
router.put('/:id', AuxTipoCompensacaoController.update);

// Deletar um subgrupo
router.delete('/:id', AuxTipoCompensacaoController.delete);

module.exports = router;
