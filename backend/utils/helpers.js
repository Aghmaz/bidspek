require("dotenv").config();
const jwt = require("jsonwebtoken");

// const privateKey = process.env.JWT_PRIVATE_KEY;
// console.log(privateKey)
privateKey = "abcdef";
const generateAuthToken = ({ username, email, id }) =>
  jwt.sign({ username, email, id }, privateKey, { expiresIn: "5m" });

const verifyAuthToken = (token) => jwt.verify(token, privateKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
