const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/userList', userController.getUserList);

router.get('/userDetail', userController.getUserDetail);

router.get('/userProfile', userController.getUserProfile);

module.exports = router;