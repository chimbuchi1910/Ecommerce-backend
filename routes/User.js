const express = require("express");
const {
  createNewUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  Login,
  deleteUser,
} = require("../controller/User");
const route = express.Router();
route.get("/", getAllUsers);
route.post("/", createNewUser);
route.get("/:id", getSingleUser); //for params
route.put("/:id", updateUser);
route.post("/login", Login);
route.delete("/:id", deleteUser);
module.exports = route;
