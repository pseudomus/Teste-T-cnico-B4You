# Teste-Técnico-B4You
Este projeto é uma aplicação fullstack composta por:

- **Frontend**: Next.js  
- **Backend**: Node.js com Express e Sequelize  
- **Banco de Dados**: MySQL  
- **Orquestração**: Docker e Docker Compose  

---

## 1. Pré-requisitos para rodar o projeto

- [Node.js](https://nodejs.org/) (>=18)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  
- Git

---

###  2. Configuração do Ambiente

###  2.1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/teste-b4you.git
cd teste-b4you
```

###  2.2 Arquivos .env

.env exemplo backend
```bash
# ./API/.env.example
PORT=3001
DB_USER=root
DB_PASSWORD=root
DB_NAME=products_db
DB_HOST=localhost
JWT_SECRET=90c6736ed297d958c9e330c04fea8b107070b3fa5aa65a93149f7d286d0c91f12eaaae90cfb85452ad384be7be48a05d6217e53776d841a2e2f644fee35d3843
```
Caso queira rodar no docker coloque 'db'como o DB_HOST do .env 

.env exemplo FrontEnd
```bash
# ./Front/.env.example
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Formas de executar o projeto
Esse projeto pode ser executado em docker ou localmente por terminal

### 3.1 Docker

Após copiar os .env execute o sequinte comando para subir o container docker
```bash
docker-compose up -d --build
```
Em seguida vamos rodar as migrations e os seeders
```bash
docker exec -it backend-container npx sequelize-cli db:migrate
docker exec -it backend-container npx sequelize-cli db:seed:all
```
Ao final teremos:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: disponível em localhost:3306

Certifique-se que as respectivas portas estejam liberadas para uso

### 3.2 Local

Após copiar os .env execute os sequintes comandos no diretorio raiz
```bash
cd api
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```
Esses comandos vão baixar as dependencias e iniciar o backend

Agora abra outro terminal e rode no repositorio raiz
```bash
cd Front
npm install
npm run dev
```
Ao final teremos: 

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: MySQL: localhost:3306 (usuário: root / senha: root)
