const { Sequelize } = require('sequelize');

// Connexion à MYSQL
const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
    host: process.env.host,
    dialect: 'mysql'
  });

module.exports = sequelize;