const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  // Get token from header, the client should be responsible for sending the token
  console.log("middleware");
  console.log(req.params);
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log("auth.middleware verifyToken:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}

function verifyUserExists(req, res, next) {}

module.exports = { verifyToken, verifyUserExists };
