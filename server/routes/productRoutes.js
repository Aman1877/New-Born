import express from "express";
import {
  createProductController,
  getProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import { addProductValidation } from "../validation/products/productValidation.js";
const router = express.Router();

// Create a new product route
router.post(
  "/create-product",
  formidable(),
  addProductValidation,
  createProductController
);

// Update product
router.put("/update-product/:pid", formidable(), updateProductController);

// Get products
router.get("/get-product", getProductController);

//

export default router;
