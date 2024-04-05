// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  statusID: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  statusText: { type: String },
  timestamp: Date,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
