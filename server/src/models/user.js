"use strict";
const CONSTANTANTS = require("../constants");
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING(32),
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: DataTypes.STRING(32),
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        field: "password_hash",
        allowNull: false,
        type: DataTypes.TEXT,
      },
      isMale: { field: "is_male", allowNull: false, type: DataTypes.BOOLEAN },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(512),
        validate: {
          len: [0, 512],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );

  User.beforeCreate((user, options) => {
    if (!user.avatar) {
      user.avatar = user.isMale
        ? CONSTANTANTS.DEFAULT_MALE_AVATAR
        : CONSTANTANTS.DEFAULT_FEMALE_AVATAR;
    }
  });

  User.beforeUpdate((user, options) => {
    if (user.changed("isMale")) {
      const isAvatarDefault =
        user.avatar === CONSTANTANTS.DEFAULT_MALE_AVATAR ||
        user.avatar === CONSTANTANTS.DEFAULT_FEMALE_AVATAR;

      if (isAvatarDefault) {
        user.avatar = user.isMale
          ? CONSTANTANTS.DEFAULT_MALE_AVATAR
          : CONSTANTANTS.DEFAULT_FEMALE_AVATAR;
      }
    }
  });

  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  return User;
};
