// controllers/AuthController.js
const { models } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Import Axios library
const Customer = models.Drone;

// Define the ESP8266 webhook URL
const esp8266WebhookUrl = 'http://<ESP8266_IP>/startDrone'; // Replace with your ESP8266's IP address

exports.StartDrone = async (req, res) => {
    // Send POST request to ESP8266 webhook
    axios.post(esp8266WebhookUrl)
        .then(response => {
            console.log('Drone start request sent successfully');
            res.send('Drone start request sent successfully');
        })
        .catch(error => {
            console.error('Error sending drone start request:', error.message);
            res.status(500).send('Error sending drone start request');
        });
}
