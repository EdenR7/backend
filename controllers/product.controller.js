const fs = require("fs");
const PRODUCTS = require("../data/db.json");

function getProducts(req, res) {
  res.status(202).json(PRODUCTS);
}

function getProductById(req, res) {
  const { id } = req.params;
  const product = PRODUCTS.find((item) => item._id == id);
  if (!product) return res.status(404).json({ message: "Product didnt found" });
  res.send(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const products = [...PRODUCTS];
  const productIndex = products.findIndex((product) => product._id == id);
  if (productIndex === -1)
    return res.status(404).json({ message: "Product didnt found" });

  products.splice(productIndex, 1);

  fs.writeFileSync("./data/db.json", JSON.stringify(products));
  res.status(200).json({ message: "Item deleted successful" });
}
function createProduct(req, res) {
  // Add make Id
  const { body: newProduct } = req;
  const updatedProducts = [...PRODUCTS, newProduct];
  fs.writeFileSync("./data/db.json", JSON.stringify(updatedProducts));
  res.status(201).json({ message: "Item Added successful" });
}
function editProduct(req, res) {
  const { id } = req.params; //
  const { body: newProduct } = req; // object to replace
  newProduct._id = id;

  const productIndex = PRODUCTS.findIndex((product) => product._id == id);
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }
  const newProducts = [...PRODUCTS];
  newProducts[productIndex] = newProduct;
  fs.writeFileSync("./data/db.json", JSON.stringify(newProducts));

  res.status(200).json({ message: "Item updated successful" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
