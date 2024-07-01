const express = require("express");
// const User = require("../models/user.model");
const {
  getUser,
  getUserProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUser);
router.get("/products", getUserProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);

// router.get("/:id", getUserById);

module.exports = router;
