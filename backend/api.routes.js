const express = require("express");
const router = express.Router();
const productRoute = require('./routes/product.route')

router.use("/product", productRoute);

module.exports = router;
