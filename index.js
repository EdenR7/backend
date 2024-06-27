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

  // MIDDLEWARES
  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  function waitMiddleWare(req, res, next) {
    setTimeout(() => {
      console.log("Global middleware");
      console.log("3 seconds of pause activated");
      next();
    }, 3000);
  }
  // app.use(waitMiddleWare); // Now we define that for every request we will use this middleWare

  function addBabaToReq(req, res, next) {
    req.user = "baba";
    console.log("Baba added");
    next();
  }

  // Routes
  const productRoutes = require("./routes/product.route");
  app.use("/api/product", addBabaToReq, productRoutes); // add a local middleware between the use of the productRoutes

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
