const verifyToken = require("../Configuration/generate-jwt");

const protectedRoute = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Add the decoded user information to the request object
  req.user = decoded;

  next();
};

module.exports = protectedRoute;
