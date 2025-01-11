const express = require('express');
const router = express.Router();
const AuxSubgrupoController = require('../controllers/auxSubGrupoController');

// Listar subgrupos formatados para campos select
router.get('/options', AuxSubgrupoController.getSelectOptions);

// Listar todos os subgrupos
router.get('/', AuxSubgrupoController.getAll);

// Buscar subgrupo por ID
router.get('/:id', AuxSubgrupoController.getById);

// Criar um novo subgrupo
router.post('/', AuxSubgrupoController.create);

// Atualizar um subgrupo existente
router.put('/:id', AuxSubgrupoController.update);

// Deletar um subgrupo
router.delete('/:id', AuxSubgrupoController.delete);

module.exports = router;
