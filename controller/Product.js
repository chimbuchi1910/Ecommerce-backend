const asyncHandler = require("express-async-handler");
const Product = require("../schema/Product");
const cloudinary = require("../services/Cloudinary");

const createNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discountPrice,
    desc,
    image,
    quantity,
    variety,
    category,
    brand,
  } = req.body;
  try {
    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(508).json({
        message: "Product already Exists",
      });
    }
    //upload img to cloudinary
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
    const newProducts = await Product.create({
      name,
      price,
      discountPrice,
      desc,
      image: uploadImage,
      quantity,
      variety,
      category,
      brand,
    });
    res.status(200).json({
      meassage: "Successful",
      newProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create product",
      error,
    });
  }
});

module.exports = {
  createNewProduct,
};
