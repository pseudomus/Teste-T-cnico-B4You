const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middlewares/authMiddleware');
const {
    validateCreateProduct,
    validateUpdateProduct
} = require('../middlewares/validateProducts');

router.get('/getAll', auth, productsController.getAllProducts);
router.get('/:id', auth, productsController.getProductById);
router.post('/', auth, validateCreateProduct, productsController.createProduct);
router.put('/:id', auth, validateUpdateProduct, productsController.updateProduct);
router.delete('/:id', auth, productsController.deleteProduct); 

module.exports = router;