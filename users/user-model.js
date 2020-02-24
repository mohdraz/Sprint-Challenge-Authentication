const db = require("../database/dbConfig.js");

module.exports = {
  getUsers,
  getUserById,
  getBy,
  addUser
};

function getUsers() {
  return db("users").select("id", "username");
}

function getUserById(id) {
  return (
    db("users")
      // .select("id", "username")
      .where({ id })
      .first()
  );
}

function getBy(filter) {
  return db("users").where(filter);
}

async function addUser(user) {
  const [id] = await db("users").insert(user);
  return getUserById(id);
}
