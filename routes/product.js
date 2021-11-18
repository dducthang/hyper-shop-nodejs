const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/productDetail', productController.getProductDetail);

router.get('/addProduct', productController.getAddProduct);

router.post('/addProduct', productController.postAddProduct);

router.get('/products', productController.getProducts);

module.exports = router;