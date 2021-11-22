const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/addProduct', productController.getAddProduct);

router.post('/addProduct', productController.postAddProduct);

router.get('/editProduct/:productId', productController.getEditProduct);

router.post('/editProduct', productController.postEditProduct);

router.post('/deleteProduct', productController.postDeleteProduct);

router.get('/:productId', productController.getProductDetail);

module.exports = router;