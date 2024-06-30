const express = require("express");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const { default: mongoose } = require("mongoose");
const router = express.Router();

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User didnt found" });
    const { password, ...userResponse } = user._doc;
    res.status(200).json(userResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getUserProducts(req, res) {
  const { _id } = req.body;
  try {
    const userId = new mongoose.Types.ObjectId(_id);
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await Product.find({ user: userId });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { getUserById, getUserProducts };
