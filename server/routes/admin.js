const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post(
  "/add-product",
  [verifyToken, verifyAdmin],
  adminController.postAddProduct
);

module.exports = router;
