const {Sequelize, Model} = require("sequelize");
const sequelize = require("../database");

class User extends Model {}

User.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        email: {
            unique: true,
            allowNull: false,
            type: Sequelize.STRING,
        },
        pseudo: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        isAdmin: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
        },
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: "User",
    }
);

User.sync();
