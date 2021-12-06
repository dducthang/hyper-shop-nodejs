const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.getAdmins);
router.get('/profile', adminController.getProfile);
router.get('/addadmin', adminController.getAddAdmin);
router.post('/addadmin', adminController.addAdmin);
router.get('/:id', adminController.getAdmin);
module.exports = router;
