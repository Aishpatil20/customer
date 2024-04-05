// controllers/AuthController.js
const { models } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = models.Customer;
exports.signup = async (req, res) => {
  try {
    console.log(Customer);
    const { name, address, email, password, phone } = req.body;

    // Validate input data (You can add more validation as needed)
    if (!name || !address || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    console.log(name, address, email, password, phone);

    // Check if the email is already registered
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new customer record
    const newCustomer = await Customer.create({
      name,
      address,
      email,
      passwordHash,
      phone,
    });

    // Return success response
    res.status(201).json({ success: true, customer: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, customer.passwordHash);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ customerId: customer._id }, "your_secret_key", {
      expiresIn: "1d",
    });

    // Return success response with JWT token and customer data
    res.status(200).json({ success: true, token, customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};