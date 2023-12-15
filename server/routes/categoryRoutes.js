import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createNewCategory,
  getAllCategory,
  updateCategory,
  singleCategory,
  deleteCategory,
  categoryPhotoController,
} from "../controllers/categoryController.js";
import formidable from "express-formidable";
import { addCategoryValidation } from "../validation/category/categoryValidation.js";

const router = express.Router();

// Create new category routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  // addCategoryValidation,
  formidable(),
  createNewCategory
);

// Create Update category routes
router.put("/update-category/:id", formidable(), updateCategory);

// Get all category routes
router.get("/get-category", getAllCategory);

// Single category
router.get("/single-category/:slug", singleCategory);

// Delete product
router.delete("/delete-product/:id", deleteCategory);

// Get photo
router.get("/category-photo/:id", categoryPhotoController);

export default router;
