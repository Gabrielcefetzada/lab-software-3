
# Instruções para setup de configuração

Breve tutorial de como preparar a aplicação para desenvolvimento local. O Único requisito é que você tenha o Docker instalado. Ademais, opcionalmente, esse projeto versiona as collections usando o Bruno Client API. Portanto, é interessante instalá-lo.

# Back-end

## Build da imagem docker

```bash
$ docker compose build
```

## Subir os contêiners docker

```bash
$ docker compose up
```

## Instalar dependências

```bash
$ npm i
```

## Gerar pasta buildada da aplicação (dist)

Para o correto funcionamento do envio dos e-mails, é necessário que geremos o build da aplicação nest localmente.


```bash
# Entrar no contêiner da api
$ docker exec -it lab-software-3-nestjs-app-1 bash
```

```bash
# Buildar o projeto nest
$ npm run build
```

## Importar rotas no Bruno (opcional)

A collection com as rotas da aplicação está na pasta `bruno` na raíz desse projeto.

# Front-end

```bash
# Instalar dependências
$ npm i
```

```bash
# Rodar o projeto
$ npm run dev
```

## License

Nest is [MIT licensed](LICENSE).
