const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.getAdmins);
router.get('/profile', adminController.getProfile);
router.get('/add', adminController.getAddAdmin);
router.post('/add', adminController.addAdmin);
router.get('/:id([0-9a-fA-F]{24})', adminController.getAdmin);
module.exports = router;
