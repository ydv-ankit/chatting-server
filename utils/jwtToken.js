const jwt = require("jsonwebtoken");

const generateJwtToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = generateJwtToken;
