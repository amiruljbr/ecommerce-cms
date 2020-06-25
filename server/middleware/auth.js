const jwt = require('jsonwebtoken')
const { User } = require('../models')

function authentication(req,res,next) {
    
    const { access_token } = req.headers;
    if (!access_token) return next({ name: 'TOKEN_NOT_FOUND'})
    
    try {
      const decode = jwt.verify(access_token, process.env.SECRET)
      User.findByPk(decode.id)
        .then(data => {
          if(data){
            req.userData = decode;
            next();
          } else {
            next({ name: 'USER_NOT_FOUND'})
          }
        })
        .catch(() => {
            next({ name: 'INTERNAL_SERVER_ERROR'})
        })
    } catch {
      next({ name: 'INVALID_TOKEN' })
    }
}

function authorization(req,res,next) {
  if(req.userData.role === 'admin') {
    next()
  } else {
    next( {name:'NOT_AUTHORIZED'} );
  }
}

module.exports = {authentication, authorization}