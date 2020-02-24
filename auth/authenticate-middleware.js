/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const mySecret = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, mySecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "have run into an error, try again" });
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ you: "have an issue with your credentials. log in again" });
  }
};
