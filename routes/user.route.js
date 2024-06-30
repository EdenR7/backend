const express = require("express");
// const User = require("../models/user.model");
const {
  getUserById,
  getUserProducts,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/products", getUserProducts);
router.get("/:id", getUserById);

module.exports = router;
