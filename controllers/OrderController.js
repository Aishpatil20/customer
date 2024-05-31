// controllers/OrderController.js
const { models } = require("../models");
const Order = models.Order;
const stripe = require('stripe')('sk_test_51OIR40SBwuRaStr9DR7iuStAgVHzsF6FoUM8xG4JEPKvJjUgxZepieBMKqEKIuLpVXmJO8DkiHoyZ814PntQCfLY00CV7c3Mnc');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
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
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Step 1: Create a new customer
    const customer = await stripe.customers.create();

    // Step 2: Create an ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' }
    );

    // Step 3: Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents/pence
      currency: 'inr',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent);

    // Step 4: Respond with the customer ID, ephemeral key, and client secret
    res.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      ephemeralKey: ephemeralKey.secret
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create PaymentIntent' });
  }
};