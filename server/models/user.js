'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email cannot be empty`,
        },
        isEmail: {
          args: true,
          msg: `Please enter a valid email`,
        },
      },
      unique: {
        args: true,
        msg: 'Email are already exist',
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password cannot be empty`,
        },
        len: {
          args: [6, 100],
          msg: `Password must be more than 6 characters`,
        },
      },
    },
    role: DataTypes.STRING
  }, {sequelize});

  User.addHook('beforeCreate',(user,options)=>{
    user.password = bcrypt.hashSync(user.password, salt);

    if(user.role == null) {
      user.role = 'customer';
    }
  })
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};