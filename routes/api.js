const express = require("express");

const router = express.Router();
const productsApiController = require("../controllers/apiController/products");
const responseApiController = require("../controllers/apiController/response");
const usersApiController = require("../controllers/apiController/users");

router.get("/products", productsApiController.getProductsApi);
router.post("/response/:commentId", responseApiController.postResponse);

router.get("/users", usersApiController.getUsersApi);
router.post("/users", usersApiController.postActionUser);

module.exports = router;
