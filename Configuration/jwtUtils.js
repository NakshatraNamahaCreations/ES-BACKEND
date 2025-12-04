const jwt = require("jsonwebtoken");

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  verifyToken,
  decodeToken,
};
