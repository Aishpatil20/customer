// controllers/OrderController.js
const { models } = require("../models");
const Order = models.Order;

exports.getAllOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      source,
      destination,
      weight
    } = req.body;

    // Create the order
    const newOrder = new Order({
      pickupLocation: source,
      deliveryLocation: destination,
      weight,
      timestamp: new Date() // Assuming you want to timestamp the order creation
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    // Get order by ID logic here...
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
