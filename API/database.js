const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.error('Unable to connect');
});

module.exports = sequelize;