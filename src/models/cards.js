const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const Card = sequelize.define("Card", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    set_name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    type: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    }
}, {
    tableName: "Cards",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['name', 'set_name']
        }
    ]
});

module.exports = {Card};