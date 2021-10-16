'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, { foreignKey: 'userId', onDelete:"cascade"});
      models.User.hasMany(models.Comment, { foreignKey: 'userId', onDelete:"cascade"});
    }
  }
  User.init({
    email: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    password: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};