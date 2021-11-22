const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUserList);


router.get('/:userId', userController.getUserDetail);

module.exports = router;