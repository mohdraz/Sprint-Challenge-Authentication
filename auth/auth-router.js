const router = require("express").Router();
const bcrypt = require("bcryptjs");
const getToken = require("../config/tokens.js");

const User = require("../users/user-model.js");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  User.addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err =>
      res.status(500).json({ message: "error adding user. please try again" })
    );
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  User.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token
        });
      }
    })
    .catch(err => res.status(401).json({ message: "invalid credentials" }));
});

module.exports = router;
