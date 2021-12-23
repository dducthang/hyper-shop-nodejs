const express = require('express');

const router = express.Router();
const productsApiController = require('../controllers/apiController/products');
const responseApiController = require('../controllers/apiController/response');

router.get('/products', productsApiController.getProductsApi);
router.post('/response/:commentId', responseApiController.postResponse);

module.exports = router;
