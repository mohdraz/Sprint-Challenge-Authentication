const jwt = require("jsonwebtoken");
const mySecret = require("./secrets.js");

function getToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "5h"
  };

  const token = jwt.sign(payload, mySecret.jwtSecret, options);
  return token;
}

module.exports = getToken;
