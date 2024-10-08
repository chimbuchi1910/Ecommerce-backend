const asyncHandler = require("express-async-handler");

const getAllContents = asyncHandler(async (req, res) => {
  const getContents = await Content.find().sort({ createdAt: -1 });
  res.status(200).json(getContents);
});

const postContent = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  try {
    const newPost = await Content.create({
      title,
      body,
    });
    res.status(200).json({
      message: "Post Successful",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create",
      error,
    });
  }
});

const getSingleContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Content.findById(id);
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

const updateContent = asyncHandler(async (req, res) => {
  const { id } = req.params; //where to pass your parameters and request.body
  //const {password} =req.body    //to update password
  //  const { isAdmin} =req.body
  const { title, body } = req.body;
  try {
    const updateData = await Content.findById(id);
    if (!updateData) {
      res.status(700).json({
        message: "User not found",
      });
    }
    // updateData.isAdmin = isAdmin===true || updateData.isAdmin
    updateData.title = title || updateData.title;
    updateData.body = body || updateData.body;
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

const deleteContent = asyncHandler(async (req, res) => {
  const { id } = req.params; // to pass id as a parameter
  try {
    const deleteRequest = await Content.findByIdAndDelete(id);
    if (!deleteRequest) {
      res.status(900).json({
        message: "Content not Found",
      });
    }
    res.status(300).json({
      message: "Delete Successful",
      deleteRequest,
    });
  } catch (error) {
    res.status(404).json({
      message: "Content not Found",
      error,
    });
  }
});

module.exports = {
  getAllContents,
  postContent,
  getSingleContent,
  updateContent,
  deleteContent,
};
