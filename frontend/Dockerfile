# Use Nginx para servir arquivos estáticos
FROM nginx:alpine

# Copia todos os arquivos do projeto para o diretório padrão do Nginx
COPY ./niceadmin /usr/share/nginx/html

# Exponha a porta padrão do Nginx
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
