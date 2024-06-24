const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
  getProductsCount,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getProductsCount);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
router.put("/:id", editProduct);

module.exports = router;
