# Teste-Técnico-B4You
Este projeto é uma aplicação fullstack composta por:

- **Frontend**: Next.js  
- **Backend**: Node.js com Express e Sequelize  
- **Banco de Dados**: MySQL  
- **Orquestração**: Docker e Docker Compose
- **Design: Design de interface no figma pode ser acessado por esse [link](https://www.figma.com/design/hjxbc9I2IUQ5ymx7CUzesX/Untitled?node-id=1-2&t=vA2zZMoyWm8VPVla-1)


---

## 1. Pré-requisitos para rodar o projeto

- [Node.js](https://nodejs.org/) (>=18)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  
- Git

---

###  2. Configuração do Ambiente

###  2.1. Clone o repositório
```bash
git clone https://github.com/pseudomus/teste-b4you.git
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
Se for rodar no Docker, altere DB_HOST=localhost para DB_HOST=db.

.env exemplo FrontEnd
```bash
# ./Front/.env.example
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Formas de executar o projeto
Esse projeto pode ser executado em docker ou localmente por terminal

### 3.1 Docker

Após copiar os .env execute o sequinte comando no diretório raiz para subir o container docker
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
### Lembre-se de alterar o .env da API para DB_HOST=localhost caso esteja DB_HOST=db e de também fechar qualquer container docker caso tenha aberto algum que ocupe as portas necessárias
Após copiar os .env execute os sequintes comandos no diretório raiz
```bash
cd API
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```
Esses comandos vão baixar as dependencias e iniciar o backend

Agora abra outro terminal e rode no diretório raiz
```bash
cd Front
npm install
npm run dev
```
Ao final teremos: 

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: MySQL: localhost:3306 (usuário: root / senha: root)

###  4. Funcionalidades do Projeto

Este projeto é uma aplicação para gerenciamento de uma lista de produtos que o usuário deseja comprar no futuro.  
Permite controlar e organizar os itens, além de acompanhar o status de cada compra.

---

###  **Frontend (Next.js)**
-  Interface intuitiva para exibir e gerenciar a lista de produtos.  
-  Filtros dinâmicos para exibir produtos de acordo com o **estado da compra** (pendente, comprado.).  
-  Modal para criação e edição de produtos.  
-  Consumo da API do backend.  
-  Controle de sessão para usuários autenticados.

---

###  **Backend (Node.js + Express + Sequelize)**
-  **CRUD de produtos** (criar, listar, atualizar, excluir).  
-  **Sistema de login e autenticação** para proteger endpoints sensíveis.  
-  Filtros na API para buscar produtos por status de compra.  
-  Integração com banco de dados MySQL via Sequelize.  
-  Migrations e seeders para inicialização do ambiente.

## 5. Possíveis Melhorias com Inteligência Artificial

### **1. Recomendação de Produtos**
- Utilizar algoritmos de Machine Learning** para sugerir produtos semelhantes ou complementares com base no histórico do usuário.  
- Implementar modelos que analisem as preferências do usuário e façam recomendações personalizadas.

### **2. Previsão de Preços**
- Treinar um modelo que preveja variações de preços com base em dados históricos, ajudando o usuário a decidir o melhor momento para comprar.  
- Integração com APIs de e-commerce para obter dados em tempo real.

### **4. Detecção de Oportunidades**
- Implementar uma IA que **monitore automaticamente promoções e alertas de desconto** em sites parceiros.  
- Envio de notificações quando o preço de um produto desejado cair.

