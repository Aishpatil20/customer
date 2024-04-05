// models/Status.js
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  statusName: String,
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
