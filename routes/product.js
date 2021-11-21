const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/productDetail', productController.getProductDetail);

router.get('/addProduct', productController.getAddProduct);

router.post('/addProduct', productController.postAddProduct);

router.get('/editProduct/:productId', productController.getEditProduct);

router.post('/editProduct', productController.postEditProduct);

module.exports = router;