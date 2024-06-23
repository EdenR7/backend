const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
const productRoutes = require("./routes/product.route");
app.use("/api/product", productRoutes); // When you reached this api go to this routes


// START SERVER
app.listen(PORT, () => {
  console.log(`Server Run at ${PORT}`);
});
