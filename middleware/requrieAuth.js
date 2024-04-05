const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized: Token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "customer_application");

    // Attach the decoded user ID to the request object
    req.userId = decoded.customerId;

    // Call the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized: Invalid token" });
  }
};

module.exports = requireAuth;
