const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'mcj130101', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
