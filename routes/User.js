const express = require("express");
const { createNewUser, getSingleUser } = require("../controller/User");
const route = express.Router();
//route.get("/", getAllContents);
route.post("/", createNewUser);
route.get("/:id", getSingleUser); //for params
//route.put("/:id", updateContent);
//route.delete("/:id", deleteContent);
module.exports = route;
