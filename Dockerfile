# Define a imagem base do Nginx
FROM nginx

# Copia os arquivos de código-fonte para o diretório de trabalho do Nginx
COPY . /usr/share/nginx/html

# Expõe uma porta
EXPOSE 80

# Define o comando de execução do servidor Nginx
CMD [ "nginx", "-g", "daemon off;"]