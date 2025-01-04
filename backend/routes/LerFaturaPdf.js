const express = require('express');
const router = express.Router();
const multer = require('multer');
const LerFaturaPdf = require('../controllers/LerFaturaPdf');

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Listar dados para faturar de uma fatura específica da agência
router.post('/', LerFaturaPdf.uploadFile, LerFaturaPdf.extractConsumptionValue);


module.exports = router;
