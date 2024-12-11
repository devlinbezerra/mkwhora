const ModelFaturasUsina = require('../models/ModelFaturasUsina');
const ModelContratos = require('../models/ModelContratos');
const checkDuplicidade = require('../services/checkDuplicidade');
const listaFatura = require('../services/listaFaturas');

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
      const fatura = await listaFatura.listaFaturas(id_fatura_agencia);

      //Verificar se o status da fatura permite o faturamento.
      if(fatura.cod_status <= 1){//Faltou bloquear se o status for 'Faturado'. Aí só bloqueia o que está como pendente.
        return res.status(400).json({ error: `Fatura está com o status ${fatura.status} e por isso não está apta para faturamento`});
      }

      //trazer valor faturável, ou seja, que foi oriundo de injeção da usina
      const valor_a_faturar = fatura.valor_sem_gd;

      //Não precisa Verificar se houve bandeira, pois se for bandeira verde será com tarifa zero, portanto não haverá valor.

      //Verificar se o contrato também permite faturar a bandeira, pois pode ser que foi acordado com o cliente que ele nucna pagaria bandeira.
      const faturaBandeira = await listaFatura.verificaBandeira(fatura.uc);

      //Aplicar o deságio em todos os valores faturáveis

      //Atibuir valores as constantes: valor_sem_gd, valor_com_gd, economia, gerado

      // Cria a nova fatura de usina
      const novaFaturaUsina = await ModelFaturasUsina.create({
        id_fatura_agencia,
        valor_sem_gd,
        valor_com_gd,
        economia,
        obs,
        gerado
      });

      res.status(201).json(novaFaturaUsina);
    } catch (error) {
      if (error.message === 'Registro já existe.') {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro ao criar a fatura de usina.' });
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

      await faturaUsina.destroy();
      res.status(200).json({ message: 'Fatura de usina deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar a fatura de usina.' });
    }
  },
};
