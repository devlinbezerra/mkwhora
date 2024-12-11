const ModelFaturasUsina = require('../models/ModelFaturasUsina');
const checkDuplicidade = require('../services/checkDuplicidade');
const listaFatura = require('../services/listaFaturas');
const atualizaStatus = require('../services/atualizarStatusFatura');

module.exports = {

  // Listar todas as faturas de usina
  async getAll(req, res) {
    try {
      const faturasUsina = await ModelFaturasUsina.findAll();
      res.status(200).json(faturasUsina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar faturas de usina.' });
    }
  },

  // Buscar fatura de usina por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const faturaUsina = await ModelFaturasUsina.findByPk(id);

      if (!faturaUsina) {
        return res.status(404).json({ error: 'Fatura de usina não encontrada.' });
      }

      res.status(200).json(faturaUsina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a fatura de usina.' });
    }
  },

  // Criar uma nova fatura de usina
  async create(req, res) {
    try {
      const { id_fatura_agencia, obs } = req.body;

      // Validação dos campos obrigatórios
      if (!id_fatura_agencia ) {
        return res.status(400).json({ error: 'Campos obrigatórios: id_fatura_agencia, valor_sem_gd e valor_com_gd.' });
      }

      // Validação de duplicidade
      await checkDuplicidade(ModelFaturasUsina, { id_fatura_agencia });

      //Pegar dados da fatura
      const {
        uc, //id da UC
        uc_codigo, //Código da UC que vem na fatura de energia
        referencia,
        valor_fatura,
        cod_bandeira,
        bandeira,
        cod_status,
        status,
        desagio,
        valor_sem_desagio,
        valor_com_desagio,
        bandeira_sem_gd,
        bandeira_com_gd

      } = await listaFatura.listaFaturas(id_fatura_agencia);

      //Verificar se o status da fatura permite o faturamento.
      if(cod_status <= 1){//Faltou bloquear se o status for 'Faturado'. Aí só bloqueia o que está como pendente.
        return res.status(400).json({ error: `Fatura está com o status ${status} e por isso não está apta para faturamento`});
      }      

      //Atibuir valores as constantes: valor_sem_gd, valor_com_gd
      const valor_sem_gd = Number(valor_sem_desagio) + Number(bandeira_sem_gd);
      let valor_com_gd;

      //Verificar se o contrato também permite faturar a bandeira, pois pode ser que foi acordado com o cliente que ele nucna pagaria bandeira.
      const faturaBandeira = await listaFatura.verificaBandeira(uc);
      faturaBandeira 
        ? valor_com_gd = Number(valor_com_desagio) + Number(bandeira_com_gd) 
        : valor_com_gd = Number(valor_com_desagio); 
     
      const economia = valor_sem_gd - valor_com_gd;

      // Cria a nova fatura de usina
      const novaFaturaUsina = await ModelFaturasUsina.create({
        id_fatura_agencia,
        valor_sem_gd,
        valor_com_gd,
        economia,
        desagio,
        obs
      });

      //Alterar o status da fatura_agencia para Faturado
      await atualizaStatus.alterarStatusParaFaturado(id_fatura_agencia);

      res.status(201).json(novaFaturaUsina);
    } catch (error) {
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao criar a fatura de usina.', details: error.message });
    }
  },

  // Atualizar uma fatura de usina existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_fatura_agencia, valor_sem_gd, valor_com_gd, economia, obs, gerado } = req.body;

      const faturaUsina = await ModelFaturasUsina.findByPk(id);
      if (!faturaUsina) {
        return res.status(404).json({ error: 'Fatura de usina não encontrada.' });
      }

      // Atualiza os campos
      faturaUsina.id_fatura_agencia = id_fatura_agencia || faturaUsina.id_fatura_agencia;
      faturaUsina.valor_sem_gd = valor_sem_gd || faturaUsina.valor_sem_gd;
      faturaUsina.valor_com_gd = valor_com_gd || faturaUsina.valor_com_gd;
      faturaUsina.economia = economia || faturaUsina.economia;
      faturaUsina.obs = obs || faturaUsina.obs;
      faturaUsina.gerado = gerado || faturaUsina.gerado;

      await faturaUsina.save();

      res.status(200).json(faturaUsina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a fatura de usina.' });
    }
  },

  // Deletar uma fatura de usina
  async delete(req, res) {
    try {
      const { id } = req.params;

      const faturaUsina = await ModelFaturasUsina.findByPk(id);
      if (!faturaUsina) {
        return res.status(404).json({ error: 'Fatura de usina não encontrada.' });
      }

      await atualizaStatus.atualizarStatusFatura(id);

      await faturaUsina.destroy();
      res.status(200).json({ message: 'Fatura de usina deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a fatura de usina.' });
    }
  },
};
