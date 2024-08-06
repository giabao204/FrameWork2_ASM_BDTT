// database.js
const { Sequelize } = require('sequelize');

// Cấu hình kết nối đến cơ sở dữ liệu PostgreSQL
const sequelize = new Sequelize('reactjs', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
