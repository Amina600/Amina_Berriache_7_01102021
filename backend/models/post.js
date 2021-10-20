'use strict';
const fs = require('fs');

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        static associate(models) {
            models.Post.hasMany(models.Comment, {foreignKey: 'postId', onDelete: 'CASCADE'});
            models.Post.hasMany(models.Like, {foreignKey: 'postId', onDelete: 'CASCADE'});
            models.Post.belongsTo(models.User, {
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                }
            })

        }
    }

    Post.init({
        userId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        urlMedia: DataTypes.STRING,
        createdAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Post',
        // Suppression automatique du media associé au post
        hooks: {
            afterDestroy: (post) => {
                deletePostFile(post);
            },
            afterBulkDestroy: (post) => {
                deletePostFile(post);
            }
        }
    });
    return Post;
};

function deletePostFile(post) {
    if (post.urlMedia) {
        const filename = post.urlMedia.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {});
    }
}