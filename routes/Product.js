const express = require("express");

const { createNewProduct } = require("../controller/Product");
const Product = require("../schema/Product");
const route = express.Router();

route.post("/", createNewProduct);
route.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      message: "failed to fetch product",
    });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(500).json({
        message: "Content Not Found",
      });
    }
    res.status(200).json({
      message: "Successful",
      product,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unsuccessful",
      error,
    });
  }
});
route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, variety } = req.body; /// this serves as your form input field
  try {
    const updateProduct = await Product.findById(id);
    if (!updateProduct) {
      res.status(700).json({
        message: "User not found",
      });
    }
    const uploadImage = await Promise.all(
      image.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "Products", //optional:store image in a specific folder in Cloudinary
          resource_type: "image",
          fileName: `${req.body.name}.jpg`,
        });
        return {
          url: result.secure_url,
        };
      })
    );
    updateProduct.name = name || updateProduct.name;
    updateProduct.variety = variety || updateProduct.variety;
    updateProduct.image = uploadImage || updateProduct.image;
    await updateProduct.save();
    res.status(200).json({
      message: "Update Successful",
      updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed To Update",
      error,
    });
  }
});
route.delete("/:id", async (req, res) => {
  const { id } = req.params; // to pass id as a parameter
  try {
    const deleteRequest = await Product.findByIdAndDelete(id);
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

module.exports = route;
