const sequelize = require('../config/database');

class ListaFaturas {
  // Método para listar faturas com ou sem filtro
  static async listaFaturas(id_fatura_agencia = null) {
    const whereClause = id_fatura_agencia
      ? `AND ifa.id_fatura_agencia = ${id_fatura_agencia}`
      : '';
    /**
     * Na consulta a seguir a bandeira é calculada por cada item lançado. Normalmente os itens se resumem nos postos 
     * tarifários ponta e fora ponta. Calcular a bandeira individualmente mesmo quando o consumo na ponta é menor que
     * 100kwh por exemplo dá o mesmo valor quando somado os consumos. Falta apenas verificar como será feito caso o
     * total consumido for menor que 100kwh 
     */
    const query = `
      SELECT 
        fa.uc, 
        u.codigo_uc AS uc_codigo, 
        fa.referencia, 
        fa.valor_fatura, 
        fa.bandeira AS cod_bandeira, 
        b.descricao AS bandeira, 
        fa.status_fatura AS cod_status,
        s.descricao AS status,
        u.desagio,
        sum(abs(ifa.valor)) AS valor_sem_desagio,
        sum(abs(ifa.valor)) * (1 - u.desagio) AS valor_com_desagio,
        (sum(ifa.quantidade) / 100) * b.tarifa_bandeira as bandeira_sem_gd,
        (sum(ifa.quantidade) / 100) * b.tarifa_bandeira * (1 - u.desagio) as bandeira_com_gd
      FROM faturas_agencia fa
      LEFT JOIN ucs u ON fa.uc = u.id_uc
      LEFT JOIN bandeira b ON fa.bandeira = b.id_bandeira
      LEFT JOIN aux_status_fatura s ON fa.status_fatura = s.id_status
      LEFT JOIN itens_fatura_agencia ifa ON fa.id_fatura_agencia = ifa.id_fatura_agencia
      LEFT JOIN itens_fatura i ON ifa.item_fatura_agencia = i.id_itens_fatura
      WHERE i.injecao_usina IS TRUE
      ${whereClause}
      GROUP BY 
      fa.uc, 
        u.codigo_uc, 
        fa.referencia, 
        fa.valor_fatura, 
        fa.bandeira, 
        b.descricao, 
        fa.status_fatura,
        s.descricao,
        u.desagio
    `;

    try {
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      // Retorna um único objeto se id_fatura_agencia for informado
      if (id_fatura_agencia && result.length > 0) {
        return result[0]; // Registro único
      }

      // Retorna array de registros se id_fatura_agencia não for informado
      return result;
    } catch (error) {
      console.error('Erro ao executar consulta manual:', error.message);
      throw error;
    }
  }

  // Método verificaBandeira
  static async verificaBandeira(id_uc) {
    const query = `
      SELECT c.bandeira
      FROM ucs u
      INNER JOIN ucs_contrato uc ON u.id_uc = uc.id_uc
      INNER JOIN contratos c ON uc.id_contrato = c.id_contrato
      WHERE u.id_uc = ${id_uc}
    `;

    try {
      const [result] = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      // Verifica se encontrou algum resultado
      if (result.length === 0) {
        throw new Error('Bandeira não encontrada para o UC informado.');
      }

      return result.bandeira;
    } catch (error) {
      console.error('Erro ao verificar bandeira:', error.message);
      throw error;
    }
  }
}

module.exports = ListaFaturas;
