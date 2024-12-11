const checkDuplicidade = async (model, whereClause) => {
  if (!model || typeof model.findOne !== 'function') {
    throw new Error('Model não é válido');
  }

  const existingRecord = await model.findOne({ where: whereClause });
  if (existingRecord) {
    throw new Error('Registro já existe.');
  }
};
  
  module.exports = checkDuplicidade;
  