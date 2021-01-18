## :pushpin: Antes de usar
  Ambos, o frontend e o backend, possuem um arquivo chamado .template.env, você deve criar um arquivo chamado .env no lugar, preenchendo os valores.
  
  * O backend está conectado com um banco de dados postgres. Nesse sentido, precisa das variáveis de ambientes para conectar com este.
  * No frontend, a variável de ambiente REACT_APP_GEOPOSITION_SERVICE_TOKEN se refere ao token necessário para usar o serviço do www.cepaberto.com.

## :clipboard: Como usar?

```
# Clonar o repositório 
$ git clone git@github.com:saymow/processo.git

# Entrar no diretório
$ cd processo

# Entrar no backend
$ cd backend

# Instalar dependências 
$ npm install

# Subir o banco de dados e popular
# npm run seed

# Executar backend
# npm run dev

# Entrar no frontend
$ cd ../frontend

# Instalar dependências 
$ npm install

# Executar frontend.
$ npm start
```
