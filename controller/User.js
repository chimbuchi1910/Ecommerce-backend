const asyncHandler = require("express-async-handler");
const User = require("../schema/User");
const getAllUsers = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});
const createNewUser = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const create = await User.create({
      name,
      username,
      email,
      phone,
      password,
    });
    res.status(200).json({
      message: "Created Successfully",
      create,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user",
      error,
    });
  }
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id);
    if (!data) {
      res.status(500).json({
        message: "Content Not Found",
      });
    }
    res.status(200).json({
      message: "Successful",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unsuccessful",
      error,
    });
  }
});

module.exports = {
  createNewUser,
  getSingleUser,
};
