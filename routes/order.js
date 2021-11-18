const express = require('express');

const cartController = require('../controllers/order');

const router = express.Router();

router.get('/orders', cartController.getOrders);

module.exports = router;