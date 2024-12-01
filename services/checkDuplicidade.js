const checkDuplicidade = async (model, whereClause) => {
    const existingRecord = await model.findOne({ where: whereClause });
    if (existingRecord) {
      throw new Error('Registro já existe.');
    }
  };
  
  module.exports = checkDuplicidade;
  