# Usa uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Define a porta que será exposta (opcional, mas útil para documentação)
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["npm", "start"]