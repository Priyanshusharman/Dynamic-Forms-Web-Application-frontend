const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Form', 'root', 'priyanshu', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
