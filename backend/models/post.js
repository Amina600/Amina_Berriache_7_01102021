'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.hasMany(models.Comment, { foreignKey: 'postId', onDelete: 'CASCADE'});
      models.Post.hasMany(models.Like, { foreignKey: 'postId', onDelete: 'CASCADE'});
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
  });
  return Post;
};