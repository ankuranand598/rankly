const jwt = require("jsonwebtoken");
const secretKey = "qwerty-54321"; // Replace with your own secret key

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

const generateToken = (id) => {
  const token = jwt.sign({ userId: id }, secretKey, { expiresIn: "1h" }); // Expires in 1 hour
  return token;
};
module.exports = { authenticate, generateToken };
