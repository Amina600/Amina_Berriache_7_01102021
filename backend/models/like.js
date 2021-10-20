'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {

        static associate(models) {
            models.Like.belongsTo(models.User, {
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                }
            })
            models.Like.belongsTo(models.Post, {
                foreignKey: {
                    name: 'postId',
                    allowNull: false,
                }
            })
        }
    };
    Like.init({
        isLike: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};