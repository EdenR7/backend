// const express = require("express");
// const app = express();
// const cors = require("cors");
// const PORT = process.env.PORT || 3000;

// //MIDDLEWARE
// app.use(express.json());
// app.use(cors());

// //ROUTES
// const productRoutes = require("./routes/product.route");
// app.use("/api/product", productRoutes); // When you reached this api go to this routes

// // START SERVER
// app.listen(PORT, () => {
//   console.log(`Server Run at ${PORT}`);
// });
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

  // Routes
  // const robotRoutes = require("./routes/robot.route");
  // app.use("/api/robot", robotRoutes);
  const productRoutes = require("./routes/product.route");
  app.use("/api/product", productRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
