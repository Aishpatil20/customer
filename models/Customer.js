// models/Customer.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: { type: String, unique: true },
  passwordHash: String,
  phone: String,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
