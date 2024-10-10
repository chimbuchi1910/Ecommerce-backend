const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../schema/User");

const getAllUsers = asyncHandler(async (req, res) => {
  const getUsers = await User.find().sort({ createdAt: -1 });
  res.status(200).json(getUsers);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ username, email });
    if (userExist) {
      res.status(508).json({
        message: "User already Exist",
      });
    }
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

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await User.findOne({
      username,
    });
    if (!loginUser) {
      res.status(400).json({
        message: "Username Not Found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      res.status(500).json({
        message: "Wrong Password",
      });
    }
    res.status(200).json({
      message: "Login Successful",
      loginUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "An Error Occured",
    });
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const data = await User.findOne({ username });
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

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; //where to pass your parameters and request.body
  //const {password} =req.body    //to update password
  //  const { isAdmin} =req.body
  const { name, username, email, phone, password } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(id);
    if (!updateData) {
      res.status(700).json({
        message: "User not found",
      });
    }
    // updateData.isAdmin = isAdmin===true || updateData.isAdmin
    updateData.name = name || updateData.name;
    updateData.username = username || updateData.username;
    updateData.email = email || updateData.email;
    updateData.phone = phone || updateData.phone;
    updateData.password = password || updateData.password;
    await updateData.save();
    res.status(200).json({
      message: "Update Successful",
      updateData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed To Update",
      error,
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id } = req.params; //where to pass your parameters and request.body
  const { password } = req.body;
  try {
    const reset = await User.findByIdAndUpdate(id);
    if (!reset) {
      res.status(700).json({
        message: "User not found",
      });
    }
    updateData.password = password || updateData.password;
    await updateData.save();
    res.status(200).json({
      message: "Update Successful",
      updateData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed To Update",
      error,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // to pass id as a parameter
  try {
    const deleteRequest = await User.findByIdAndDelete(id);
    if (!deleteRequest) {
      res.status(900).json({
        message: "Content not Found",
      });
    }
    res.status(300).json({
      message: "Delete Successful",
    });
  } catch (error) {
    res.status(404).json({
      message: "Content not Found",
      error,
    });
  }
});

module.exports = {
  createNewUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  login,
  deleteUser,
};
