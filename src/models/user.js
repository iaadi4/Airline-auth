'use strict';
const {
  Model
} = require('sequelize');

const salt = require('../utils/generate-salt');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'user_roles'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 30]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
  });
  return User;
};