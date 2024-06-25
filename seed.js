// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/product.model");

dotenv.config(); // Load environment variables

// Sample data
// const products = [
//   {
//     name: "Headphones",
//     price: 99.99,
//     quantity: 0,
//     category: "Electronics",
//   },
//   {
//     name: "Smartphone",
//     price: 599.99,
//     quantity: 75,
//     category: "Electronics",
//   },
//   {
//     name: "Laptop",
//     price: 1299.99,
//     quantity: 50,
//     category: "Electronics",
//   },
//   {
//     name: "Smartwatch",
//     price: 199.99,
//     quantity: 200,
//     category: "Electronics",
//   },
//   {
//     name: "Bluetooth Speaker",
//     price: 49.99,
//     quantity: 300,
//     category: "Electronics",
//   },
//   {
//     name: "Tablet",
//     price: 299.99,
//     quantity: 100,
//     category: "Electronics",
//   },
//   {
//     name: "Gaming Console",
//     price: 399.99,
//     quantity: 60,
//     category: "Electronics",
//   },
//   {
//     name: "Digital Camera",
//     price: 499.99,
//     quantity: 80,
//     category: "Electronics",
//   },
//   {
//     name: "E-reader",
//     price: 129.99,
//     quantity: 120,
//     category: "Electronics",
//   },
//   {
//     name: "External Hard Drive",
//     price: 79.99,
//     quantity: 250,
//     category: "Electronics",
//   },
//   {
//     name: "Wireless Mouse",
//     price: 29.99,
//     quantity: 400,
//     category: "Accessories",
//   },
//   {
//     name: "Mechanical Keyboard",
//     price: 89.99,
//     quantity: 150,
//     category: "Accessories",
//   },
//   {
//     name: "Fitness Tracker",
//     price: 149.99,
//     quantity: 180,
//     category: "Wearables",
//   },
//   {
//     name: "4K TV",
//     price: 799.99,
//     quantity: 40,
//     category: "Electronics",
//   },
//   {
//     name: "VR Headset",
//     price: 349.99,
//     quantity: 55,
//     category: "Electronics",
//   },
//   {
//     name: "Portable Charger",
//     price: 24.99,
//     quantity: 500,
//     category: "Accessories",
//   },
//   {
//     name: "Smart Home Hub",
//     price: 99.99,
//     quantity: 140,
//     category: "Smart Home",
//   },
//   {
//     name: "Electric Toothbrush",
//     price: 69.99,
//     quantity: 200,
//     category: "Health",
//   },
//   {
//     name: "Air Purifier",
//     price: 149.99,
//     quantity: 90,
//     category: "Home Appliances",
//   },
//   {
//     name: "Coffee Maker",
//     price: 79.99,
//     quantity: 110,
//     category: "Home Appliances",
//   },
//   {
//     name: "Instant Pot",
//     price: 99.99,
//     quantity: 130,
//     category: "Home Appliances",
//   },
//   {
//     name: "Robot Vacuum",
//     price: 299.99,
//     quantity: 70,
//     category: "Home Appliances",
//   },
//   {
//     name: "Smart Thermostat",
//     price: 199.99,
//     quantity: 85,
//     category: "Smart Home",
//   },
//   {
//     name: "Noise Cancelling Headphones",
//     price: 249.99,
//     quantity: 65,
//     category: "Electronics",
//   },
//   {
//     name: "Dash Cam",
//     price: 59.99,
//     quantity: 150,
//     category: "Automotive",
//   },
//   {
//     name: "Action Camera",
//     price: 199.99,
//     quantity: 90,
//     category: "Electronics",
//   },
//   {
//     name: "Wireless Charger",
//     price: 39.99,
//     quantity: 220,
//     category: "Accessories",
//   },
//   {
//     name: "Smart Light Bulbs",
//     price: 49.99,
//     quantity: 300,
//     category: "Smart Home",
//   },
//   {
//     name: "Streaming Device",
//     price: 49.99,
//     quantity: 180,
//     category: "Electronics",
//   },
//   {
//     name: "Home Security Camera",
//     price: 129.99,
//     quantity: 100,
//     category: "Smart Home",
//   },
// ];
const products = [
  {
    name: "Headphones",
    price: 99.99,
    quantity: 0,
    categories: ["Electronics", "Accessories"],
  },
  {
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    categories: ["Electronics", "Wearables"],
  },
  {
    name: "Laptop",
    price: 1299.99,
    quantity: 50,
    categories: ["Electronics", "Computers", "Accessories"],
  },
  {
    name: "Smartwatch",
    price: 199.99,
    quantity: 200,
    categories: ["Electronics", "Wearables", "Health"],
  },
  {
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 300,
    categories: ["Electronics", "Accessories", "Home Appliances"],
  },
  {
    name: "Tablet",
    price: 299.99,
    quantity: 100,
    categories: ["Electronics", "Computers"],
  },
  {
    name: "Gaming Console",
    price: 399.99,
    quantity: 60,
    categories: ["Electronics", "Gaming"],
  },
  {
    name: "Digital Camera",
    price: 499.99,
    quantity: 80,
    categories: ["Electronics", "Photography"],
  },
  {
    name: "E-reader",
    price: 129.99,
    quantity: 120,
    categories: ["Electronics", "Wearables", "Health"],
  },
  {
    name: "External Hard Drive",
    price: 79.99,
    quantity: 250,
    categories: ["Electronics", "Accessories"],
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 400,
    categories: ["Accessories", "Computers"],
  },
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 150,
    categories: ["Accessories", "Computers"],
  },
  {
    name: "Fitness Tracker",
    price: 149.99,
    quantity: 180,
    categories: ["Wearables", "Health", "Accessories"],
  },
  {
    name: "4K TV",
    price: 799.99,
    quantity: 40,
    categories: ["Electronics", "Home Appliances"],
  },
  {
    name: "VR Headset",
    price: 349.99,
    quantity: 55,
    categories: ["Electronics", "Gaming", "Wearables"],
  },
  {
    name: "Portable Charger",
    price: 24.99,
    quantity: 500,
    categories: ["Accessories", "Electronics"],
  },
  {
    name: "Smart Home Hub",
    price: 99.99,
    quantity: 140,
    categories: ["Smart Home", "Electronics"],
  },
  {
    name: "Electric Toothbrush",
    price: 69.99,
    quantity: 200,
    categories: ["Health", "Home Appliances"],
  },
  {
    name: "Air Purifier",
    price: 149.99,
    quantity: 90,
    categories: ["Home Appliances", "Health"],
  },
  {
    name: "Coffee Maker",
    price: 79.99,
    quantity: 110,
    categories: ["Home Appliances"],
  },
  {
    name: "Instant Pot",
    price: 99.99,
    quantity: 130,
    categories: ["Home Appliances", "Health"],
  },
  {
    name: "Robot Vacuum",
    price: 299.99,
    quantity: 70,
    categories: ["Home Appliances", "Smart Home"],
  },
  {
    name: "Smart Thermostat",
    price: 199.99,
    quantity: 85,
    categories: ["Smart Home", "Home Appliances"],
  },
  {
    name: "Noise Cancelling Headphones",
    price: 249.99,
    quantity: 65,
    categories: ["Electronics", "Accessories"],
  },
  {
    name: "Dash Cam",
    price: 59.99,
    quantity: 150,
    categories: ["Automotive", "Electronics"],
  },
  {
    name: "Action Camera",
    price: 199.99,
    quantity: 90,
    categories: ["Electronics", "Photography"],
  },
  {
    name: "Wireless Charger",
    price: 39.99,
    quantity: 220,
    categories: ["Accessories", "Electronics"],
  },
  {
    name: "Smart Light Bulbs",
    price: 49.99,
    quantity: 300,
    categories: ["Smart Home", "Electronics", "Home Appliances"],
  },
  {
    name: "Streaming Device",
    price: 49.99,
    quantity: 180,
    categories: ["Electronics"],
  },
  {
    name: "Home Security Camera",
    price: 129.99,
    quantity: 100,
    categories: ["Smart Home", "Electronics"],
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
