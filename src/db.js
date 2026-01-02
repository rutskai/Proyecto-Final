const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('CollectMarket', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// Probar conexión
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = { sequelize };
