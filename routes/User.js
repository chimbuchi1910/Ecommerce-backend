const express = require("express");
const {
  createNewUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("../controller/User");
const route = express.Router();
route.get("/", getAllUsers);
route.post("/", createNewUser);
route.get("/:username", getSingleUser); //for params
route.put("/:id", updateUser);
route.post("/logins", login);
route.delete("/:id", deleteUser);

module.exports = route;
