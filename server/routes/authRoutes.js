import express from "express";
import { registerController } from "../controllers/authController.js";
import { addUserValidation } from "../validation/users/userValidation.js";

const router = express.Router();

// Register routes
router.post("/register", addUserValidation, registerController);

export default router;
