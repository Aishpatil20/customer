// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  droneID: { type: mongoose.Schema.Types.ObjectId, ref: "Drone" },
  statusID: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  statusText: { type: String },
  weight: Number,
  distance: Number,
  pickupLocation: String,
  deliveryLocation: String,
  timestamp: Date,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
