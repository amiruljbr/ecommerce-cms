'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Product extends Model {

  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name can't be empty",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "image_url can't be empty",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "price cannot be empty",
        },
        isNumeric: {
          args: true,
          msg: 'price must be a number',
        },
        min: {
          args: [0],
          msg: 'price cannot be negative',
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock cannot be empty",
        },
        isNumeric: {
          args: true,
          msg: 'stock must be a number',
        },
        min: {
          args: [0],
          msg: 'stock cannot be negative',
        },
      },
    },
    category: DataTypes.STRING
  }, {sequelize});
  
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};