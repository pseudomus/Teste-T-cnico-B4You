require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'products_db',
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'products_db_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'products_db_prod',
    host: 'localhost',
    dialect: 'mysql',
  }
};
