const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

sequelize.sync({ alter: true })
    .then(() => console.log('Tabla Usuario creada o actualizada'))
    .catch(err => console.error(err));

module.exports = User;
