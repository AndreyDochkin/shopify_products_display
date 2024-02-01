const express = require("express");
const router = express.Router();
const { getProductsFromDB } = require("../controllers/products");

router.get("/products", getProductsFromDB);

module.exports = router;
