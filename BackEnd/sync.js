// sync.js
const sequelize = require('./config/database');
const User = require('./models/user');
const Product = require('./models/product');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sử dụng { force: true } để tạo lại bảng
        console.log('Database synced!');
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
};

syncDatabase();
