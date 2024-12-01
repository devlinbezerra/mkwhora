const express = require('express');
const router = express.Router();

// Importa as rotas individuais
const auxSubgrupoRoutes = require('./auxSubGrupo');
const auxAgenciaRoutes = require('./auxAgencia');
const AuxModalidadeRoutes = require('./auxModalidade');
const AuxPostoTarifarioRoutes = require('./auxPostoTarifario');
const auxTipoCompensacaoRoutes = require('./auxTipoCompensacao');
const AuxUsinasRoutes = require('./auxUsinas');
const Compensacao = require('./Compensacao');
const Consumidores = require('./Consumidores');
const Contratos = require('./Contratos');
const FaturasAgencia = require('./FaturasAgencia');
const Geracao = require('./Geracao');
const ItensCompensacao = require('./ItensCompensacao');
const ItensFatura = require('./ItensFatura');
const ItensFaturaAgencia = require('./ItensFaturaAgencia');
const Revisao = require('./Revisao');
const Tarifas = require('./Tarifas');
const Ucs = require('./Ucs');
const UcsContrato = require('./UcsContrato');

// Define os endpoints para cada conjunto de rotas
router.use('/subgrupos', auxSubgrupoRoutes);
router.use('/agencias', auxAgenciaRoutes);
router.use('/modalidades', AuxModalidadeRoutes);
router.use('/postotarifarios', AuxPostoTarifarioRoutes);
router.use('/tipocompensacao', auxTipoCompensacaoRoutes);
router.use('/usinas', AuxUsinasRoutes);
router.use('/compensacao', Compensacao);
router.use('/consumidores', Consumidores);
router.use('/contratos', Contratos);
router.use('/faturasagencia', FaturasAgencia);
router.use('/geracao', Geracao);
router.use('/itenscompensacao', ItensCompensacao);
router.use('/itensfatura', ItensFatura);
router.use('/itensfaturaagencia', ItensFaturaAgencia);
router.use('/revisao', Revisao);
router.use('/tarifas', Tarifas);
router.use('/ucs', Ucs);
router.use('/ucscontrato', UcsContrato);

module.exports = router;
