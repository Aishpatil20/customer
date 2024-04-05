// models/index.js
const mongoose = require("mongoose");
const Customer = require("./Customer");
const Order = require("./Order");
const Drone = require("./Drone");
const Payment = require("./Payment");
const Status = require("./Status");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://varunsingh:aishwarya@cluster0.vi0was7.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  connectDB,
  models: {
    Customer,
    Order,
    Drone,
    Payment,
    Status,
  },
};
