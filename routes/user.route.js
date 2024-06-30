const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.get("/:id", async (req, res) => {
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
});

module.exports = router;
