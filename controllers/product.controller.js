const Product = require("../models/product.model");

function _makeCriteria(query) {
  const criteria = {};
  if (query["name"]) criteria.name = { $regex: query["name"], $options: "i" };
  if (!isNaN(query.minPrice) && query.minPrice !== "") {
    criteria.price = criteria.price || {};
    criteria.price.$gte = Number(query.minPrice);
  }

  if (!isNaN(query.maxPrice) && query.maxPrice !== "") {
    criteria.price = criteria.price || {};
    criteria.price.$lte = Number(query.maxPrice);
  }
  if (query["inStock"] === "true") criteria.quantity = { $gt: 0 };
  if (query["categories"]) {
    let categoriesArr = query["categories"].split(",");
    categoriesArr = categoriesArr.filter((category) => category !== "");
    criteria.categories = { $all: categoriesArr };
  }
  return criteria;
}

async function getProductsCount(req, res) {
  const { query } = req;
  const criteria = _makeCriteria(query);

  try {
    const count = await Product.countDocuments(criteria);
    res.json({ count });
  } catch (err) {
    console.log(
      "robot.controller, getRobotsCount. Error while getting robots count",
      err
    );
    res.status(500).json({ message: err.message });
  }
}
async function getProducts(req, res) {
  const { query } = req;
  const limit = !isNaN(query.limit) ? Number(query.limit) : 6;
  const skip = !isNaN(query.skip) ? Number(query.skip) : 0;
  const criteria = _makeCriteria(query);
  try {
    const products = await Product.find(criteria)
      .skip(skip * limit)
      .limit(limit);
    if (!products) res.status(404).json({ message: err.message });
    res.status(200).json(products);
  } catch (err) {
    if (err.name === "CastError") {
      console.error("product.controller, getProducts, CastError", err);
      return res.status(400).json({ message: "Invalid query parameter" });
    }
    console.error("product.controller, getProducts, Server Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product didnt found" });
    res.status(200).json(product);
  } catch (error) {
    if (error.name === "CastError") {
      `product.controller, CastError getById something went wrong with product id ${error}`;
      return res.status(404).json({ message: "Product didnt found" });
    }
    console.log(
      `product.controller, getById something went wrong with product id  ${error}`
    );
    return res.status(500).json({ message: "Server Error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      console.log(
        `product.controller, deleteProduct, Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product didnt found" });
    }
    res.status(202).json({ message: "Product Deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      console.error(
        `product.controller, deleteProduct, CastError, Invalid product id`,
        error
      );
      return res.status(404).json({ message: "Product didnt found" });
    }
    console.error(
      `product.controller, deleteProduct, Server Error, Error with product id`,
      error
    );
    return res.status(500).json({ message: "Server Error" });
  }
}

async function createProduct(req, res) {
  const { body: newProduct } = req;
  try {
    const newRobot = new Product(newProduct);
    const savedRobot = await newRobot.save();
    res.status(201).json(savedRobot);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function editProduct(req, res) {
  const { id } = req.params;
  const newProduct = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      newProduct,
      { new: true, runValidators: true } // validate before updating
    );

    if (!updatedProduct) {
      console.log(
        `robot.controller, updateRobot. Robot not found with id: ${id}`
      );
      return res.status(404).json({ message: "Robot not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    if (err.name === "CastError") {
      `product.controller, CastError editProduct something went wrong with robot id:${id}`;
      return res.status(404).json({ message: "Product didnt found" });
    }
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`robot.controller, editProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`robot.controller, editProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating robot" });
    }
  }
}
// function editProduct(req, res) {
//   const { id } = req.params; //
//   const { body: newProduct } = req; // object to replace
//   newProduct._id = id;

//   const productIndex = PRODUCTS.findIndex((product) => product._id == id);
//   if (productIndex === -1) {
//     return res.status(404).send("Product not found");
//   }
//   const newProducts = [...PRODUCTS];
//   newProducts[productIndex] = newProduct;
//   fs.writeFileSync("./data/db.json", JSON.stringify(newProducts));

//   res.status(200).json({ message: "Item updated successful" });
// }

module.exports = {
  getProducts,
  getProductsCount,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
