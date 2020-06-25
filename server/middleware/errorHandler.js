function errorHandler(err, req, res, next){
  let statusCode = '';
  let errorMassage = '';
  let errorCode = '';

  switch (err.name) {
    case 'INVALID_TOKEN':
      statusCode = 400;
      errorCode = err.name;
      errorMassage = 'Invalid Token / invalid username, please input correct Token';      
      break;
    case 'TOKEN_NOT_FOUND':
      statusCode = 400;
      errorCode = err.name;
      errorMassage = 'Token Not Found';      
      break;
    case 'USER_NOT_FOUND':
      statusCode = 400;
      errorCode = err.name;
      errorMassage =  err.message || 'Email Not Found / not registered';      
      break;
    case 'PRODUCT_NOT_FOUND':
      statusCode = 404;
      errorCode = err.name;
      errorMassage = 'Product Not Found, invalid parameter id';      
      break;
    case 'NOT_AUTHORIZED':
      statusCode = 403;
      errorCode = err.name;
      errorMassage = `You're not authorized to do this`;      
      break;
    case 'SequelizeValidationError':
      statusCode = 400;
      errorCode = "VALIDATION_ERROR";
      errorMassage = [];
      err.errors.forEach(element => {
        errorMassage.push(element.message)
      });
      errorMassage = errorMassage.join(', ')      
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      errorCode = "CONSTRAINT_DB_ERROR";
      errorMassage = [];
      err.errors.forEach(element => {
        errorMassage.push(element.message)
      });
      errorMassage = errorMassage.join(', ')       
      break;
    default:
      statusCode = 500;
      errorCode = 'INTERNAL_ERROR_SERVER';
      errorMassage = 'Internal Error Server'; 
      break;
  }

  res.status(statusCode).json({
    errorCode:errorCode,
    message:errorMassage
  })
}

module.exports = errorHandler;