const express = require("express");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// async function getUserById(req, res) {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User didnt found" });
//     const { password, ...userResponse } = user._doc;
//     res.status(200).json(userResponse);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// }
async function getUser(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User didnt found" });
    const { password, ...userResponse } = user._doc;
    res.status(200).json(userResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getUserProducts(req, res) {
  const { userId } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(userId);
    // const userExists = await User.findById(adjustedUserId);
    // if (!userExists) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    const products = await Product.find({ user: adjustedUserId });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
// async function getUserProducts(req, res) {
//   const { _id } = req.body;
//   try {
//     const userId = new mongoose.Types.ObjectId(_id);
//     const userExists = await User.findById(userId);
//     if (!userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const products = await Product.find({ user: userId });
//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// }

async function createProduct(req, res) {
  const { body: product } = req;
  try {
    const adjustedUserId = new mongoose.Types.ObjectId(req.userId);
    product.user = adjustedUserId;
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      console.log(`user.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`user.controller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const { userId } = req;
  try {
    const product = await Product.findById(id);
    if (!product) {
      console.log(
        `user.controller, deleteProduct, Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product didnt found" });
    }
    if (product.user.toString() !== userId.toString()) {
      return res.status(400).json({ message: "The user IDs not match !" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(202).json({ message: "Product Deleted" });
  } catch (err) {
    console.log(`user.controller, deleteProduct. ${err}`);
    res.status(500).json({ message: "Server error while creating product" });
  }
}

module.exports = { getUser, getUserProducts, createProduct, deleteProduct };
