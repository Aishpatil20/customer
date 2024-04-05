// models/Drone.js
const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema({
  model: String,
  statusText: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  statusText: { type: String },
});

const Drone = mongoose.model("Drone", droneSchema);

module.exports = Drone;
