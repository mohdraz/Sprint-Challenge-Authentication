require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "this is my secret key"
};
