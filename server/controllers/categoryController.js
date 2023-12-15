import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";

// Creating new Category
export const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = new categoryModel({
      name,
      slug: slugify(name),
    });
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating new category",
    });
  }
};

// Update a Category
export const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating category",
      error,
    });
  }
};

// Get all Category
export const getAllCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      counTotal: category.length,
      message: "All Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting category",
      error: error.message,
    });
  }
};

// Get single Category
export const singleCategory = async (req, res, next) => {
  try {
    const category = await categoryModel
      .findOne({ slug: req.params.slug })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Category Fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single category",
      error,
    });
  }
};

// Delete a Category
export const deleteCategory = async (req, res, next) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

// Get Photo
export const categoryPhotoController = async (req, res, next) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
