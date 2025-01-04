const fs = require('fs');
const multer = require('multer');
const { getDocument } = require('pdfjs-dist/legacy/build/pdf');

// Configuração do multer para salvar arquivos temporários
const upload = multer({ dest: 'uploads/' });

module.exports = {
  uploadFile: upload.single('file'),

  async extractConsumptionValue(req, res) {
    try {
      const file = req.file;

      // Verificar se o arquivo foi enviado
      if (!file) {
        console.error('Arquivo não recebido:', req.file);
        return res.status(400).json({ error: 'Arquivo PDF não enviado.' });
      }

      console.log('Arquivo recebido:', file);

      // Ler o arquivo PDF e converter para Uint8Array
      const pdfBuffer = fs.readFileSync(file.path);
      const pdfData = new Uint8Array(pdfBuffer);

      const pdfDoc = await getDocument({ data: pdfData }).promise;

      // Obtém a primeira página do PDF
      const page = await pdfDoc.getPage(1);

      // Obtém o conteúdo da página
      const textContent = await page.getTextContent();

      // Coordenadas esperadas
      const x0 = 33.72; // Esquerda
      const y0 = 374.88; // Superior
      const x1 = 75.40; // Direita
      const y1 = 381.12; // Inferior

      // Filtra o texto nas coordenadas específicas
      const consumptionValue = textContent.items
        .filter(item => {
          const x = item.transform[4]; // Coordenada X
          const y = item.transform[5]; // Coordenada Y
          return x >= x0 && x <= x1 && y >= y0 && y <= y1;
        })
        .map(item => item.str)
        .join('')
        .trim();

      // Exclui o arquivo temporário após processamento
      fs.unlinkSync(file.path);

      // Retorna o valor extraído
      if (!consumptionValue) {
        return res.status(404).json({
          error: 'Nenhum valor encontrado nas coordenadas especificadas.',
        });
      }

      return res.status(200).json({
        message: 'Valor extraído com sucesso.',
        data: { consumptionValue },
      });
    } catch (error) {
      console.error('Erro ao processar o PDF:', error.message);

      // Remover o arquivo temporário em caso de erro
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({
        error: 'Erro ao processar o PDF.',
        details: error.message,
      });
    }
  },
};
