const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  static register(req,res,next){
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(newUser)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      // console.log(err);
      next(err)
    })

  }

  static login(req,res,next){
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where:{
        email: newUser.email
      }
    })
    .then(data=>{
      if(bcrypt.compareSync(req.body.password, data.password)){
        let token = jwt.sign({
          id: data.id,
          email: data.email,
          role: data.role
        }, process.env.SECRET);

        res.status(200).json({
          id: data.id,
          email: data.email,
          role: data.role,
          access_token: token
        })
      } else {
        next({name:"USER_NOT_FOUND", message:"invalid email / password"});
      }
    })
    .catch((err)=>{
      // console.log(err);
      next({name:"USER_NOT_FOUND", message:"invalid email / password"});
    })
  }
}

module.exports = UserController