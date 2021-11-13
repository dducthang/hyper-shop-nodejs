const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/shop', shopController.getShop);

router.get('/productDetail', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.get('/login', shopController.getLogin);

router.get('/addProduct', shopController.getAddproduct);

router.get('/userList', shopController.getUserList);

router.get('/userDetail', shopController.getUserDetail);

router.get('/userProfile', shopController.getUserProfile);

module.exports = router;