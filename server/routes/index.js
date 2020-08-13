const router = require('express').Router();
const UserController = require('../controllers/UserController');
const productRoute = require('./product');
const { authentication } = require('../middleware/auth')

router.get('/',(req,res)=>{
  res.send('e-commerce-baj');
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)
router.use('/products', productRoute);

module.exports = router;