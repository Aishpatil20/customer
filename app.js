// app.js
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const { connectDB } = require("./models");

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
