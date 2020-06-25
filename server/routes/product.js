const ProductController = require('../controllers/ProductController');
const router = require('express').Router();
const { authorization } = require('../middleware/auth');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getOneProduct);
router.post('/', authorization, ProductController.create);
router.put('/:id', authorization, ProductController.edit);
router.delete('/:id', authorization, ProductController.delete);

module.exports = router;