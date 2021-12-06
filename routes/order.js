const express = require("express");

const cartController = require("../controllers/order");

const router = express.Router();

router.get("/", cartController.getOrders);

module.exports = router;
