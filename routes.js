// routes.js
const express = require("express");
const requireAuth = require("./middleware/requrieAuth");
const router = express.Router();
const AuthController = require("./controllers/AuthController");
const OrderController = require("./controllers/OrderController");
const PaymentController = require("./controllers/PaymentController");

// Auth routes
router.post("/auth/signup", AuthController.signup);
router.post("/auth/login", AuthController.login);

// Order routes
router.get("/orders", OrderController.getAllOrders);
router.post("/orders", OrderController.createOrder);
router.get("/orders/:id", OrderController.getOrderById);
router.get("/ordersCustomer/:id", OrderController.getOrdersByCustomer);

// Payment routes
router.get("/payments", PaymentController.getAllPayments);
router.post("/payments", PaymentController.createPayment);
router.get("/payments/:id", PaymentController.getPaymentById);

// Create Payment Intent route
router.post("/create-payment-intent", OrderController.createPaymentIntent);

// Add more routes as needed...

module.exports = router;