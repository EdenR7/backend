const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

dotenv.config(); // Load config

async function main() {
  // Connect to database
  await connectDB();
  const { verifyToken } = require("./middlewares/auth.middleware");

  // MIDDLEWARES
  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // Routes
  const authRoutes = require("./routes/auth.route");
  const productRoutes = require("./routes/product.route");
  const protectedRoutes = require("./routes/protected.route");
  const userRoutes = require("./routes/user.route");

  app.use("/api/product", productRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/protected", verifyToken, protectedRoutes);
  app.use("/api/user", userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
