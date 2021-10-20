'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            models.Comment.belongsTo(models.User, {
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                }
            })
            models.Comment.belongsTo(models.Post, {
                foreignKey: {
                    name: 'postId',
                    allowNull: false,
                }
            })
        }
    }

    Comment.init({
        message: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};