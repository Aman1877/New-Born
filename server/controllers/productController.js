import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

// Create a new product
export const createProductController = async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, rating } = req.fields;
    const { photo } = req.files;
    const products = await productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

// Get all products
export const getProductController = async (req, res, nex) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// Update product
export const updateProductController = async (req, res, nex) => {
  try {
    const { name, description, price, category, quantity, rating } = req.fields;
    const { photo } = req.files;
    console.log(req.params);
    // const products = await productModel.findByIdAndUpdate(
    //   req.params.pid,
    //   { ...req.fields, slug: slugify(name) },
    //   { new: true }
    // );
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    // await products.save();
    // res.status(201).send({
    //   success: true,
    //   message: "Product Updated Successfully",
    //   products,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating product",
    });
  }
};
