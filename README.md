# Front-end Secretaria Escolar (Componente A)

Este projeto faz parte do MVP da Sprint **Desenvolvimento Back-End Avançado** 

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar através do Docker

Certifique-se de ter o Docker (https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório secretaria_escolar/secretaria_escolar_front.

Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ sudo docker build -t secretaria_escolar .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, o seguinte comando:

```
$ sudo docker run --rm -p 8080:80 secretaria_escolar
```

Uma vez executando, para acessar o front-end, basta abrir o link [http://localhost:8080/#/] no navegador.