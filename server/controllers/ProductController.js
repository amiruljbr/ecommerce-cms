const { Product } = require('../models');

class ProductController {
  static getProducts (req, res, next){
    Product.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static create (req, res, next){
    let newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
    }

    Product.create(newProduct)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static getOneProduct (req, res, next){
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((data) => {
        if(data) {
          res.status(200).json(data)
        } else {
          next({ name: 'PRODUCT_NOT_FOUND'})
        }
        
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static delete (req, res, next){
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: `data id ${req.params.id} has been deleted`
          })
        } else {
          next({ name: 'PRODUCT_NOT_FOUND'})
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static edit (req, res, next){
    let newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
    }

    Product.update({
      name: newProduct.name,
      image_url: newProduct.image_url,
      price: newProduct.price,
      stock: newProduct.stock,
      category: newProduct.category
    },
      {
        where: {
        id: req.params.id
      }
    })
      .then((data) => {
        console.log(data);
        if (data[0] == 1) {
          res.status(200).json(newProduct);
        } else {
          next({ name: 'PRODUCT_NOT_FOUND'})
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }
}

module.exports = ProductController;