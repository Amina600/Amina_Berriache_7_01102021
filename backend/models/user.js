'use strict';
const fs = require('fs');

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
      models.User.hasMany(models.Post, { foreignKey: 'userId', onDelete:"cascade", hooks: true});
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
    hooks: {
      afterDestroy: (user) => {
        deleteProfileFile(user);
      },
      afterBulkDestroy: (user) => {
        deleteProfileFile(user);
      },
    }
  });
  return User;
};

function deleteProfileFile(user) {
  if (user.profileUrl) {
    const filename = user.profileUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {});
  }
}