# Dockerfile
FROM node:16

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos necessários para instalar dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o contêiner
COPY . .

# Expor a porta 3000 (ou a porta configurada no seu `app.js`)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
